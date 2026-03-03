import React, { useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

const Gallery = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const galleryImages = [
        { id: 1, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', title: 'Cyber Arena' },
        { id: 2, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', title: 'Tech Hub' },
        { id: 3, url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800', title: 'Neural Network' },
        { id: 4, url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800', title: 'Digital Flow' },
        { id: 5, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', title: 'Circuit Board' },
        { id: 6, url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', title: 'Robotics Lab' },
        { id: 7, url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800', title: 'Future Tech' },
        { id: 8, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', title: 'Global Sync' },
        { id: 9, url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', title: 'AI Assistant' },
    ];

    return (
        <div className={styles.galleryPage} ref={sectionRef}>
            <div className={styles.heroSection}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>ILLUSION GALLERY</h1>
                    <p className={styles.pageSubtitle}>
                        A visual journey through the past editions of MAYAVERSE. Captured moments of innovation, competition, and celebration.
                    </p>
                </div>
            </div>

            <main className={styles.container}>
                <div className={styles.galleryGrid}>
                    {galleryImages.map((image) => (
                        <div key={image.id} className={styles.galleryItem}>
                            <div className={styles.imageWrapper}>
                                <img src={image.url} alt={image.title} className={styles.image} />
                                <div className={styles.overlay}>
                                    <h3 className={styles.imageTitle}>{image.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Gallery;
