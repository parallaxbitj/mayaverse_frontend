/**
 * MAYAVERSE - GSAP Configuration
 * 
 * This file sets up GSAP with all necessary plugins and default settings.
 * Import this file before using any GSAP animations.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP Default Configuration
 * These settings apply globally to all GSAP animations
 */
gsap.defaults({
  ease: 'power2.out',
  duration: 1,
});

/**
 * ScrollTrigger Default Configuration
 */
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  markers: false, // Set to true for debugging
});

/**
 * Cinematic Easing Functions
 * Custom easing for portal-like, dramatic effects
 */
export const cinematicEase = {
  portal: 'power4.inOut',
  dramatic: 'power3.out',
  smooth: 'power2.inOut',
  snap: 'power4.out',
  elastic: 'elastic.out(1, 0.3)',
  bounce: 'bounce.out',
};

/**
 * Animation Duration Presets
 * Consistent timing across the application
 */
export const duration = {
  instant: 0.3,
  fast: 0.6,
  normal: 1,
  slow: 1.5,
  dramatic: 2,
  cinematic: 3,
};

/**
 * Stagger Presets
 * For sequential animations
 */
export const stagger = {
  tight: 0.05,
  normal: 0.1,
  loose: 0.2,
  dramatic: 0.3,
};

/**
 * Kill all ScrollTriggers and animations
 * Useful for cleanup and navigation
 */
export const killAllAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
};

/**
 * Refresh ScrollTrigger
 * Call after dynamic content loads
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

/**
 * Match Media Helper
 * For responsive animations
 */
export const createMatchMedia = () => {
  return gsap.matchMedia();
};

export default gsap;