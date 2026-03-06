import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScrollToTop.module.css';

/**
 * MAYAVERSE - ScrollToTop Component
 * 
 * A premium, animated button that appears when the user scrolls down.
 * Clicking it smoothly scrolls the page back to the top.
 */

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll position
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 20px var(--color-primary), 0 0 40px var(--color-accent)'
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <i className="fas fa-chevron-up"></i>
          <div className={styles.glowEffect}></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
