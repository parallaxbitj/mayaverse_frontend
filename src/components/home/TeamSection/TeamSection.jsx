import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/config';
import styles from './TeamSection.module.css';

const teamCategories = [
    { id: 'management', title: 'Management', className: styles.festhead, image: '/team-domains/management.png' },
    { id: 'technical', title: 'Technical', className: styles.techCouncil, image: '/team-domains/technical.png' },
    { id: 'creative-graphics', title: 'Graphics & Creative', className: styles.creative, image: '/team-domains/graphics.png' },
    { id: 'social-content', title: 'Socials & Content', className: styles.publicRelations, image: '/team-domains/socials.png' },
    { id: 'promotions-pr', title: 'Promotions & PR', className: styles.sponsorship, image: '/team-domains/promotions.png' },
    { id: 'sponsorship-finance', title: 'Sponsorship & Finance', className: styles.developer, image: '/team-domains/sponsorship.png' },
    { id: 'operations-logistics', title: 'Operations & Production', className: styles.eventsLogistics, image: '/team-domains/operations.png' },
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
                            <div className={styles.imageOverlay}></div>
                            <img src={category.image} alt={category.title} className={styles.cardImage} />
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
