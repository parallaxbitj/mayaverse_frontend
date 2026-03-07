import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Team.module.css';

const teamData = [
    {
        id: 'management',
        title: 'Management',
        domainImage: '/team-domains/management.png',
        members: [
            { name: 'Aditya Aggarwal', role: 'Management Head', image: '/Team/Aditya Aggarwal.png' }
        ]
    },
    {
        id: 'technical',
        title: 'Technical Team',
        domainImage: '/team-domains/technical.png',
        members: [
            { name: 'Vansh Arora', role: 'Technical Head', image: '/Team/Vansh Arora.png' },
            { name: 'Vansh Sardana', role: 'Technical Lead', image: '/Team/Vansh Sardana.png' }
        ]
    },
    {
        id: 'creative-graphics',
        title: 'Graphics & Creative',
        domainImage: '/team-domains/graphics.png',
        members: [
            { name: 'Manika Singh', role: 'Graphics Head', image: '/Team/Manika Singh.png' },
            { name: 'Abhishek Pareek', role: 'Graphics Designer', image: '/Team/Abhishek Pareek.png' }
        ]
    },
    {
        id: 'social-content',
        title: 'Socials & Content',
        domainImage: '/team-domains/socials.png',
        members: [
            { name: 'Charu Jethwani', role: 'Socials Head', image: '/Team/Charu Jethwani.png' },
            { name: 'Navya Khandelwal', role: 'Content Head', image: '/Team/Navya Khandelwal.png' }
        ]
    },
    {
        id: 'promotions-pr',
        title: 'Promotions & PR',
        domainImage: '/team-domains/promotions.png',
        members: [
            { name: 'Vansh Jain', role: 'Promotions Head', image: '/Team/Vansh Jain.png' }
        ]
    },
    {
        id: 'sponsorship-finance',
        title: 'Sponsorship & Finance',
        domainImage: '/team-domains/sponsorship.png',
        members: [
            { name: 'Jai Mishra', role: 'Sponsorship Head', image: '/Team/Jai Mishra.png' },
            { name: 'Mouli Sharma', role: 'Finance Head', image: '/Team/Mouli Sharma.png' }
        ]
    },
    {
        id: 'operations-logistics',
        title: 'Operations & Production',
        domainImage: '/team-domains/operations.png',
        members: [
            { name: 'Meahul Gupta', role: 'Operations Head', image: '/Team/Meahul Gupta.png' },
            { name: 'Kabeer Kaushik', role: 'Productions Head', image: '/Team/Kabeer Kaushik.png' },
            { name: 'Varun Tyagi', role: 'Documentation Lead', image: '/Team/Varun Tyagi.png' },
            { name: 'Pratibha Soni', role: 'Decoration Head', image: '/Team/Pratibha Soni.png' }
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

    // Handle mouse movement for dynamic card glow
    const handleMouseMove = (e) => {
        const cards = document.getElementsByClassName(styles.memberCard);
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <div className={styles.teamPage} onMouseMove={handleMouseMove}>
            <div className={styles.heroSection}>
                <div className={styles.container}>
                    <motion.h1
                        className={styles.pageTitle}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        THE ARCHITECTS
                    </motion.h1>
                    <motion.p
                        className={styles.pageSubtitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        The Masterminds Behind Mayaverse
                    </motion.p>
                </div>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.container}>
                    {teamData.map((category) => (
                        <div key={category.id} id={category.id} className={styles.categorySection}>
                            <motion.div
                                className={styles.categoryHeader}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.domainImageWrapper}>
                                    <img src={category.domainImage} alt={category.title} className={styles.domainImage} />
                                    <div className={styles.domainOverlay}></div>
                                </div>
                                <div className={styles.categoryTitleWrap}>
                                    <h2 className={styles.categoryTitle}>{category.title}</h2>
                                    <div className={styles.line}></div>
                                </div>
                            </motion.div>

                            <motion.div
                                className={styles.membersGrid}
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {category.members.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        className={styles.memberCard}
                                        variants={itemVariants}
                                    >
                                        <div className={styles.cardAccent}></div>
                                        <div className={styles.imageWrapper}>
                                            <img src={member.image} alt={member.name} className={styles.memberImage} />
                                            <div className={styles.imageOverlay}></div>
                                        </div>
                                        <div className={styles.memberInfo}>
                                            <p className={styles.memberRole}>{member.role}</p>
                                            <h3 className={styles.memberName}>{member.name}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
