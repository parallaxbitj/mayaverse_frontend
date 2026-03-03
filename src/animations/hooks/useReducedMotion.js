/**
 * MAYAVERSE - Reduced Motion Hook
 * 
 * Accessibility hook that respects user's motion preferences.
 * Automatically disables animations if user prefers reduced motion.
 */

import { useState, useEffect } from 'react';

/**
 * useReducedMotion Hook
 * 
 * Detects if user has requested reduced motion in their system preferences.
 * Updates reactively if preference changes.
 * 
 * @returns {boolean} - true if reduced motion is preferred
 * 
 * Usage:
 * const prefersReducedMotion = useReducedMotion();
 * if (!prefersReducedMotion) {
 *   // Run animations
 * }
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener (different methods for different browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * useAnimationPreference Hook
 * 
 * Combines reduced motion preference with performance detection.
 * Returns comprehensive animation settings.
 * 
 * @returns {Object} Animation preference settings
 */
export const useAnimationPreference = () => {
  const prefersReducedMotion = useReducedMotion();
  const [performanceLevel, setPerformanceLevel] = useState('high');

  useEffect(() => {
    // Detect performance level
    import('../utils/performanceDetector').then(({ getStoredPerformanceLevel }) => {
      setPerformanceLevel(getStoredPerformanceLevel());
    });
  }, []);

  return {
    prefersReducedMotion,
    performanceLevel,
    shouldAnimate: !prefersReducedMotion && performanceLevel !== 'low',
    enableComplexAnimations: !prefersReducedMotion && performanceLevel === 'high',
  };
};

export default useReducedMotion;