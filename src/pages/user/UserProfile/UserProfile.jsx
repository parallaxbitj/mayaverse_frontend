import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/config';
import { storage, formatDate } from '../../../utils/helpers';
import styles from './UserProfile.module.css';

/**
 * MAYAVERSE USER PROFILE
 *
 * BIT flow:
 *   - If profileComplete === false  → show mandatory profile fill form
 *   - If profileComplete === true   → show read-only profile with Edit option
 *
 * NON-BIT flow:
 *   - Always shows filled profile (data came from Signup) with Edit option
 */

const UserProfile = () => {
  const { user: authUser, updateUser: updateAuthUser, logout } = useAuth();
  const navigate = useNavigate();

  const isBIT = authUser?.user_type === 'BIT';
  const needsProfile = isBIT && !authUser?.profileComplete;

  const [isEditing, setIsEditing] = useState(needsProfile);
  const [editData, setEditData] = useState({
    name: authUser?.name || '',
    phone: authUser?.phone || '',
    college: authUser?.college || '',
    year: authUser?.year || '',
    department: authUser?.department || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Keep isEditing in sync if auth state changes (e.g. reload)
  useEffect(() => {
    if (!authUser) {
      navigate(ROUTES.LOGIN);
    }
  }, [authUser]);

  const handleChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!editData.name.trim()) { setError('Full name is required.'); return; }
    if (!editData.phone.trim()) { setError('Phone number is required.'); return; }
    if (isBIT && !editData.department.trim()) { setError('Department is required.'); return; }
    if (isBIT && !editData.year.trim()) { setError('Year is required.'); return; }

    setSaving(true);

    // Update in localStorage user store
    const users = storage.get('mayaverse_users') || [];
    const idx = users.findIndex((u) => u.email === authUser.email);
    const updatedUser = {
      ...authUser,
      name: editData.name.trim(),
      phone: editData.phone.trim(),
      college: editData.college.trim() || authUser.college,
      ...(isBIT && { year: editData.year, department: editData.department }),
      profileComplete: true,
    };

    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedUser };
      storage.set('mayaverse_users', users);
    }

    updateAuthUser(updatedUser);
    setSaving(false);
    setIsEditing(false);
  };

  if (!authUser) return null;

  // ── First-time BIT profile fill ─────────────────────────────────────────────
  if (needsProfile && isEditing) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.profileTitle}>Complete Your Profile 🎓</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.25rem' }}>
              Logged in as {authUser.email}
            </p>
          </div>

          {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.editForm}>
            <div className={styles.infoRow}>
              <strong>Full Name *</strong>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="Your full name"
                required
              />
            </div>

            <div className={styles.infoRow}>
              <strong>Phone Number *</strong>
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className={styles.infoRow}>
              <strong>Department *</strong>
              <input
                type="text"
                name="department"
                value={editData.department}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="e.g. Computer Science"
                required
              />
            </div>

            <div className={styles.infoRow}>
              <strong>Year *</strong>
              <select
                name="year"
                value={editData.year}
                onChange={handleChange}
                className={styles.editInput}
                required
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="PG / PhD">PG / PhD</option>
              </select>
            </div>

            <div className={styles.infoRow}>
              <strong>Email</strong>
              <span className={styles.readOnlyText}>{authUser.email} (from Google)</span>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── View / Edit profile ──────────────────────────────────────────────────────
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.profileTitle}>User Profile 👤</h2>
          {!isEditing && (
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Payment status badge for NON-BIT */}
        {!isBIT && (
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1rem',
            background: authUser.payment_status === 'Verified' ? '#d1fae5' : '#fef3c7',
            color: authUser.payment_status === 'Verified' ? '#065f46' : '#92400e',
          }}>
            Payment: {authUser.payment_status || 'Pending'}
          </div>
        )}

        {isBIT && (
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1rem',
            background: '#dbeafe',
            color: '#1e40af',
          }}>
            BIT Mesra — Free Entry
          </div>
        )}

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <div className={styles.infoRow}>
              <strong>Full Name</strong>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className={styles.editInput}
                required
              />
            </div>
            <div className={styles.infoRow}>
              <strong>Phone Number</strong>
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="+91 98765 43210"
              />
            </div>
            {isBIT && (
              <>
                <div className={styles.infoRow}>
                  <strong>Department</strong>
                  <input
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleChange}
                    className={styles.editInput}
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div className={styles.infoRow}>
                  <strong>Year</strong>
                  <select
                    name="year"
                    value={editData.year}
                    onChange={handleChange}
                    className={styles.editInput}
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                    <option value="PG / PhD">PG / PhD</option>
                  </select>
                </div>
              </>
            )}
            {!isBIT && (
              <div className={styles.infoRow}>
                <strong>College / University</strong>
                <input
                  type="text"
                  name="college"
                  value={editData.college}
                  onChange={handleChange}
                  className={styles.editInput}
                  placeholder="Your college name"
                />
              </div>
            )}
            <div className={styles.infoRow}>
              <strong>Email</strong>
              <span className={styles.readOnlyText}>{authUser.email} (fixed)</span>
            </div>
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => { setIsEditing(false); setError(''); }}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.profileInfo}>
            <div className={styles.infoRow}>
              <strong>Full Name</strong>
              <span>{authUser.name || '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Email</strong>
              <span>{authUser.email}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Phone Number</strong>
              <span>{authUser.phone || 'Not provided'}</span>
            </div>
            {isBIT ? (
              <>
                <div className={styles.infoRow}>
                  <strong>Department</strong>
                  <span>{authUser.department || 'Not provided'}</span>
                </div>
                <div className={styles.infoRow}>
                  <strong>Year</strong>
                  <span>{authUser.year || 'Not provided'}</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.infoRow}>
                  <strong>College / University</strong>
                  <span>{authUser.college || 'Not provided'}</span>
                </div>
                <div className={styles.infoRow}>
                  <strong>Transaction ID</strong>
                  <span>{authUser.transactionId || '—'}</span>
                </div>
              </>
            )}
            <div className={styles.infoRow}>
              <strong>Registered On</strong>
              <span>{formatDate(authUser.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;