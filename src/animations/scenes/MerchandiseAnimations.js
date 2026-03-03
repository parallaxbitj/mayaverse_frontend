import gsap from '../utils/gsapConfig';
import { cinematicEase, duration } from '../utils/gsapConfig';

/**
 * Rift Entry Animation
 * Portal-like rift opens to reveal merchandise
 */
export const riftEntryAnimation = (riftOverlay) => {
  const tl = gsap.timeline();

  tl.from(riftOverlay, {
    scaleX: 0,
    duration: duration.dramatic,
    ease: cinematicEase.portal,
  })
  .to(riftOverlay, {
    opacity: 0,
    duration: duration.fast,
  });

  return tl;
};

/**
 * Lightning Flash Effect
 * Red lightning flashes in background
 */
export const lightningFlashEffect = (container) => {
  const flash = () => {
    gsap.to(container, {
      boxShadow: 'inset 0 0 100px rgba(239, 68, 68, 0.8)',
      duration: 0.05,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Random delay between flashes
        gsap.delayedCall(2 + Math.random() * 3, flash);
      },
    });
  };

  flash();
};

/**
 * Product Portal Pulse
 * Merchandise items pulse like portals
 */
export const productPortalPulse = (productsContainer) => {
  const products = productsContainer.querySelectorAll('[data-merch-card]');

  products.forEach((product, index) => {
    gsap.to(product, {
      boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: index * 0.2,
    });
  });
};

/**
 * Rift Particles (CSS-based)
 */
export const createRiftParticles = (container) => {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = `${10 + Math.random() * 20}px`;
    particle.style.background = 'rgba(239, 68, 68, 0.6)';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.pointerEvents = 'none';

    container.appendChild(particle);

    gsap.to(particle, {
      y: -200,
      opacity: 0,
      duration: 2 + Math.random() * 2,
      repeat: -1,
      delay: Math.random() * 2,
      ease: 'none',
    });
  }
};

export const setupMerchandiseAnimations = (refs) => {
  const { riftOverlayRef, containerRef, productsRef } = refs;

  const timelines = [];

  if (riftOverlayRef.current) {
    timelines.push(riftEntryAnimation(riftOverlayRef.current));
  }

  if (containerRef.current) {
    lightningFlashEffect(containerRef.current);
    createRiftParticles(containerRef.current);
  }

  if (productsRef.current) {
    productPortalPulse(productsRef.current);
  }

  return () => {
    timelines.forEach(tl => tl.kill());
    gsap.killTweensOf(containerRef.current);
    gsap.killTweensOf(productsRef.current?.querySelectorAll('[data-merch-card]'));
  };
};

export default { setupMerchandiseAnimations };