import React, { useEffect } from 'react';
import styles from './SponsorMarquee.module.css';

/**
 * SponsorMarquee — "Guardians of the Realm" redesign.
 * Three tiers: Title, Allies, Supporters.
 * Infinite marquee for Supporters tier.
 */

const TITLE_SPONSORS = [
    { name: 'Google', slug: 'google' },
    { name: 'Microsoft', slug: 'microsoft' },
    { name: 'NVIDIA', slug: 'nvidia' },
];

const ALLY_SPONSORS = [
    { name: 'Amazon', slug: 'amazon' },
    { name: 'Intel', slug: 'intel' },
    { name: 'IBM', slug: 'ibm' },
    { name: 'Meta', slug: 'meta' },
    { name: 'Adobe', slug: 'adobe' },
    { name: 'Oracle', slug: 'oracle' },
];

const SUPPORTER_LOGOS = [
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
    { name: 'Samsung', slug: 'samsung' },
];

const ICON_CDN = (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`;

const KEYFRAMES = `
@keyframes guardianMarquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes crestGlow {
  0%, 100% { opacity: 0.25; transform: scaleX(1); }
  50%       { opacity: 0.6;  transform: scaleX(1.04); }
}
`;

const TierCard = ({ name, slug, large }) => (
    <div className={`${styles.tierCard} ${large ? styles.tierCardLarge : ''}`} title={name}>
        <img
            src={ICON_CDN(slug)}
            alt={name}
            className={styles.tierImg}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span className={styles.tierName}>{name}</span>
    </div>
);

const SponsorMarquee = () => {
    useEffect(() => {
        if (!document.getElementById('guardian-marquee-kf')) {
            const el = document.createElement('style');
            el.id = 'guardian-marquee-kf';
            el.textContent = KEYFRAMES;
            document.head.appendChild(el);
        }
    }, []);

    const trackStyle = {
        animation: 'guardianMarquee 40s linear infinite',
        display: 'flex',
        gap: '1.5rem',
        width: 'max-content',
        flexShrink: 0,
        willChange: 'transform',
    };

    return (
        <section className={styles.section}>
            {/* Ambient orbs */}
            <div className={styles.orb1} />
            <div className={styles.orb2} />

            {/* ── Section heading ── */}
            <div className={styles.headingWrap}>
                <div className={styles.runeLineLeft} />
                <h2 className={styles.sectionTitle}>GUARDIANS<br />OF THE REALM</h2>
                <div className={styles.runeLineRight} />
            </div>
            <p className={styles.sectionSub}>The sovereign allies who forge the MAYAVERSE</p>

            {/* ── Tier 1 : Title Sponsors ── */}
            <div className={styles.tierBlock}>
                <span className={styles.tierLabel}>✦ &nbsp;TITLE SPONSORS&nbsp; ✦</span>
                <div className={styles.tierRow}>
                    {TITLE_SPONSORS.map((s) => (
                        <TierCard key={s.slug} {...s} large />
                    ))}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className={styles.divider} />

            {/* ── Tier 2 : Allies ── */}
            <div className={styles.tierBlock}>
                <span className={styles.tierLabel}>⬡ &nbsp;ALLIES&nbsp; ⬡</span>
                <div className={styles.tierRow}>
                    {ALLY_SPONSORS.map((s) => (
                        <TierCard key={s.slug} {...s} />
                    ))}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className={styles.divider} />

            {/* ── Tier 3 : Supporters marquee ── */}
            <div className={styles.tierBlock}>
                <span className={styles.tierLabel}>◈ &nbsp;SUPPORTERS&nbsp; ◈</span>
            </div>

            <div
                className={styles.marquee}
                onMouseEnter={(e) => {
                    const t = e.currentTarget.querySelector('[data-track]');
                    if (t) t.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                    const t = e.currentTarget.querySelector('[data-track]');
                    if (t) t.style.animationPlayState = 'running';
                }}
            >
                <div className={styles.rowOuter}>
                    <div data-track style={trackStyle}>
                        {SUPPORTER_LOGOS.map((s) => <TierCard key={`a-${s.slug}`} {...s} />)}
                        {SUPPORTER_LOGOS.map((s) => <TierCard key={`b-${s.slug}`} {...s} />)}
                    </div>
                </div>
            </div>

            {/* ── CTA ── */}
            <div className={styles.cta}>
                <span className={styles.ctaText}>Forge an alliance with MAYAVERSE</span>
                <a href="mailto:parallax.tc@gmail.com" className={styles.ctaBtn}>
                    BECOME A GUARDIAN →
                </a>
            </div>
        </section>
    );
};

export default SponsorMarquee;
