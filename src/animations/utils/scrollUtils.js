/**
 * MAYAVERSE - Scroll Utilities
 * 
 * Utilities for scroll-based animations and scroll locking.
 * Used for cinematic scroll-triggered scenes.
 */

import gsap from './gsapConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lock scroll to a specific section
 * Used for scroll-controlled animations (like ring rotation)
 * 
 * @param {HTMLElement} element - Element to lock scroll to
 * @param {Function} onProgress - Callback with scroll progress (0-1)
 * @param {Object} options - ScrollTrigger options
 * @returns {ScrollTrigger} - ScrollTrigger instance
 */
export const createScrollLock = (element, onProgress, options = {}) => {
  return ScrollTrigger.create({
    trigger: element,
    start: options.start || 'top top',
    end: options.end || '+=100%',
    pin: options.pin !== false,
    scrub: options.scrub !== false,
    onUpdate: (self) => {
      if (onProgress) {
        onProgress(self.progress);
      }
    },
    ...options,
  });
};

/**
 * Create scroll-triggered timeline
 * Links a GSAP timeline to scroll position
 * 
 * @param {gsap.core.Timeline} timeline - GSAP timeline
 * @param {HTMLElement} trigger - Element that triggers the animation
 * @param {Object} options - ScrollTrigger options
 * @returns {ScrollTrigger}
 */
export const createScrollTimeline = (timeline, trigger, options = {}) => {
  return ScrollTrigger.create({
    trigger: trigger,
    start: options.start || 'top center',
    end: options.end || 'bottom center',
    scrub: options.scrub ?? 1,
    animation: timeline,
    ...options,
  });
};

/**
 * Smooth scroll to element
 * 
 * @param {HTMLElement|string} target - Element or selector to scroll to
 * @param {Object} options - Scroll options
 */
export const smoothScrollTo = (target, options = {}) => {
  gsap.to(window, {
    scrollTo: {
      y: target,
      offsetY: options.offset || 0,
    },
    duration: options.duration || 1,
    ease: options.ease || 'power2.inOut',
  });
};

/**
 * Disable scroll
 */
export const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
};

/**
 * Enable scroll
 */
export const enableScroll = () => {
  document.body.style.overflow = '';
  document.body.style.height = '';
};

/**
 * Get scroll progress for an element
 * 
 * @param {HTMLElement} element
 * @returns {number} - Progress from 0 to 1
 */
export const getScrollProgress = (element) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Element is above viewport
  if (rect.bottom < 0) return 1;
  
  // Element is below viewport
  if (rect.top > windowHeight) return 0;
  
  // Element is in viewport
  const elementHeight = rect.height;
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  
  return visibleHeight / elementHeight;
};

/**
 * Create vertical scroll controller
 * Maps vertical scroll to a value
 * 
 * @param {HTMLElement} element - Element to track
 * @param {Function} onScroll - Callback(progress, direction)
 * @param {Object} options - Options
 * @returns {ScrollTrigger}
 */
export const createVerticalScrollController = (element, onScroll, options = {}) => {
  let lastProgress = 0;
  
  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const progress = self.progress;
      const direction = progress > lastProgress ? 1 : -1;
      
      if (onScroll) {
        onScroll(progress, direction);
      }
      
      lastProgress = progress;
    },
    ...options,
  });
};

/**
 * Batch scroll animations
 * Efficiently animate multiple elements on scroll
 * 
 * @param {string} selector - Element selector
 * @param {Object} animation - Animation properties
 * @param {Object} options - Batch options
 * @returns {Array} - Array of ScrollTriggers
 */
export const batchScrollAnimation = (selector, animation, options = {}) => {
  return ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.to(elements, {
        ...animation,
        stagger: options.stagger || 0.1,
      });
    },
    start: options.start || 'top 80%',
    ...options,
  });
};

/**
 * Parallax scroll effect
 * 
 * @param {HTMLElement} element - Element to parallax
 * @param {number} speed - Parallax speed (0.5 = half speed, 2 = double speed)
 * @param {Object} options - Additional options
 * @returns {ScrollTrigger}
 */
export const createParallax = (element, speed = 0.5, options = {}) => {
  return gsap.to(element, {
    y: () => {
      const distance = element.offsetHeight * speed;
      return -distance;
    },
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options,
    },
  });
};

/**
 * Hook for scroll locking (React)
 */
export const useScrollLock = () => {
  const lock = () => disableScroll();
  const unlock = () => enableScroll();
  
  return { lock, unlock };
};

export default {
  createScrollLock,
  createScrollTimeline,
  smoothScrollTo,
  disableScroll,
  enableScroll,
  getScrollProgress,
  createVerticalScrollController,
  batchScrollAnimation,
  createParallax,
  useScrollLock,
};