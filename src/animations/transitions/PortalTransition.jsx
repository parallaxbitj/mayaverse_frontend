/**
 * MAYAVERSE - Portal Transition Component (Simplified)
 * 
 * Now used ONLY as a layout wrapper.
 * No transitions - the mystical portal is now only on the entry page.
 */

import React from 'react';
import styles from './PortalTransition.module.css';

/**
 * PortalTransition Component
 * 
 * Simple wrapper for page content.
 * The mystical portal experience has moved to the entry page.
 * 
 * Usage:
 * <PortalTransition>
 *   <YourPageContent />
 * </PortalTransition>
 */
const PortalTransition = ({ children }) => {
  return (
    <div className={styles.transitionWrapper}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default PortalTransition;