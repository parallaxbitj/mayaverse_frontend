/**
 * MAYAVERSE - Home Page Animations
 * 
 * Cinematic animations for the home page:
 * 1. Portal entry animation on load
 * 2. Hero section reveal (title, tagline, buttons)
 * 3. Stats section count-up animation
 * 4. Feature cards stagger entrance
 * 5. CTA section parallax
 */

import gsap from '../utils/gsapConfig';
import { cinematicEase, duration, stagger } from '../utils/gsapConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hero Section Reveal Animation
 * Animates hero title, tagline, and buttons on page load
 * 
 * @param {Object} refs - { titleRef, taglineRef, buttonsRef }
 * @returns {gsap.core.Timeline}
 */
export const heroRevealAnimation = (refs) => {
  const { titleRef, taglineRef, buttonsRef } = refs;

  const tl = gsap.timeline({ delay: 0.5 });

  // Set initial states
  tl.set([titleRef.current, taglineRef.current, buttonsRef.current], {
    opacity: 0,
    y: 50,
  });

  // Animate in sequence
  tl.to(titleRef.current, {
    opacity: 1,
    y: 0,
    duration: duration.dramatic,
    ease: cinematicEase.dramatic,
  })
  .to(taglineRef.current, {
    opacity: 1,
    y: 0,
    duration: duration.normal,
    ease: cinematicEase.smooth,
  }, '-=0.8') // Overlap with title
  .to(buttonsRef.current, {
    opacity: 1,
    y: 0,
    duration: duration.normal,
    ease: cinematicEase.smooth,
  }, '-=0.5'); // Overlap with tagline

  return tl;
};

/**
 * Stats Counter Animation
 * Animates numbers counting up with entrance
 * 
 * @param {HTMLElement} statsContainer - Container with stat cards
 * @returns {ScrollTrigger}
 */
export const statsCounterAnimation = (statsContainer) => {
  const statNumbers = statsContainer.querySelectorAll('[data-stat-number]');
  const statCards = statsContainer.querySelectorAll('[data-stat-card]');

  // Create timeline
  const tl = gsap.timeline();

  // Cards entrance
  tl.from(statCards, {
    opacity: 0,
    scale: 0.8,
    y: 30,
    duration: duration.normal,
    stagger: stagger.normal,
    ease: cinematicEase.smooth,
  });

  // Number count-up
  statNumbers.forEach((element) => {
    const finalValue = element.getAttribute('data-stat-number');
    const obj = { value: 0 };

    tl.to(obj, {
      value: finalValue,
      duration: duration.slow,
      ease: 'power2.out',
      onUpdate: function() {
        // Format number (add commas, symbols, etc.)
        let displayValue = Math.floor(obj.value);
        
        // Add formatting based on data attributes
        if (element.hasAttribute('data-stat-suffix')) {
          displayValue = displayValue + element.getAttribute('data-stat-suffix');
        }
        if (element.hasAttribute('data-stat-prefix')) {
          displayValue = element.getAttribute('data-stat-prefix') + displayValue;
        }
        
        element.textContent = displayValue;
      },
    }, '-=1'); // Start counting while cards are still animating in
  });

  // Trigger on scroll
  return ScrollTrigger.create({
    trigger: statsContainer,
    start: 'top 80%',
    animation: tl,
    once: true, // Only play once
  });
};

/**
 * Feature Cards Stagger Animation
 * Cards enter with stagger effect on scroll
 * 
 * @param {HTMLElement} featuresContainer - Container with feature cards
 * @returns {ScrollTrigger}
 */
export const featureCardsAnimation = (featuresContainer) => {
  const cards = featuresContainer.querySelectorAll('[data-feature-card]');

  const tl = gsap.timeline();

  tl.from(cards, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: duration.normal,
    stagger: stagger.loose,
    ease: cinematicEase.smooth,
  });

  return ScrollTrigger.create({
    trigger: featuresContainer,
    start: 'top 70%',
    animation: tl,
    once: true,
  });
};

/**
 * CTA Section Parallax
 * Creates depth effect on CTA section
 * 
 * @param {HTMLElement} ctaSection - CTA section element
 * @param {HTMLElement} ctaContent - CTA content to parallax
 * @returns {ScrollTrigger}
 */
export const ctaParallaxAnimation = (ctaSection, ctaContent) => {
  return gsap.to(ctaContent, {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: ctaSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
};

/**
 * Feature Icon Pulse
 * Subtle pulsing animation for feature icons
 * 
 * @param {HTMLElement} iconsContainer - Container with icons
 */
export const featureIconPulse = (iconsContainer) => {
  const icons = iconsContainer.querySelectorAll('[data-feature-icon]');

  icons.forEach((icon, index) => {
    gsap.to(icon, {
      scale: 1.1,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: index * 0.2, // Stagger the pulses
    });
  });
};

/**
 * Hero Background Animation
 * Subtle moving background effect
 * 
 * @param {HTMLElement} heroBackground - Hero background element
 * @returns {gsap.core.Tween}
 */
export const heroBackgroundAnimation = (heroBackground) => {
  return gsap.to(heroBackground, {
    backgroundPosition: '100% 100%',
    duration: 20,
    ease: 'none',
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Complete Home Page Animation Setup
 * Call this from the Home component to initialize all animations
 * 
 * @param {Object} refs - All necessary refs for home page elements
 * @returns {Object} - Cleanup functions
 */
export const setupHomeAnimations = (refs) => {
  const {
    heroTitleRef,
    heroTaglineRef,
    heroButtonsRef,
    statsContainerRef,
    featuresContainerRef,
    ctaSectionRef,
    ctaContentRef,
  } = refs;

  // Initialize animations
  const heroTimeline = heroRevealAnimation({
    titleRef: heroTitleRef,
    taglineRef: heroTaglineRef,
    buttonsRef: heroButtonsRef,
  });

  const triggers = [];

  if (statsContainerRef.current) {
    triggers.push(statsCounterAnimation(statsContainerRef.current));
  }

  if (featuresContainerRef.current) {
    triggers.push(featureCardsAnimation(featuresContainerRef.current));
  }

  if (ctaSectionRef.current && ctaContentRef.current) {
    triggers.push(ctaParallaxAnimation(ctaSectionRef.current, ctaContentRef.current));
  }

  // Cleanup function
  return () => {
    heroTimeline.kill();
    triggers.forEach(trigger => trigger.kill());
  };
};

export default {
  heroRevealAnimation,
  statsCounterAnimation,
  featureCardsAnimation,
  ctaParallaxAnimation,
  featureIconPulse,
  heroBackgroundAnimation,
  setupHomeAnimations,
};