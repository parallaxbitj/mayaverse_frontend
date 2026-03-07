import React, { useEffect, useRef, useState } from 'react';
import { getSponsors } from '../../../services/mockData';
import styles from './Sponsors.module.css';

/**
 * MAYAVERSE - Sponsors Page (Pact Chamber) - Cosmic Grid Edition
 */

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSponsors();
        if (res.success) {
          setSponsors(res.sponsors || []);
        }
      } catch (err) {
        console.error('Failed to load sponsors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Animation & Reveal logic
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(`.${styles.sponsorSection}`);
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [loading]);

  // Star Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animateId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const arr = [];
      const count = 180;
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.01 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
      starsRef.current = arr;
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((s) => {
        const bounce = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${s.opacity * bounce})`;
        ctx.fill();
      });
      animateId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animateId);
    };
  }, []);

  if (loading) return null;

  const premium = sponsors.filter((s) => s.tier === 'Premium');
  const allies = sponsors.filter((s) => s.tier === 'Ally');
  const supporters = sponsors.filter((s) => s.tier === 'Supporter');

  const SponsorCard = ({ sponsor, type }) => (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${styles[type.toLowerCase() + 'Card']}`}
    >
      {sponsor.subtitle && <div className={styles.subtitle}>{sponsor.subtitle}</div>}
      <div className={styles.logoWrapper}>
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
        <div className={styles.logoFallback} style={{ display: 'none' }}>
          {sponsor.name}
        </div>
      </div>
      <div className={styles.cardName}>{sponsor.name}</div>
    </a>
  );

  return (
    <div className={styles.sponsorsPage}>
      <div className={styles.bgNebula}></div>
      <div className={styles.bgStars}><canvas ref={canvasRef} /></div>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <header className={styles.header}>
        <h1>Guardians of the Realm</h1>
        <p className={styles.headerSubtitle}>The Sovereign Allies of Mayaverse</p>
      </header>

      {premium.length > 0 && (
        <section className={styles.sponsorSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.stLine} />
            <span className={styles.stText}>Premium Allies</span>
            <div className={styles.stLine} />
          </div>
          <div className={`${styles.cardsGrid} ${styles.premiumGrid}`}>
            {premium.map((s) => <SponsorCard key={s.id} sponsor={s} type="Premium" />)}
          </div>
        </section>
      )}

      {allies.length > 0 && (
        <section className={styles.sponsorSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.stLine} />
            <span className={styles.stText}>Allies</span>
            <div className={styles.stLine} />
          </div>
          <div className={`${styles.cardsGrid} ${styles.allyGrid}`}>
            {allies.map((s) => <SponsorCard key={s.id} sponsor={s} type="Ally" />)}
          </div>
        </section>
      )}

      {supporters.length > 0 && (
        <section className={styles.sponsorSection}>
          <div className={styles.sectionTitle}>
            <div className={styles.stLine} />
            <span className={styles.stText}>Supporters</span>
            <div className={styles.stLine} />
          </div>
          <div className={`${styles.cardsGrid} ${styles.supporterGrid}`}>
            {supporters.map((s) => <SponsorCard key={s.id} sponsor={s} type="Supporter" />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default Sponsors;