import React, { useRef, useEffect } from 'react';
import { APP_NAME } from '../../../constants/config';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import styles from './About.module.css';

/**
 * MAYAVERSE - About Page
 * 
 * Information about the techfest, vision, mission, and team.
 * 
 * ANIMATIONS:
 * - Progressive text reveal (word-by-word)
 * - Floating glyph effects
 * - Section reveals on scroll
 */

const About = () => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const contentRef = useRef(null);
  const valuesGridRef = useRef(null);
  const glyphContainerRef = useRef(null);

  // Hero entrance animation
  useGSAP(() => {
    if (!heroTitleRef.current) return;

    const { gsap } = window;
    if (!gsap) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(heroTitleRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
    })
      .from(heroSubtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6');

    return () => tl.kill();
  }, []);

  // Text reveal animation
  useGSAP(() => {
    if (!contentRef.current) return;

    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) return;

    const paragraphs = contentRef.current.querySelectorAll('p');

    paragraphs.forEach((p) => {
      ScrollTrigger.create({
        trigger: p,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(p, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Values grid animation
  useGSAP(() => {
    if (!valuesGridRef.current) return;

    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) return;

    const cards = valuesGridRef.current.querySelectorAll('[data-value-card]');

    ScrollTrigger.create({
      trigger: valuesGridRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Floating glyphs effect
  useGSAP(() => {
    if (!glyphContainerRef.current) return;

    const { gsap } = window;
    if (!gsap) return;

    const glyphs = ['◈', '◆', '◇', '◉', '○'];
    const container = glyphContainerRef.current;

    for (let i = 0; i < 5; i++) {
      const glyph = document.createElement('div');
      glyph.textContent = glyphs[i % glyphs.length];
      glyph.className = styles.floatingGlyph;
      glyph.style.left = `${Math.random() * 100}%`;
      glyph.style.top = `${Math.random() * 100}%`;
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

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className={styles.aboutPage}>
      {/* Floating Glyphs Container */}
      <div ref={glyphContainerRef} className={styles.glyphContainer} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.pageTitle}>About {APP_NAME}</h1>
          <p ref={heroSubtitleRef} className={styles.pageSubtitle}>
            India's premier technical festival bringing together innovation, technology, and talent
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div ref={contentRef} className="max-w-4xl text-left flex flex-col gap-6 mb-16">
            <p className="text-white/80 font-light text-lg md:text-xl leading-relaxed">
              <strong className="text-white font-cinzel tracking-wider mr-2">PARALLAX 2026,</strong>
              formerly known as TechVibes, is the annual technical fest of BIT Mesra, Jaipur Campus — celebrating innovation, creativity, and technological excellence.
            </p>
            <p className="text-white/60 font-light text-md md:text-lg leading-relaxed">
              Inspired by <span className="text-[#ff00de] italic">parallax</span> — a shift in perspective that reveals new possibilities — the fest promotes bold thinking through competitions, workshops, exhibitions, and visionary sessions.
            </p>
            <div className="mt-4 p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(0,242,254,0.15)] transition-all hover:shadow-[0_0_60px_rgba(0,242,254,0.3)] hover:border-[#00f2fe]/30">
              <h3 className="text-[#00f2fe] font-cinzel text-xl md:text-2xl font-bold italic tracking-wide mb-4" style={{ textShadow: "0 0 15px rgba(0, 242, 254, 0.6)" }}>
                “Mayaverse — Where Innovation Feels Like Magic”
              </h3>
              <p className="text-white/80 font-light text-md leading-relaxed">
                This year’s theme imagines a space where imagination meets technology, and when innovation reaches its peak, it becomes more than technology — it becomes magic.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div ref={valuesGridRef} className={styles.valuesGrid}>
            <div className={styles.valueCard} data-value-card>
              <h3>🚀 Innovation</h3>
              <p>Pushing boundaries and thinking beyond limits</p>
            </div>
            <div className={styles.valueCard} data-value-card>
              <h3>🤝 Collaboration</h3>
              <p>Building connections and working together</p>
            </div>
            <div className={styles.valueCard} data-value-card>
              <h3>💡 Excellence</h3>
              <p>Striving for the highest standards in everything</p>
            </div>
            <div className={styles.valueCard} data-value-card>
              <h3>🎯 Impact</h3>
              <p>Creating meaningful change in the tech community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;