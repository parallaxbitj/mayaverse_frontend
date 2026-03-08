import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Gallery.module.css';

const GALLERY_IMAGES = [
    { id: 1, url: new URL('../../../assets/gallery/1.jpeg', import.meta.url).href, title: 'Inaugural Ceremony', size: 'large' },
    { id: 2, url: new URL('../../../assets/gallery/2.JPG', import.meta.url).href, title: 'Tech Showcase', size: 'medium' },
    { id: 3, url: new URL('../../../assets/gallery/3.jpeg', import.meta.url).href, title: 'Innovator Workshop', size: 'small' },
    { id: 4, url: new URL('../../../assets/gallery/4.JPG', import.meta.url).href, title: 'Hackathon Focus', size: 'medium' },
    { id: 5, url: new URL('../../../assets/gallery/5.JPEG', import.meta.url).href, title: 'Robot Arena', size: 'small' },
    { id: 6, url: new URL('../../../assets/gallery/6.JPG', import.meta.url).href, title: 'Grand Audience', size: 'wide' },
    { id: 7, url: new URL('../../../assets/gallery/7.JPEG', import.meta.url).href, title: 'Main Stage Reveal', size: 'large' },
    { id: 8, url: new URL('../../../assets/gallery/8.JPG', import.meta.url).href, title: 'Networking Hub', size: 'small' },
    { id: 9, url: new URL('../../../assets/gallery/9.jpeg', import.meta.url).href, title: 'Critical Thinking', size: 'medium' },
    { id: 10, url: new URL('../../../assets/gallery/10.JPG', import.meta.url).href, title: 'Future Architects', size: 'wide' },
    { id: 11, url: new URL('../../../assets/gallery/11.jpeg', import.meta.url).href, title: 'Team Synergy', size: 'medium' },
    { id: 12, url: new URL('../../../assets/gallery/12.JPG', import.meta.url).href, title: 'Victory Moment', size: 'small' },
    { id: 13, url: new URL('../../../assets/gallery/13.JPG', import.meta.url).href, title: 'Project Pitch', size: 'large' },
    { id: 14, url: new URL('../../../assets/gallery/14.JPG', import.meta.url).href, title: 'Deep Work', size: 'medium' },
    { id: 15, url: new URL('../../../assets/gallery/15.JPG', import.meta.url).href, title: 'The Crowd', size: 'wide' },
    { id: 16, url: new URL('../../../assets/gallery/16.JPG', import.meta.url).href, title: 'Tech Talk', size: 'small' },
    { id: 17, url: new URL('../../../assets/gallery/17.JPG', import.meta.url).href, title: 'Award Ceremony', size: 'medium' },
    { id: 18, url: new URL('../../../assets/gallery/18.JPG', import.meta.url).href, title: 'Innovators Circle', size: 'large' },
    { id: 19, url: new URL('../../../assets/gallery/19.jpeg', import.meta.url).href, title: 'Code Review', size: 'medium' },
    { id: 20, url: new URL('../../../assets/gallery/20.jpeg', import.meta.url).href, title: 'Hardware Lab', size: 'small' },
    { id: 21, url: new URL('../../../assets/gallery/21.JPG', import.meta.url).href, title: 'Gaming Arena', size: 'wide' },
    { id: 22, url: new URL('../../../assets/gallery/22.jpeg', import.meta.url).href, title: 'Digital Design', size: 'medium' },
    { id: 23, url: new URL('../../../assets/gallery/23.JPG', import.meta.url).href, title: 'Mentor Session', size: 'small' },
    { id: 24, url: new URL('../../../assets/gallery/24.JPG', import.meta.url).href, title: 'Project Demo', size: 'large' },
    { id: 25, url: new URL('../../../assets/gallery/25.jpeg', import.meta.url).href, title: 'Peer Discussion', size: 'small' },
    { id: 26, url: new URL('../../../assets/gallery/26.JPG', import.meta.url).href, title: 'Event Planning', size: 'medium' },
    { id: 27, url: new URL('../../../assets/gallery/27.JPG', import.meta.url).href, title: 'Stage Prep', size: 'wide' },
    { id: 28, url: new URL('../../../assets/gallery/28.JPG', import.meta.url).href, title: 'Grand Finale', size: 'large' },
    { id: 29, url: new URL('../../../assets/gallery/29.JPG', import.meta.url).href, title: 'Mayaverse Core', size: 'medium' },
    { id: 30, url: new URL('../../../assets/gallery/30.JPG', import.meta.url).href, title: 'The Legacy', size: 'small' },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadedImages, setLoadedImages] = useState(new Set());

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleImageLoad = useCallback((id) => {
        setLoadedImages(prev => new Set(prev).add(id));
    }, []);

    return (
        <div className={styles.galleryPage}>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={styles.heroSection}
            >
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>ILLUSION GALLERY</h1>
                    <p className={styles.pageSubtitle}>
                        A visual journey through the past editions of MAYAVERSE. Captured moments of innovation, competition, and celebration.
                    </p>
                </div>
            </motion.section>

            {/* Gallery Grid */}
            <main className={styles.container}>
                <div className={styles.galleryGrid}>
                    {GALLERY_IMAGES.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                            whileHover={{ y: -5 }}
                            className={`${styles.galleryItem} ${styles[image.size]}`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className={`${styles.imageWrapper} ${loadedImages.has(image.id) ? styles.loaded : styles.skeleton}`}>
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className={`${styles.image} ${loadedImages.has(image.id) ? styles.imageVisible : styles.imageHidden}`}
                                    loading={index < 8 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchpriority={index < 4 ? 'high' : 'low'}
                                    onLoad={() => handleImageLoad(image.id)}
                                />
                                <div className={styles.overlay}>
                                    <h3 className={styles.imageTitle}>{image.title}</h3>
                                    <span className={styles.viewBadge}>VIEW FULL</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.lightboxOverlay}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className={styles.closeButton}
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className={styles.lightboxContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage.url} alt={selectedImage.title} className={styles.fullImage} />
                            <div className={styles.lightboxInfo}>
                                <h2 className={styles.lightboxTitle}>{selectedImage.title}</h2>
                                <p className={styles.lightboxTag}>MAYAVERSE ARCHIVES</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
