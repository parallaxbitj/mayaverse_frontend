/**
 * MAYAVERSE - Portal Entry Page
 * 
 * Mystical rune portal in dark cosmic space.
 * Pre-entry gateway to the MAYAVERSE experience.
 * Click the portal to enter the main site.
 */

import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/config';
import { useReducedMotion } from '../hooks/useReducedMotion';
import gsap from 'gsap';
import styles from './PortalEntry.module.css';

/**
 * RuneCircles Component for Entry Portal
 */
const RuneCircles = ({ isHovering, isClicking }) => {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚳ', 'ᚴ', 'ᚵ', 'ᚶ', 'ᚷ', 'ᚸ'];
  
  const outerRunes = Array(20).fill(null).map((_, i) => runes[i % runes.length]);
  const innerRunes = Array(14).fill(null).map((_, i) => runes[(i + 6) % runes.length]);

  return (
    <div className={`${styles.runeContainer} ${isHovering ? styles.hovering : ''} ${isClicking ? styles.clicking : ''}`}>
      {/* Outer Circle - Clockwise, Slow Rotation */}
      <div className={styles.runeCircleOuter}>
        {outerRunes.map((rune, idx) => (
          <div
            key={`outer-${idx}`}
            className={styles.rune}
            style={{
              transform: `rotate(${(idx / outerRunes.length) * 360}deg) translateY(-100px) rotate(-${(idx / outerRunes.length) * 360}deg)`,
            }}
          >
            {rune}
          </div>
        ))}
        {/* Outer Circle Border */}
        <div className={styles.circleBorder} style={{ width: '200px', height: '200px' }} />
      </div>

      {/* Inner Circle - Counter-Clockwise, Slow Rotation */}
      <div className={styles.runeCircleInner}>
        {innerRunes.map((rune, idx) => (
          <div
            key={`inner-${idx}`}
            className={styles.rune}
            style={{
              transform: `rotate(${(idx / innerRunes.length) * 360}deg) translateY(-65px) rotate(-${(idx / innerRunes.length) * 360}deg)`,
            }}
          >
            {rune}
          </div>
        ))}
        {/* Inner Circle Border */}
        <div className={styles.circleBorder} style={{ width: '130px', height: '130px' }} />
      </div>

      {/* Central Glow */}
      <div className={styles.portalGlow} />
      
      {/* Mystical Energy Particles */}
      <div className={styles.energyParticles}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            '--delay': `${i * 0.5}s`
          }} />
        ))}
      </div>
    </div>
  );
};

/**
 * PortalEntry Component
 * 
 * Landing page with interactive mystical portal.
 * Clicking the portal transitions to the main site.
 */
const PortalEntry = () => {
  const navigate = useNavigate();
  const portalRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Ambient glow animation
    if (!prefersReducedMotion && containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundImage: [
          'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
          'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        ],
        duration: 8,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }
  }, [prefersReducedMotion]);

  const handlePortalHover = () => {
    if (!prefersReducedMotion) {
      setIsHovering(true);
    }
  };

  const handlePortalLeave = () => {
    if (!isClicking) {
      setIsHovering(false);
    }
  };

  const handlePortalClick = () => {
    if (isClicking || prefersReducedMotion) return;

    setIsClicking(true);

    // Spin animation - letters fade, just lines remain
    const tl = gsap.timeline({
      onComplete: () => {
        // Navigate to home after spin completes
        navigate(ROUTES.HOME);
      },
    });

    if (portalRef.current) {
      // Rapid spin with blur effect
      tl.to(
        portalRef.current,
        {
          rotation: 720,
          duration: 2,
          ease: 'power2.in',
        },
        0
      )
        // Fade out letters
        .to(
          portalRef.current.querySelectorAll(`.${styles.rune}`),
          {
            opacity: 0,
            duration: 0.5,
          },
          0.2
        )
        // Flash and close portal
        .to(
          containerRef.current,
          {
            backgroundImage: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.5) 0%, transparent 70%)',
            duration: 0.3,
          },
          1.5
        )
        .to(
          portalRef.current,
          {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
          },
          1.7
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.portalEntryContainer}
      onMouseMove={(e) => {
        // Subtle mouse tracking for ambient effect
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        gsap.to(containerRef.current, {
          backgroundPosition: `${x}% ${y}%`,
          duration: 0.5,
          overwrite: 'auto',
        });
      }}
    >
      {/* Cosmic Stars Background */}
      <div className={styles.starsContainer}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--duration': `${3 + Math.random() * 4}s`,
              '--delay': `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Portal Gateway */}
      <div className={styles.portalWrapper}>
        <h1 className={styles.title}>MAYAVERSE</h1>
        
        <div
          ref={portalRef}
          className={styles.portalContainer}
          onMouseEnter={handlePortalHover}
          onMouseLeave={handlePortalLeave}
          onClick={handlePortalClick}
          role="button"
          tabIndex={0}
          aria-label="Enter portal"
        >
          <RuneCircles isHovering={isHovering} isClicking={isClicking} />
        </div>

        <p className={styles.instruction}>
          {isClicking ? 'Entering...' : 'Click the portal to enter'}
        </p>
      </div>

      {/* Cosmic Rays */}
      <div className={styles.cosmicRaysContainer}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.cosmicRay} style={{ '--ray-delay': `${i * 1}s` }} />
        ))}
      </div>
    </div>
  );
};

export default PortalEntry;