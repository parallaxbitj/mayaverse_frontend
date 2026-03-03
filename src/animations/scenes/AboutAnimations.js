import gsap from '../utils/gsapConfig';
import { cinematicEase, duration } from '../utils/gsapConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Text Reveal Animation
 * Text fades in and rises as you scroll
 */
export const textRevealAnimation = (textElement) => {
  const words = textElement.textContent.split(' ');
  textElement.innerHTML = words
    .map(word => `<span style="display: inline-block; opacity: 0;">${word}</span>`)
    .join(' ');

  const spans = textElement.querySelectorAll('span');

  return ScrollTrigger.create({
    trigger: textElement,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: duration.fast,
        stagger: 0.03,
        ease: cinematicEase.smooth,
      });
    },
    once: true,
  });
};

/**
 * Floating Glyph Effect
 * Creates floating mystical symbols
 */
export const createFloatingGlyphs = (container) => {
  const glyphs = ['◈', '◆', '◇', '◉', '○'];
  
  for (let i = 0; i < 5; i++) {
    const glyph = document.createElement('div');
    glyph.textContent = glyphs[i % glyphs.length];
    glyph.style.position = 'absolute';
    glyph.style.fontSize = '2rem';
    glyph.style.color = 'rgba(99, 102, 241, 0.3)';
    glyph.style.left = `${Math.random() * 100}%`;
    glyph.style.top = `${Math.random() * 100}%`;
    glyph.style.pointerEvents = 'none';

    container.appendChild(glyph);

    gsap.to(glyph, {
      y: -100,
      x: (Math.random() - 0.5) * 100,
      opacity: 0,
      duration: 5 + Math.random() * 5,
      repeat: -1,
      delay: Math.random() * 5,
      ease: 'none',
    });
  }
};

export default {
  textRevealAnimation,
  createFloatingGlyphs,
};