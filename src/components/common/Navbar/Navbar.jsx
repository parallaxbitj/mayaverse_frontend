import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResponsive } from '../../../animations/hooks/useResponsive';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/config';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (isHomePage) {
        // Always show within first 80px
        if (currentScrollY < 80) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY + 10) {
          // Hide only after scrolling 10px+ downward
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY - 10) {
          // Show only after scrolling 10px+ upward
          setIsVisible(true);
        }
      } else {
        // Force visible on subpages
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Run once on mount to handle refreshed state
    controlNavbar();

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isHomePage]);

  // Close drawer/dropdown and reset visibility on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
    setIsVisible(true);
  }, [location]);

  return (
    <>
      {/* Header Strip */}
      <header className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        {/* Desktop Left Nav - 3 Links */}
        <nav className={styles.leftNav}>
          <Link to={ROUTES.EVENTS} className={styles.desktopLink}>Events</Link>
          <Link to={ROUTES.GALLERY} className={styles.desktopLink}>Gallery</Link>
          <Link to={ROUTES.SPONSORS} className={styles.desktopLink}>Sponsors</Link>
        </nav>

        {/* Center Logo */}
        <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          PARALLAX
        </Link>

        {/* Desktop Right Nav - 3 Links (including Auth) */}
        <nav className={styles.rightNav}>
          <Link to={ROUTES.MERCHANDISE} className={styles.desktopLink}>Merch</Link>
          <Link to={ROUTES.ABOUT} className={styles.desktopLink}>About Us</Link>

          {!isAuthenticated() ? (
            <Link to={ROUTES.SIGNUP} className={styles.registerBtn}>Register</Link>
          ) : (
            <div className={styles.profileDropdownContainer}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={styles.registerBtn}
                style={{
                  background: 'linear-gradient(135deg, #8a7cff 0%, #ff00de 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {user?.name?.split(' ')[0] || 'Account'}
                <span style={{ fontSize: '10px', transition: 'transform 0.3s', transform: isProfileOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>

              {isProfileOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to={ROUTES.USER_PROFILE} className={styles.dropdownItem}>
                    My Profile
                  </Link>
                  <button onClick={logout} className={styles.dropdownItem} style={{ width: '100%', textAlign: 'left', color: '#ff4d4d' }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <nav className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to={ROUTES.EVENTS} className={styles.navLink}>Events</Link>
          <Link to={ROUTES.GALLERY} className={styles.navLink}>Gallery</Link>
          <Link to={ROUTES.SPONSORS} className={styles.navLink}>Sponsors</Link>
          <Link to={ROUTES.MERCHANDISE} className={styles.navLink}>Merchandise</Link>
          <Link to={ROUTES.ABOUT} className={styles.navLink}>About Us</Link>
        </div>

        <div className={styles.drawerFooter}>
          {!isAuthenticated() ? (
            <div className={styles.drawerAuthGroup}>
              <Link to={ROUTES.LOGIN} className={styles.authButtonSecondary}>Login</Link>
              <Link to={ROUTES.SIGNUP} className={styles.authButton}>Register Now</Link>
            </div>
          ) : (
            <div className={styles.drawerAuthGroup}>
              <Link to={ROUTES.USER_PROFILE} className={styles.authButtonSecondary}>
                My Profile
              </Link>
              <button
                onClick={logout}
                className={styles.authButton}
                style={{ background: 'linear-gradient(135deg, #ff4d4d 0%, #dc2626 100%)' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;