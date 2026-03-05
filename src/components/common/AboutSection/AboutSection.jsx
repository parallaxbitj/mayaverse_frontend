import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.aboutContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>ABOUT US</h2>
                    <p className={styles.description}>
                        PARALLAX 2026, FORMERLY KNOWN AS TECHVIBES, IS THE ANNUAL TECHNICAL FEST OF BIT MESRA, JAIPUR CAMPUS CELEBRATING INNOVATION, CREATIVITY, AND TECHNOLOGICAL EXCELLENCE. INSPIRED BY PARALLAX A SHIFT IN PERSPECTIVE THAT REVEALS NEW POSSIBILITIES THE FEST PROMOTES BOLD THINKING THROUGH COMPETITIONS, WORKSHOPS, EXHIBITIONS, AND VISIONARY SESSIONS.
                    </p>
                </div>
                <div className={styles.imageContent}>
                    <img src="/1.png" alt="About Parallax 2026" className={styles.image} />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
