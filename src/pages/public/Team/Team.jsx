import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Team.module.css';

const teamData = [
    {
        id: 'festhead',
        title: 'Festhead',
        members: [
            { name: 'John Doe', role: 'Head Coordinator', image: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff' }
        ]
    },
    {
        id: 'tech-council',
        title: 'Tech Council',
        members: [
            { name: 'Jane Smith', role: 'President', image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8A2BE2&color=fff' },
            { name: 'Alice Johnson', role: 'Vice President', image: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=8A2BE2&color=fff' }
        ]
    },
    {
        id: 'developer',
        title: 'Developer Team',
        members: [
            { name: 'Bob Williams', role: 'Lead Frontend', image: 'https://ui-avatars.com/api/?name=Bob+Williams&background=2E8B57&color=fff' },
            { name: 'Charlie Brown', role: 'Lead Backend', image: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=2E8B57&color=fff' },
            { name: 'David Lee', role: 'UI/UX Designer', image: 'https://ui-avatars.com/api/?name=David+Lee&background=2E8B57&color=fff' }
        ]
    },
    {
        id: 'sponsorship',
        title: 'Sponsorship',
        members: [
            { name: 'Eva Davis', role: 'Sponsorship Head', image: 'https://ui-avatars.com/api/?name=Eva+Davis&background=FF8C00&color=fff' }
        ]
    },
    {
        id: 'events-logistics',
        title: 'Events & Logistics',
        members: [
            { name: 'Frank Miller', role: 'Events Head', image: 'https://ui-avatars.com/api/?name=Frank+Miller&background=DC143C&color=fff' }
        ]
    },
    {
        id: 'public-relations',
        title: 'Public Relations',
        members: [
            { name: 'Grace Wilson', role: 'PR Head', image: 'https://ui-avatars.com/api/?name=Grace+Wilson&background=4682B4&color=fff' }
        ]
    },
    {
        id: 'creative',
        title: 'Creative',
        members: [
            { name: 'Henry Moore', role: 'Creative Head', image: 'https://ui-avatars.com/api/?name=Henry+Moore&background=FF1493&color=fff' }
        ]
    }
];

const Team = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to section based on hash
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    return (
        <div className={styles.teamPage}>
            <div className={styles.heroSection}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>MEET THE CREATORS</h1>
                    <p className={styles.pageSubtitle}>The driving force behind Mayaverse</p>
                </div>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.container}>
                    {teamData.map((category) => (
                        <div key={category.id} id={category.id} className={styles.categorySection}>
                            <div className={styles.categoryHeader}>
                                <h2 className={styles.categoryTitle}>{category.title}</h2>
                                <div className={styles.line}></div>
                            </div>

                            <div className={styles.membersGrid}>
                                {category.members.map((member, index) => (
                                    <div key={index} className={styles.memberCard}>
                                        <div className={styles.imageWrapper}>
                                            <img src={member.image} alt={member.name} className={styles.memberImage} />
                                            <div className={styles.imageOverlay}></div>
                                        </div>
                                        <div className={styles.memberInfo}>
                                            <h3 className={styles.memberName}>{member.name}</h3>
                                            <p className={styles.memberRole}>{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
