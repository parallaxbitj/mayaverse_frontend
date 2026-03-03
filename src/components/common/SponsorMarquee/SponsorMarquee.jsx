import React, { useRef, useEffect } from 'react';
import styles from './SponsorMarquee.module.css';

/**
 * SponsorMarquee — Single infinite seamless logo scroll.
 * Uses simple-icons CDN for brand-colored SVG logos.
 * Animation driven by CSS @keyframes declared in <style> tag
 * to avoid CSS Modules keyframe name mangling issues.
 */

const ALL_LOGOS = [
    { name: 'Google', slug: 'google' },
    { name: 'Microsoft', slug: 'microsoft' },
    { name: 'Amazon', slug: 'amazon' },
    { name: 'NVIDIA', slug: 'nvidia' },
    { name: 'Intel', slug: 'intel' },
    { name: 'IBM', slug: 'ibm' },
    { name: 'Meta', slug: 'meta' },
    { name: 'Adobe', slug: 'adobe' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'Oracle', slug: 'oracle' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Stripe', slug: 'stripe' },
    { name: 'Figma', slug: 'figma' },
    { name: 'Notion', slug: 'notion' },
    { name: 'Slack', slug: 'slack' },
    { name: 'Spotify', slug: 'spotify' },
    { name: 'Cloudflare', slug: 'cloudflare' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Vercel', slug: 'vercel' },
];

const ICON_CDN = (slug) => `https://cdn.simpleicons.org/${slug}`;

// Inline keyframes injected once into the document to be immune to CSS module scope
const KEYFRAMES = `
@keyframes marqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

const LogoItem = ({ name, slug }) => (
    <div className={styles.logoItem} title={name}>
        <img
            src={ICON_CDN(slug)}
            alt={name}
            className={styles.logoImg}
            loading="lazy"
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
            }}
        />
        <span className={styles.fallback}>{name}</span>
    </div>
);

const SponsorMarquee = () => {
    // Inject global keyframes once
    useEffect(() => {
        if (!document.getElementById('marquee-keyframes')) {
            const style = document.createElement('style');
            style.id = 'marquee-keyframes';
            style.textContent = KEYFRAMES;
            document.head.appendChild(style);
        }
    }, []);

    const trackStyle = {
        animation: 'marqueeScroll 35s linear infinite',
        display: 'flex',
        gap: '1.25rem',
        width: 'max-content',
        flexShrink: 0,
        willChange: 'transform',
    };

    return (
        <section className={styles.section}>
            {/* Header */}
            <div className={styles.header}>
                <span className={styles.headerLine} />
                <span className={styles.headerLabel}>POWERED BY</span>
                <span className={styles.headerLine} />
            </div>

            <h2 className={styles.title}>Pact Chamber </h2>
            <p className={styles.subtitle}>The allies who power the MAYAVERSE</p>

            {/* Marquee */}
            <div
                className={styles.marquee}
                onMouseEnter={(e) => {
                    const track = e.currentTarget.querySelector('[data-track]');
                    if (track) track.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                    const track = e.currentTarget.querySelector('[data-track]');
                    if (track) track.style.animationPlayState = 'running';
                }}
            >
                <div className={styles.rowOuter}>
                    <div data-track style={trackStyle}>
                        {ALL_LOGOS.map((s) => <LogoItem key={`a-${s.slug}`} {...s} />)}
                        {ALL_LOGOS.map((s) => <LogoItem key={`b-${s.slug}`} {...s} />)}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className={styles.cta}>
                <span className={styles.ctaText}>Want to support MAYAVERSE?</span>
                <a href="mailto:parallax.tc@gmail.com" className={styles.ctaBtn}>
                    Become a Sponsor →
                </a>
            </div>
        </section>
    );
};

export default SponsorMarquee;
