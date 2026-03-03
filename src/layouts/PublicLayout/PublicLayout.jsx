import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import PortalTransition from '../../animations/transitions/PortalTransition';
import styles from './PublicLayout.module.css';

/**
 * MAYAVERSE - Public Layout
 * 
 * Layout for all public pages (Home, About, Events, etc.)
 * Includes:
 * - Navbar at the top
 * - Main content area (Outlet) wrapped in PortalTransition
 * - Footer at the bottom
 * 
 * Portal transitions animate automatically when routes change.
 */

const PublicLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className={styles.publicLayout}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area with Portal Transitions */}
      {/* The Outlet component renders the matched child route */}
      <main
        className={styles.mainContent}
        style={{
          paddingTop: isHomePage ? 0 : 'var(--header-height)'
        }}
      >
        <PortalTransition>
          <Outlet />
        </PortalTransition>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;