import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Team.module.css';

const teamData = [
    {
        id: 'management',
        title: 'Management',
        members: [
            { name: 'Aditya Agarwal', role: 'Management Head', image: 'https://ui-avatars.com/api/?name=Aditya+Agarwal&background=0D8ABC&color=fff' }
        ]
    },
    {
        id: 'technical',
        title: 'Technical Team',
        members: [
            { name: 'Vansh Arora', role: 'Technical Head', image: 'https://ui-avatars.com/api/?name=Vansh+Arora&background=8A2BE2&color=fff' },
            { name: 'Vansh Sardana', role: 'Technical Lead', image: 'https://ui-avatars.com/api/?name=Vansh+Sardana&background=8A2BE2&color=fff' }
        ]
    },
    {
        id: 'creative-graphics',
        title: 'Graphics & Creative',
        members: [
            { name: 'Manika Singh', role: 'Graphics Head', image: 'https://ui-avatars.com/api/?name=Manika+Singh&background=FF1493&color=fff' },
            { name: 'Sanchit Pawa', role: 'Graphics Lead', image: 'https://ui-avatars.com/api/?name=Sanchit+Pawa&background=FF1493&color=fff' },
            { name: 'Abhishek', role: 'Graphics Designer', image: 'https://ui-avatars.com/api/?name=Abhishek&background=FF1493&color=fff' }
        ]
    },
    {
        id: 'social-content',
        title: 'Socials & Content',
        members: [
            { name: 'Charu Jethwani', role: 'Socials Head', image: 'https://ui-avatars.com/api/?name=Charu+Jethwani&background=4682B4&color=fff' },
            { name: 'Navya Khandelwal', role: 'Content Head', image: 'https://ui-avatars.com/api/?name=Navya+Khandelwal&background=4682B4&color=fff' }
        ]
    },
    {
        id: 'promotions-pr',
        title: 'Promotions & PR',
        members: [
            { name: 'Vansh Jain', role: 'Promotions Head', image: 'https://ui-avatars.com/api/?name=Vansh+Jain&background=FF8C00&color=fff' }
        ]
    },
    {
        id: 'sponsorship-finance',
        title: 'Sponsorship & Finance',
        members: [
            { name: 'Jai Mishra', role: 'Sponsorship Head', image: 'https://ui-avatars.com/api/?name=Jai+Mishra&background=2E8B57&color=fff' },
            { name: 'Mouli Sharma', role: 'Finance Head', image: 'https://ui-avatars.com/api/?name=Mouli+Sharma&background=2E8B57&color=fff' }
        ]
    },
    {
        id: 'operations-logistics',
        title: 'Operations & Production',
        members: [
            { name: 'Meahul Gupta', role: 'Operations Head', image: 'https://ui-avatars.com/api/?name=Meahul+Gupta&background=DC143C&color=fff' },
            { name: 'Kabeer', role: 'Productions Head', image: 'https://ui-avatars.com/api/?name=Kabeer&background=DC143C&color=fff' },
            { name: 'Varun Tyagi', role: 'Documentation Lead', image: 'https://ui-avatars.com/api/?name=Varun+Tyagi&background=DC143C&color=fff' },
            { name: 'Pratibha Soni', role: 'Decoration Head', image: 'https://ui-avatars.com/api/?name=Pratibha+Soni&background=DC143C&color=fff' }
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
                                <h2 className={styles.categoryTitle}>{category.title}</h2>
                                <div className={styles.line}></div>
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
