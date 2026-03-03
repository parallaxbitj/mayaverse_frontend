import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService, googleLogin as googleLoginService, sendOTP as sendOTPService } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { isValidEmail } from '../../../utils/helpers';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isBIT = formData.email.toLowerCase().endsWith('@bitmesra.ac.in');

  const handleGoogleLogin = async () => {
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await googleLoginService(formData.email);
      login(response.user);
      if (isBIT) {
        navigate(ROUTES.USER_PROFILE);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendOTPService(formData.email);
      setOtpSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email) {
      setError('Please enter your email');
      return;
    }

    if (!isBIT && !otpSent) {
      handleSendOTP();
      return;
    }

    if (!isBIT && !formData.otp) {
      setError('Please enter the OTP sent to your email');
      return;
    }

    setLoading(true);

    try {
      const response = await loginService(
        formData.email,
        isBIT ? formData.password : null,
        !isBIT ? formData.otp : null
      );
      login(response.user);

      if (response.user.role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (isBIT) {
        navigate(ROUTES.USER_PROFILE);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Login to {APP_NAME}</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: user@domain.com"
                className={styles.input}
                required
                disabled={otpSent}
              />
            </div>

            {isBIT ? (
              <>
                <div className={styles.googleAuthSection}>
                  <div className={styles.infoBox}>
                    <p>BIT Mesra ID detected. Use Google Login for instant access.</p>
                  </div>
                  <button
                    type="button"
                    className={styles.googleButton}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className={styles.googleIcon} />
                    {loading ? 'Authenticating...' : 'Sign in with Google'}
                  </button>
                  <div className={styles.divider}>
                    <span>OR</span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={styles.input}
                  />
                </div>
              </>
            ) : (
              otpSent && (
                <div className={styles.formGroup}>
                  <label htmlFor="otp">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="123456"
                    maxLength="6"
                    className={`${styles.input} ${styles.otpInput}`}
                    required
                  />
                  <p className={styles.otpHelper}>Code sent to {formData.email}</p>
                </div>
              )
            )}

            {!isBIT && !otpSent ? (
              <button type="button" className={styles.submitButton} onClick={handleSendOTP} disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            ) : (
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Verifying...' : 'Login'}
              </button>
            )}
          </form>

          <div className={styles.links}>
            <p>
              Don't have an account?{' '}
              <Link to={ROUTES.SIGNUP} className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;