import React, { useEffect } from 'react';
import styles from './SponsorMarquee.module.css';

/**
 * SponsorMarquee — "Guardians of the Realm" redesign.
 * Three tiers: Title, Allies, Supporters.
 * Infinite marquee for Supporters tier.
 */

const PREMIUM_ALLY_SPONSORS = [
    { name: 'Bank of Baroda', slug: 'bankofbaroda' },
];

const ALLY_SPONSORS = [
    { name: 'GFG', slug: 'geeksforgeeks' },
    { name: 'Unstop', slug: 'unstop' },
    { name: 'StockGro', slug: 'stockgro' },
    { name: 'Devnovate', slug: 'devnovate' },
];

const SUPPORTER_LOGOS = [
    { name: 'Bake Away', slug: 'cakey' },
    { name: 'Belgian Waffle', slug: 'waffle' },
    { name: 'Chai Zindagi', slug: 'tea' },
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

            {/* ── Tier 1.5 : Premium Allies ── */}
            <div className={styles.tierBlock}>
                <span className={styles.tierLabel}>✧ &nbsp;PREMIUM ALLY&nbsp; ✧</span>
                <div className={styles.tierRow}>
                    {PREMIUM_ALLY_SPONSORS.map((s) => (
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

            {/* ── Tier 3 : Supporters (Static & Centered) ── */}
            <div className={styles.tierBlock}>
                <span className={styles.tierLabel}>◈ &nbsp;SUPPORTERS&nbsp; ◈</span>
                <div className={styles.tierRow} style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                    {SUPPORTER_LOGOS.map((s) => (
                        <TierCard key={s.slug} {...s} />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default SponsorMarquee;
