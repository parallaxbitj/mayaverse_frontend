import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { isValidEmail } from '../../../utils/helpers';
import { registerUser, verifyEmailOTP, createPaymentOrder, openRazorpayCheckout } from '../../../services/api';
import emailjs from '@emailjs/browser';
import styles from './Signup.module.css';

/**
 * MAYAVERSE SIGNUP — wired to Cloudflare Worker backend
 *
 * NON-BIT flow:
 *   1. Fill details (name, email, phone, college, password) → POST /register → OTP sent
 *   2. Enter OTP → POST /verify-email-otp → {next_step: 'payment'}
 *   3. POST /create-payment → Razorpay checkout → payment.captured webhook → paid
 *   4. Navigate to Home
 *
 * BIT flow:
 *   1. Enter @bitmesra.ac.in email + other details → POST /register → OTP sent
 *   2. Enter OTP → POST /verify-email-otp → JWT returned immediately (free)
 *   3. Navigate to UserProfile
 */

const Signup = () => {
  const [step, setStep] = useState('details'); // 'details' | 'otp' | 'payment'
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', password: '', confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMsg, setPaymentMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const isBIT = formData.email.toLowerCase().endsWith('@bitmesra.ac.in');

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  // ─── Step 1: Register → POST /register ────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name.trim()) return setError('Full name is required.');
    if (!isValidEmail(formData.email)) return setError('Please enter a valid email address.');
    if (!formData.phone.trim()) return setError('Phone number is required.');
    if (!formData.college.trim()) return setError('College name is required.');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');

    setLoading(true);
    try {
      const res = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
        password: formData.password,
      });

      console.log('Backend Register Response:', res); // Debugging OTP


      // ─── Send OTP via EmailJS ───
      const templateParams = {
        to_email: formData.email.trim(),
        to_name: formData.name.trim(),
        otp_code: res.otp, // OTP from backend
        app_name: APP_NAME,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStep('otp');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 2: Verify OTP → POST /verify-email-otp ──────────────────────────
  const handleVerifyOTP = async () => {
    if (!otp.trim()) return setError('Please enter the OTP.');
    setError('');
    setLoading(true);
    try {
      const res = await verifyEmailOTP(formData.email, otp.trim());

      if (res.access_granted) {
        // BIT student: JWT returned, log them in
        login(res.user, res.token);
        navigate(ROUTES.USER_PROFILE);
      } else {
        // Non-BIT: go to payment step
        setStep('payment');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 3: Payment → POST /create-payment → Razorpay ───────────────────
  const handlePayment = async () => {
    setError('');
    setPaymentMsg('');
    setLoading(true);
    try {
      const orderData = await createPaymentOrder(formData.email);
      setLoading(false);

      openRazorpayCheckout(
        orderData,
        // onSuccess — payment captured; webhook will update backend
        (paymentData) => {
          setPaymentMsg('✓ Payment successful! Your account is being activated…');
          // Small delay for webhook to process, then navigate
          setTimeout(() => navigate(ROUTES.HOME), 2500);
        },
        // onFailure
        (err) => {
          setError(err.message || 'Payment failed. Please try again.');
        }
      );
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Could not initiate payment. Please try again.');
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join {APP_NAME} Experience</p>

          {error && <div className={styles.error}>{error}</div>}
          {paymentMsg && <div className={styles.successBadge}>{paymentMsg}</div>}

          {/* ── STEP 1: Full details form ── */}
          {step === 'details' && (
            <form onSubmit={handleRegister} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={styles.input} autoFocus />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="user@domain.com" className={styles.input} />
                {isBIT && <p className={styles.inputHelper}>BIT Mesra email detected — free access!</p>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="college">College / University *</label>
                <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} placeholder="Enter your college name" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password *</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 characters" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password" className={styles.input} />
              </div>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Sending OTP…' : isBIT ? 'Register with BIT Email' : 'Register & Pay'}
              </button>
            </form>
          )}

          {/* ── STEP 2: OTP verification ── */}
          {step === 'otp' && (
            <div className={styles.form}>
              <div className={styles.successBadge}>OTP sent to {formData.email}</div>
              <div className={styles.formGroup}>
                <label htmlFor="otp">Enter OTP *</label>
                <input
                  type="text" id="otp" name="otp"
                  value={otp} onChange={(e) => { setOtp(e.target.value); setError(''); }}
                  placeholder="6-digit code" maxLength="6" className={styles.input} autoFocus
                />
                <p className={styles.inputHelper}>Check your inbox. Check spam if not received in 1 minute.</p>
              </div>
              <button type="button" className={styles.submitButton} onClick={handleVerifyOTP} disabled={loading}>
                {loading ? 'Verifying…' : 'Verify OTP'}
              </button>
              <button type="button" style={{ marginTop: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary, #7C3AED)', textDecoration: 'underline' }}
                onClick={() => { setStep('details'); setError(''); }}>
                ← Change details
              </button>
            </div>
          )}

          {/* ── STEP 3: Payment (non-BIT only) ── */}
          {step === 'payment' && (
            <div className={styles.form}>
              <div className={styles.successBadge}>✓ Email Verified</div>
              <div className={styles.infoBox || {}}>
                <p>Complete payment to activate your Mayaverse account.</p>
                <p style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.25rem' }}>₹200 one-time registration fee</p>
              </div>
              <button type="button" className={styles.submitButton} onClick={handlePayment} disabled={loading}>
                {loading ? 'Loading…' : 'Pay ₹200 with Razorpay'}
              </button>
            </div>
          )}

          <div className={styles.links}>
            <p>Already have an account?{' '}<Link to={ROUTES.LOGIN} className={styles.link}>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;