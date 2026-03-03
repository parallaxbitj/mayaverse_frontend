/**
 * MAYAVERSE - GSAP Lifecycle Hook
 * 
 * Custom hook that manages GSAP animations lifecycle in React.
 * Automatically cleans up animations on component unmount.
 */

import { useEffect, useRef } from 'react';
import gsap from '../utils/gsapConfig';
import { useReducedMotion } from './useReducedMotion';

/**
 * useGSAP Hook
 * 
 * Manages GSAP animations with proper React lifecycle.
 * Automatically cleans up on unmount and respects reduced motion.
 * 
 * @param {Function} animationFunction - Function that creates GSAP animations
 * @param {Array} dependencies - Dependency array (like useEffect)
 * @returns {Object} - { timeline, context, refresh, kill }
 * 
 * Usage:
 * useGSAP(() => {
 *   gsap.to(element, { x: 100 });
 * }, []);
 */
export const useGSAP = (animationFunction, dependencies = []) => {
  const prefersReducedMotion = useReducedMotion();
  const contextRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Skip animations if reduced motion is preferred
    if (prefersReducedMotion) {
      return;
    }

    // Create GSAP context for cleanup
    contextRef.current = gsap.context(() => {
      // Execute animation function
      const result = animationFunction();
      
      // Store timeline if returned
      if (result && result.kill) {
        timelineRef.current = result;
      }
    });

    // Cleanup function
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [...dependencies, prefersReducedMotion]);

  return {
    timeline: timelineRef.current,
    context: contextRef.current,
    refresh: () => {
      if (contextRef.current) {
        contextRef.current.refresh();
      }
    },
    kill: () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    },
  };
};

/**
 * useGSAPTimeline Hook
 * 
 * Creates and manages a GSAP timeline.
 * Useful for complex sequential animations.
 * 
 * @param {Object} options - Timeline options
 * @returns {Object} - Timeline instance and controls
 * 
 * Usage:
 * const { timeline, play, pause, reverse } = useGSAPTimeline({ paused: true });
 * timeline.to(element, { x: 100 }).to(element, { y: 100 });
 */
export const useGSAPTimeline = (options = {}) => {
  const timelineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Create timeline
    timelineRef.current = gsap.timeline(options);

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [prefersReducedMotion]);

  return {
    timeline: timelineRef.current,
    play: () => timelineRef.current?.play(),
    pause: () => timelineRef.current?.pause(),
    reverse: () => timelineRef.current?.reverse(),
    restart: () => timelineRef.current?.restart(),
    kill: () => timelineRef.current?.kill(),
  };
};

/**
 * useGSAPRef Hook
 * 
 * Creates a ref that's properly cleaned up with GSAP context.
 * Use this instead of useRef for elements you'll animate.
 * 
 * @returns {React.RefObject}
 * 
 * Usage:
 * const elementRef = useGSAPRef();
 * <div ref={elementRef}>Content</div>
 */
export const useGSAPRef = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    return () => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
      }
    };
  }, []);

  return ref;
};

export default useGSAP;