import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/config';
import styles from './TeamSection.module.css';

const teamCategories = [
    { id: 'festhead', title: 'Festhead', className: styles.festhead },
    { id: 'tech-council', title: 'Tech Council', className: styles.techCouncil },
    { id: 'developer', title: 'Developer', className: styles.developer },
    { id: 'sponsorship', title: 'Sponsorship', className: styles.sponsorship },
    { id: 'events-logistics', title: 'Events & Logistics', className: styles.eventsLogistics },
    { id: 'public-relations', title: 'Public Relations', className: styles.publicRelations },
    { id: 'creative', title: 'Creative', className: styles.creative },
];

const TeamSection = () => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`${ROUTES.TEAM}#${id}`);
    };

    return (
        <section className={styles.teamSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>OUR TEAM</h2>
                    <div className={styles.line}></div>
                </div>

                <div className={styles.bentoGrid}>
                    {teamCategories.map((category) => (
                        <div
                            key={category.id}
                            className={`${styles.card} ${category.className}`}
                            onClick={() => handleCardClick(category.id)}
                        >
                            <h3 className={styles.cardTitle}>{category.title}</h3>
                            <div className={styles.cardGlow}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
