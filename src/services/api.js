/**
 * Mayaverse API Service
 * All communication with the Cloudflare Worker backend.
 *
 * Set VITE_API_URL in .env:
 *   VITE_API_URL=http://localhost:8787          (local dev)
 *   VITE_API_URL=https://mayaverse-backend.YOUR_SUBDOMAIN.workers.dev  (production)
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787';

async function apiFetch(path, options = {}) {
    const url = `${API_BASE}${path}`;
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    const data = await res.json();
    if (!res.ok) {
        const err = new Error(data.error || 'Request failed');
        err.code = data.code;
        err.status = res.status;
        throw err;
    }
    return data;
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register a new user.
 * @param {{ name, email, phone, college, password }} userData
 * @returns {Promise<{ status: 'otp_sent', is_bit: boolean }>}
 */
export const registerUser = (userData) =>
    apiFetch('/register', { method: 'POST', body: JSON.stringify(userData) });

/**
 * Verify the email OTP.
 * BIT users → get token immediately.
 * Non-BIT users → get { verified: true, next_step: 'payment' }
 * @param {string} email
 * @param {string} otp
 */
export const verifyEmailOTP = (email, otp) =>
    apiFetch('/verify-email-otp', { method: 'POST', body: JSON.stringify({ email, otp }) });

// ─── Payment ──────────────────────────────────────────────────────────────────

/**
 * Create a Razorpay order.
 * @param {string} email
 * @returns {Promise<{ order_id, amount, currency, key_id, prefill }>}
 */
export const createPaymentOrder = (email) =>
    apiFetch('/create-payment', { method: 'POST', body: JSON.stringify({ email }) });

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Login with email + password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token, user }>}
 */
export const loginUser = (email, password) =>
    apiFetch('/login', { method: 'POST', body: JSON.stringify({ email, password }) });

// ─── Authenticated requests ───────────────────────────────────────────────────

/**
 * Make an authenticated request (attaches JWT).
 * @param {string} path
 * @param {object} options
 * @param {string} token  JWT from AuthContext
 */
export const authFetch = (path, options = {}, token) =>
    apiFetch(path, {
        ...options,
        headers: { Authorization: `Bearer ${token}`, ...options.headers },
    });

/**
 * Open Razorpay checkout in the browser.
 * Razorpay JS SDK must be loaded in index.html:
 *   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
 *
 * @param {{ order_id, amount, currency, key_id, prefill }} orderData
 * @param {function} onSuccess  called with { razorpay_payment_id, razorpay_order_id, razorpay_signature }
 * @param {function} onFailure  called with error
 */
export function openRazorpayCheckout(orderData, onSuccess, onFailure) {
    const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Mayaverse',
        description: 'Event Access Registration',
        order_id: orderData.order_id,
        prefill: orderData.prefill,
        theme: { color: '#a855f7' },
        handler: onSuccess,
        modal: {
            ondismiss: () => onFailure(new Error('Payment cancelled by user.')),
        },
    };

    if (!window.Razorpay) {
        onFailure(new Error('Razorpay SDK not loaded. Check your internet connection.'));
        return;
    }

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (resp) => onFailure(new Error(resp.error?.description || 'Payment failed')));
    rzp.open();
}
