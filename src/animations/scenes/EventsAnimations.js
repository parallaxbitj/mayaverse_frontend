/**
 * MAYAVERSE - Events Page Animations (Trials Arena)
 * 
 * Cinematic animations for the events page:
 * 1. Event cards pulse subtly
 * 2. Category-based hover glow
 * 3. Card expand animation on interaction
 * 4. Filter button ripple effect
 */

import gsap from '../utils/gsapConfig';
import { cinematicEase, duration } from '../utils/gsapConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Event Cards Pulse Animation
 * Subtle breathing effect on event cards
 * 
 * @param {HTMLElement} cardsContainer - Container with event cards
 */
export const eventCardsPulse = (cardsContainer) => {
  const cards = cardsContainer.querySelectorAll('[data-event-card]');

  cards.forEach((card, index) => {
    gsap.to(card, {
      scale: 1.02,
      duration: 2 + (index % 3) * 0.5, // Varying durations
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: index * 0.3, // Stagger the pulses
    });
  });
};

/**
 * Category Glow Effect
 * Adds glowing effect based on event category
 * 
 * @param {HTMLElement} card - Event card element
 * @param {string} category - Event category
 */
export const applyCategoryGlow = (card, category) => {
  const glowColors = {
    Technical: '#6366f1',
    Cultural: '#ec4899',
    Workshop: '#8b5cf6',
    Competition: '#f59e0b',
    Gaming: '#10b981',
  };

  const color = glowColors[category] || '#6366f1';

  // Add glow on hover
  const handleMouseEnter = () => {
    gsap.to(card, {
      boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      boxShadow: 'var(--shadow-md)',
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Card Expand Animation
 * Expands card when clicked
 * 
 * @param {HTMLElement} card - Card to expand
 * @param {Function} onComplete - Callback when expanded
 * @returns {gsap.core.Timeline}
 */
export const expandCardAnimation = (card, onComplete) => {
  const tl = gsap.timeline({ onComplete });

  tl.to(card, {
    scale: 1.05,
    z: 100,
    duration: duration.fast,
    ease: cinematicEase.snap,
  })
  .to(card, {
    rotationY: 360,
    duration: duration.normal,
    ease: cinematicEase.smooth,
  }, '-=0.3');

  return tl;
};

/**
 * Cards Entrance Animation
 * Cards fade in and rise up on scroll
 * 
 * @param {HTMLElement} cardsContainer - Container with cards
 * @returns {ScrollTrigger}
 */
export const cardsEntranceAnimation = (cardsContainer) => {
  const cards = cardsContainer.querySelectorAll('[data-event-card]');

  return ScrollTrigger.batch(cards, {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: duration.normal,
        stagger: 0.1,
        ease: cinematicEase.smooth,
      });
    },
    start: 'top 85%',
    once: true,
  });
};

/**
 * Filter Button Ripple
 * Creates ripple effect when filter is clicked
 * 
 * @param {HTMLElement} button - Filter button
 */
export const filterButtonRipple = (button) => {
  const handleClick = (e) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  };

  button.addEventListener('click', handleClick);

  return () => {
    button.removeEventListener('click', handleClick);
  };
};

/**
 * Hero Arena Entrance
 * Dramatic entrance for events page hero
 * 
 * @param {Object} refs - { titleRef, subtitleRef }
 * @returns {gsap.core.Timeline}
 */
export const arenaEntranceAnimation = (refs) => {
  const { titleRef, subtitleRef } = refs;

  const tl = gsap.timeline();

  tl.from(titleRef.current, {
    opacity: 0,
    scale: 0.5,
    rotationX: -90,
    duration: duration.dramatic,
    ease: cinematicEase.dramatic,
  })
  .from(subtitleRef.current, {
    opacity: 0,
    y: 30,
    duration: duration.normal,
    ease: cinematicEase.smooth,
  }, '-=0.8');

  return tl;
};

/**
 * Complete Events Page Animation Setup
 * 
 * @param {Object} refs - All necessary refs
 * @returns {Function} - Cleanup function
 */
export const setupEventsAnimations = (refs) => {
  const {
    heroTitleRef,
    heroSubtitleRef,
    cardsContainerRef,
    filterButtonsRef,
  } = refs;

  // Hero entrance
  const heroTimeline = arenaEntranceAnimation({
    titleRef: heroTitleRef,
    subtitleRef: heroSubtitleRef,
  });

  const triggers = [];
  const cleanupFunctions = [];

  // Cards entrance and pulse
  if (cardsContainerRef.current) {
    triggers.push(cardsEntranceAnimation(cardsContainerRef.current));
    eventCardsPulse(cardsContainerRef.current);

    // Apply category glows
    const cards = cardsContainerRef.current.querySelectorAll('[data-event-card]');
    cards.forEach(card => {
      const category = card.getAttribute('data-event-category');
      if (category) {
        const cleanup = applyCategoryGlow(card, category);
        cleanupFunctions.push(cleanup);
      }
    });
  }

  // Filter button effects
  if (filterButtonsRef.current) {
    const buttons = filterButtonsRef.current.querySelectorAll('button');
    buttons.forEach(button => {
      const cleanup = filterButtonRipple(button);
      cleanupFunctions.push(cleanup);
    });
  }

  // Cleanup
  return () => {
    heroTimeline.kill();
    triggers.forEach(trigger => trigger?.kill());
    cleanupFunctions.forEach(fn => fn());
    gsap.killTweensOf(cardsContainerRef.current?.querySelectorAll('[data-event-card]'));
  };
};

export default {
  eventCardsPulse,
  applyCategoryGlow,
  expandCardAnimation,
  cardsEntranceAnimation,
  filterButtonRipple,
  arenaEntranceAnimation,
  setupEventsAnimations,
};