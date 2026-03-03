/**
 * MAYAVERSE - Portal Transition Effect
 * 
 * Creates a cinematic portal opening/closing effect for page transitions.
 * This is the core visual effect that makes navigation feel like traveling between worlds.
 */

import gsap from '../utils/gsapConfig';
import { cinematicEase, duration } from '../utils/gsapConfig';

/**
 * Portal Opening Animation
 * Used when entering a new page
 * 
 * @param {HTMLElement} portalElement - Portal overlay element
 * @param {Function} onComplete - Callback when animation completes
 * @param {number} customDuration - Optional custom duration
 * @returns {gsap.core.Timeline}
 */
export const portalOpenAnimation = (portalElement, onComplete, customDuration = duration.dramatic) => {
  const tl = gsap.timeline({
    onComplete,
  });

  // Portal starts as a small circle in center and expands
  tl.set(portalElement, {
    scale: 0,
    opacity: 1,
    clipPath: 'circle(0% at 50% 50%)',
  })
  .to(portalElement, {
    clipPath: 'circle(150% at 50% 50%)',
    scale: 1,
    duration: customDuration,
    ease: cinematicEase.portal,
  })
  .to(portalElement, {
    opacity: 0,
    duration: duration.fast,
    ease: 'power2.out',
  });

  return tl;
};

/**
 * Portal Closing Animation
 * Used when leaving a page
 * 
 * @param {HTMLElement} portalElement - Portal overlay element
 * @param {Function} onComplete - Callback when animation completes
 * @param {number} customDuration - Optional custom duration
 * @returns {gsap.core.Timeline}
 */
export const portalCloseAnimation = (portalElement, onComplete, customDuration = duration.dramatic) => {
  const tl = gsap.timeline({
    onComplete,
  });

  // Portal closes from full screen to center point
  tl.set(portalElement, {
    clipPath: 'circle(150% at 50% 50%)',
    opacity: 1,
    scale: 1,
  })
  .to(portalElement, {
    clipPath: 'circle(0% at 50% 50%)',
    duration: customDuration,
    ease: cinematicEase.portal,
  });

  return tl;
};

/**
 * Portal Pulse Effect
 * Subtle pulsing animation for idle state
 * 
 * @param {HTMLElement} element - Element to pulse
 * @param {Object} options - Pulse options
 * @returns {gsap.core.Tween}
 */
export const portalPulse = (element, options = {}) => {
  return gsap.to(element, {
    scale: options.scale || 1.05,
    opacity: options.opacity || 0.8,
    duration: options.duration || 1.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    ...options,
  });
};

/**
 * Portal Glow Effect
 * Creates glowing border animation
 * 
 * @param {HTMLElement} element - Element to add glow
 * @param {string} color - Glow color
 * @param {Object} options - Glow options
 * @returns {gsap.core.Timeline}
 */
export const portalGlow = (element, color = '#6366f1', options = {}) => {
  const intensity = options.intensity || 20;
  const speed = options.speed || 2;

  return gsap.to(element, {
    boxShadow: `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}`,
    duration: speed,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Portal Ripple Effect
 * Creates expanding ripple from center
 * 
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Ripple options
 */
export const createPortalRipple = (container, options = {}) => {
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.top = '50%';
  ripple.style.left = '50%';
  ripple.style.width = '10px';
  ripple.style.height = '10px';
  ripple.style.borderRadius = '50%';
  ripple.style.border = `2px solid ${options.color || '#6366f1'}`;
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.pointerEvents = 'none';

  container.appendChild(ripple);

  gsap.to(ripple, {
    width: '200%',
    height: '200%',
    opacity: 0,
    duration: options.duration || 1.5,
    ease: 'power2.out',
    onComplete: () => {
      ripple.remove();
    },
  });
};

/**
 * Portal Entry with Content Reveal
 * Combines portal animation with content fade-in
 * 
 * @param {HTMLElement} portalElement - Portal overlay
 * @param {HTMLElement} contentElement - Content to reveal
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline}
 */
export const portalEntryWithContent = (portalElement, contentElement, options = {}) => {
  const tl = gsap.timeline();

  // Set initial states
  tl.set(contentElement, {
    opacity: 0,
    y: 30,
  });

  // Portal opens
  tl.add(portalOpenAnimation(portalElement, null, options.portalDuration));

  // Content fades in
  tl.to(contentElement, {
    opacity: 1,
    y: 0,
    duration: duration.normal,
    ease: 'power2.out',
  }, '-=0.5'); // Overlap slightly

  return tl;
};

/**
 * Portal Exit with Content Hide
 * Combines content fade-out with portal closing
 * 
 * @param {HTMLElement} portalElement - Portal overlay
 * @param {HTMLElement} contentElement - Content to hide
 * @param {Function} onComplete - Callback when complete
 * @param {Object} options - Animation options
 * @returns {gsap.core.Timeline}
 */
export const portalExitWithContent = (portalElement, contentElement, onComplete, options = {}) => {
  const tl = gsap.timeline({
    onComplete,
  });

  // Content fades out
  tl.to(contentElement, {
    opacity: 0,
    y: -30,
    duration: duration.fast,
    ease: 'power2.in',
  });

  // Portal closes
  tl.add(portalCloseAnimation(portalElement, null, options.portalDuration));

  return tl;
};

export default {
  portalOpenAnimation,
  portalCloseAnimation,
  portalPulse,
  portalGlow,
  createPortalRipple,
  portalEntryWithContent,
  portalExitWithContent,
};