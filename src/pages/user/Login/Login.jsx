import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { isValidEmail } from '../../../utils/helpers';
import { loginUser } from '../../../services/api';
import styles from './Login.module.css';

/**
 * MAYAVERSE LOGIN — wired to Cloudflare Worker backend
 *
 * Flow (same for BIT and non-BIT):
 *   1. Enter email + password → POST /login
 *   2. Backend checks: email verified, payment_status paid/free, password hash
 *   3. On success → JWT returned → stored in AuthContext → navigate to Home
 *
 * Note: BIT students also use email+password (they set a password during signup).
 */

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(formData.email)) return setError('Please enter a valid email address.');
    if (!formData.password) return setError('Please enter your password.');

    setLoading(true);
    try {
      const res = await loginUser(formData.email.trim(), formData.password);
      login(res.user, res.token);

      // BIT students go to profile, everyone else goes home
      navigate(res.user.is_bit ? ROUTES.USER_PROFILE : ROUTES.HOME);
    } catch (err) {
      if (err.code === 'PAYMENT_PENDING') {
        setError('Your payment is still pending. Complete registration to access your account.');
      } else if (err.code === 'EMAIL_NOT_VERIFIED') {
        setError('Please verify your email first. Check your inbox for the OTP.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
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
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                placeholder="Ex: user@domain.com"
                className={styles.input} required autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" name="password"
                value={formData.password} onChange={handleChange}
                placeholder="Enter your password"
                className={styles.input} required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          <div className={styles.links}>
            <p>
              Don't have an account?{' '}
              <Link to={ROUTES.SIGNUP} className={styles.link}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;