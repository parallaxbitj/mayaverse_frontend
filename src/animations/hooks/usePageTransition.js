/**
 * MAYAVERSE - Page Transition Hook
 * 
 * Hook for programmatically triggering page transitions.
 * Use this when you need to navigate with a portal effect.
 */

import { useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import { portalCloseAnimation } from '../effects/portalEffect';
import { useReducedMotion } from './useReducedMotion';
import { getAnimationConfig, getStoredPerformanceLevel } from '../utils/performanceDetector';

/**
 * usePageTransition Hook
 * 
 * Provides a navigate function that triggers portal transition before navigation.
 * 
 * @returns {Object} - { navigateWithTransition, isTransitioning }
 * 
 * Usage:
 * const { navigateWithTransition } = usePageTransition();
 * navigateWithTransition('/events');
 */
export const usePageTransition = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const isTransitioningRef = useRef(false);

  /**
   * Navigate to a new page with portal transition
   * 
   * @param {string} path - Path to navigate to
   * @param {Object} options - Navigation options
   */
  const navigateWithTransition = useCallback((path, options = {}) => {
    // Prevent multiple simultaneous transitions
    if (isTransitioningRef.current) {
      return;
    }

    // If reduced motion, navigate immediately
    if (prefersReducedMotion) {
      navigate(path, options);
      return;
    }

    // Start transition
    isTransitioningRef.current = true;

    // Create portal overlay for exit
    const portalOverlay = document.createElement('div');
    portalOverlay.style.position = 'fixed';
    portalOverlay.style.top = '0';
    portalOverlay.style.left = '0';
    portalOverlay.style.width = '100%';
    portalOverlay.style.height = '100%';
    portalOverlay.style.zIndex = '9999';
    portalOverlay.style.pointerEvents = 'none';
    portalOverlay.style.background = 'radial-gradient(circle at center, rgba(99, 102, 241, 0.95) 0%, rgba(99, 102, 241, 0.8) 30%, rgba(0, 0, 0, 0.95) 100%)';
    
    document.body.appendChild(portalOverlay);

    // Get performance config
    const performanceLevel = getStoredPerformanceLevel();
    const config = getAnimationConfig(performanceLevel);

    // Animate portal closing
    portalCloseAnimation(
      portalOverlay,
      () => {
        // Navigate after portal closes
        navigate(path, options);
        
        // Clean up
        setTimeout(() => {
          portalOverlay.remove();
          isTransitioningRef.current = false;
        }, 100);
      },
      config.portalDuration
    );
  }, [navigate, prefersReducedMotion]);

  return {
    navigateWithTransition,
    isTransitioning: isTransitioningRef.current,
  };
};

export default usePageTransition;