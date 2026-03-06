import React, { useEffect, useRef } from 'react';
import styles from './Timeline.module.css';

const Timeline = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add(styles.visible);
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        const cards = document.querySelectorAll(`.${styles.phaseCard}`);
        cards.forEach((c) => observer.observe(c));

        return () => {
            cards.forEach((c) => observer.unobserve(c));
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.bgLayer}></div>
            <div className={styles.bgOverlay}></div>
            <div className={styles.bgRadials}></div>

            <header className={styles.header}>
                <p className={styles.festLabel}>Annual Tech Festival &nbsp;·&nbsp; College of Engineering</p>
                <h1>PARALLAX</h1>
                <p className={styles.festYear}>2 0 2 6</p>
                <p className={styles.headerSub}>Where magic meets innovation</p>
                <div className={styles.headerLine}></div>
            </header>

            <section className={styles.timelineSection}>
                <p className={styles.timelineLabel}>Event Schedule</p>
                <div className={styles.spine}></div>

                {/* DAY 1 */}
                <div className={styles.dayHeading}><span>Day 01 &nbsp;·&nbsp; 11 March 2026</span></div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>01</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 01</p>
                        <h2 className={styles.phaseTitle}>Relay Coding</h2>
                        <p className={styles.phaseTime}>11 March 2026 &nbsp;·&nbsp; 12:00 – 1:30 PM</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>02</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 02</p>
                        <h2 className={styles.phaseTitle}>Robo Soccer</h2>
                        <p className={styles.phaseTime}>11 March 2026 &nbsp;·&nbsp; 1:00 PM Onwards</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>03</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 03</p>
                        <h2 className={styles.phaseTitle}>Panel Discussion</h2>
                        <p className={styles.phaseTime}>11 March 2026 &nbsp;·&nbsp; 3:00 – 5:00 PM</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>04</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 04</p>
                        <h2 className={styles.phaseTitle}>Kurukshetra<br />The Hackathon</h2>
                        <p className={styles.phaseTime}>11 March 2026</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                {/* DAY 2 */}
                <div className={styles.dayHeading}><span>Day 02 &nbsp;·&nbsp; 12 March 2026</span></div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>05</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 05</p>
                        <h2 className={styles.phaseTitle}>Stock Storm</h2>
                        <p className={styles.phaseTime}>12 March 2026 &nbsp;·&nbsp; 1:00 PM Onwards</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>06</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 06</p>
                        <h2 className={styles.phaseTitle}>Auction League</h2>
                        <p className={styles.phaseTime}>12 March 2026 &nbsp;·&nbsp; 2:45 – 4:00 PM</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>07</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 07</p>
                        <h2 className={styles.phaseTitle}>Mock Parliament</h2>
                        <p className={styles.phaseTime}>12 March 2026 &nbsp;·&nbsp; 3:00 PM Onwards</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>08</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 08</p>
                        <h2 className={styles.phaseTitle}>Gaming Event</h2>
                        <p className={styles.phaseTime}>12 March 2026 &nbsp;·&nbsp; All Day</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

                <div className={styles.phase}>
                    <div className={styles.phaseDot}></div>
                    <div className={styles.phaseNum}>09</div>
                    <div className={styles.phaseConnector}></div>
                    <a className={styles.phaseCard} href="#" target="_blank" rel="noopener noreferrer">
                        <p className={styles.phaseTag}>Event 09</p>
                        <h2 className={styles.phaseTitle}>Alumni Hour</h2>
                        <p className={styles.phaseTime}>12 March 2026 &nbsp;·&nbsp; 6:00 – 7:00 PM</p>
                        <span className={styles.phaseCta}>Register Now <span className={styles.arrow}>→</span></span>
                    </a>
                </div>

            </section>
        </div>
    );
};

export default Timeline;
