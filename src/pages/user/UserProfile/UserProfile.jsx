import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getUserProfile, getUserOrders, updateUserProfile } from '../../../services/mockData';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user: authUser, updateUser: updateAuthUser } = useAuth();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '', college: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authUser) {
      loadUserData();
    }
  }, [authUser]);

  const loadUserData = async () => {
    try {
      const [profileResponse, ordersResponse] = await Promise.all([
        getUserProfile(authUser.id),
        getUserOrders(authUser.id),
      ]);

      setUser(profileResponse.user);
      setEditData({
        name: profileResponse.user.name,
        phone: profileResponse.user.phone || '',
        college: profileResponse.user.college || '',
      });
      setOrders(ordersResponse.orders);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await updateUserProfile(user.id, editData);
      setUser(response.user);
      updateAuthUser(response.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;
  if (!user) return <div className={styles.error}>Failed to load profile</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.profileTitle}>User Profile 👤</h2>
          {!isEditing && (
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

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
                placeholder="Ex: +91 98765 43210"
              />
            </div>
            <div className={styles.infoRow}>
              <strong>College / Institute</strong>
              <input
                type="text"
                name="college"
                value={editData.college}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="Enter your college name"
              />
            </div>
            <div className={styles.infoRow}>
              <strong>Email Address</strong>
              <span className={styles.readOnlyText}>{user.email} (Fixed)</span>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
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
              <span>{user.name}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Email Address</strong>
              <span>{user.email}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Phone Number</strong>
              <span>{user.phone || 'Not provided'}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>College / Institute</strong>
              <span>{user.college || 'Not provided'}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Registration Date</strong>
              <span>{formatDate(user.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;