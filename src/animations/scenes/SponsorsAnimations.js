import gsap from '../utils/gsapConfig';
import { cinematicEase, duration } from '../utils/gsapConfig';
import { createVerticalScrollController } from '../utils/scrollUtils';

/**
 * Pillar Movement Animation
 * Maps vertical scroll to pillar translation
 */
export const pillarScrollAnimation = (pillarsContainer) => {
  const pillars = pillarsContainer.querySelectorAll('[data-sponsor-pillar]');
  
  return createVerticalScrollController(
    pillarsContainer,
    (progress, direction) => {
      pillars.forEach((pillar, index) => {
        const offset = (index - pillars.length / 2) * 50;
        const y = progress * offset;
        
        gsap.to(pillar, {
          y: y,
          duration: 0.1,
          ease: 'none',
        });
        
        // Highlight active pillar (middle of viewport)
        const isActive = Math.abs(progress * pillars.length - index) < 0.5;
        gsap.to(pillar, {
          opacity: isActive ? 1 : 0.5,
          scale: isActive ? 1.05 : 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }
  );
};

/**
 * Background Lighting Shift
 */
export const backgroundLightingAnimation = (bgElement) => {
  return gsap.to(bgElement, {
    backgroundPosition: '50% 100%',
    duration: 3,
    ease: 'none',
    scrollTrigger: {
      trigger: bgElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  });
};

/**
 * Sponsor Tier Reveal
 */
export const tierRevealAnimation = (tierSection) => {
  const tl = gsap.timeline();
  
  tl.from(tierSection.querySelector('h2'), {
    opacity: 0,
    x: -50,
    duration: duration.normal,
  })
  .from(tierSection.querySelectorAll('[data-sponsor-card]'), {
    opacity: 0,
    scale: 0.8,
    y: 30,
    stagger: 0.1,
    duration: duration.normal,
    ease: cinematicEase.smooth,
  }, '-=0.5');

  return {
    trigger: tierSection,
    start: 'top 75%',
    animation: tl,
    once: true,
  };
};

export const setupSponsorsAnimations = (refs) => {
  const { pillarsContainerRef, bgElementRef, tierSectionsRef } = refs;

  const triggers = [];

  if (pillarsContainerRef.current) {
    triggers.push(pillarScrollAnimation(pillarsContainerRef.current));
  }

  if (bgElementRef.current) {
    triggers.push(backgroundLightingAnimation(bgElementRef.current));
  }

  if (tierSectionsRef.current) {
    const sections = tierSectionsRef.current.querySelectorAll('[data-tier-section]');
    sections.forEach(section => {
      triggers.push(tierRevealAnimation(section));
    });
  }

  return () => {
    triggers.forEach(t => t?.kill());
  };
};

export default { setupSponsorsAnimations };