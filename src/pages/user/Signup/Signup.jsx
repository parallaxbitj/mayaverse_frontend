import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupService, googleLogin as googleLoginService, sendOTP as sendOTPService, verifyOTP as verifyOTPService } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { isValidEmail } from '../../../utils/helpers';
import styles from './Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: '',
    phone: '',
    college: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
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

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await verifyOTPService(formData.email, formData.otp);
      setIsVerified(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Invalid OTP code');
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

    if (!isVerified && !isBIT) {
      setError('Please verify your email first');
      return;
    }

    if (!formData.name) {
      setError('Full Name is required');
      return;
    }

    setLoading(true);

    try {
      const response = await signupService(formData, formData.otp);
      login(response.user);
      if (isBIT) {
        navigate(ROUTES.USER_PROFILE);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join {APP_NAME} Experience</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
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
              <div className={styles.googleAuthSection}>
                <div className={styles.infoBox}>
                  <p>BIT Mesra ID detected. Please use Google Login for automatic registration.</p>
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
              </div>
            ) : !isVerified ? (
              <>
                {otpSent && (
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
                      className={styles.input}
                      required
                    />
                  </div>
                )}
                {!otpSent ? (
                  <button type="button" className={styles.submitButton} onClick={handleSendOTP} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Verification OTP'}
                  </button>
                ) : (
                  <button type="button" className={styles.submitButton} onClick={handleVerifyOTP}>
                    Verify Email
                  </button>
                )}
              </>
            ) : (
              <>
                <div className={styles.successBadge}>✓ Email Verified</div>

                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="college">College/University</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college name"
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>
              </>
            )}
          </form>

          <div className={styles.links}>
            <p>
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className={styles.link}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;