import React, { useRef } from 'react';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import SponsorMarquee from '../../../components/common/SponsorMarquee/SponsorMarquee';
import styles from './Sponsors.module.css';

/**
 * MAYAVERSE - Sponsors Page (Pact Chamber)
 *
 * Features a rolling infinite marquee of sponsor logos.
 */

const Sponsors = () => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);

  useGSAP(() => {
    if (!heroTitleRef.current) return;
    const { gsap } = window;
    if (!gsap) return;

    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(heroTitleRef.current, { opacity: 0, y: 30, duration: 1, ease: 'power2.out' })
      .from(heroSubtitleRef.current, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    return () => tl.kill();
  }, []);

  return (
    <div className={styles.sponsorsPage}>
      {/* Hero Section */}
      {/* <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.pageTitle}>Pact Chamber</h1>
          <p ref={heroSubtitleRef} className={styles.pageSubtitle}>
            The allies who power the MAYAVERSE
          </p>
        </div>
      </section> */}

      {/* Rolling Sponsor Marquee */}
      <SponsorMarquee />
    </div>
  );
};

export default Sponsors;