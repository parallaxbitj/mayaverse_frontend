import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Gallery.module.css';

const GALLERY_IMAGES = [
    { id: 1, url: new URL('../../../assets/images/events/techx.png', import.meta.url).href, title: 'Tech X', size: 'large' },
    { id: 2, url: new URL('../../../assets/images/events/filmaura.jpeg', import.meta.url).href, title: 'Filmaura', size: 'medium' },
    { id: 3, url: new URL('../../../assets/images/events/gdghackathon.jpeg', import.meta.url).href, title: 'GDG Hackathon', size: 'small' },
    { id: 4, url: new URL('../../../assets/images/events/codewars.png', import.meta.url).href, title: 'Code Wars', size: 'medium' },
    { id: 5, url: new URL('../../../assets/images/events/robosoc.jpeg', import.meta.url).href, title: 'Robosoc', size: 'small' },
    { id: 6, url: new URL('../../../assets/images/events/gamingevent.jpeg', import.meta.url).href, title: 'Gaming Arena', size: 'wide' },
    { id: 7, url: new URL('../../../assets/images/events/mockparliament.jpeg', import.meta.url).href, title: 'Mock Parliament', size: 'small' },
    { id: 8, url: new URL('../../../assets/images/events/stockstrom.jpeg', import.meta.url).href, title: 'Stock Strom', size: 'medium' },
    { id: 9, url: new URL('../../../assets/images/events/t hunt.jpeg', import.meta.url).href, title: 'Treasure Hunt', size: 'large' },
    { id: 10, url: new URL('../../../assets/images/events/admaking.png', import.meta.url).href, title: 'AD Making', size: 'wide' },
    { id: 11, url: new URL('../../../assets/images/events/aipromptbattle.png', import.meta.url).href, title: 'AI Prompt Battle', size: 'medium' },
    { id: 12, url: new URL('../../../assets/images/events/auctionleague.png', import.meta.url).href, title: 'Auction League', size: 'small' },
    { id: 13, url: new URL('../../../assets/images/events/brandwars.png', import.meta.url).href, title: 'Brand Wars', size: 'large' },
    { id: 14, url: new URL('../../../assets/images/events/debugging .jpeg', import.meta.url).href, title: 'Circuit Debugging', size: 'medium' },
    { id: 15, url: new URL('../../../assets/images/events/decodethescam.png', import.meta.url).href, title: 'Decode The Scam', size: 'wide' },
    { id: 16, url: new URL('../../../assets/images/events/rapidkeys.png', import.meta.url).href, title: 'Rapid Keys', size: 'small' },
    { id: 17, url: new URL('../../../assets/images/events/technoquiz.png', import.meta.url).href, title: 'Techno Quiz', size: 'medium' },
    // Unsplash High-Quality Stock
    { id: 18, url: 'https://images.unsplash.com/photo-1540575861501-7c0011738242?auto=format&fit=crop&q=80&w=800', title: 'Grand Stage', size: 'large' },
    { id: 19, url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', title: 'Innovation Workshop', size: 'medium' },
    { id: 20, url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', title: 'Cyber Security', size: 'small' },
    { id: 21, url: 'https://images.unsplash.com/photo-1504384308090-c89e120c8d1c?auto=format&fit=crop&q=80&w=800', title: 'Developer Meetup', size: 'wide' },
    { id: 22, url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', title: 'Esports Finals', size: 'medium' },
    { id: 23, url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800', title: 'Digital Art', size: 'small' },
    { id: 24, url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', title: 'Robotics Demo', size: 'large' },
    { id: 25, url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800', title: 'Future Tech', size: 'small' },
    { id: 26, url: 'https://images.unsplash.com/photo-1506399558188-daf6f8f2b3b0?auto=format&fit=crop&q=80&w=800', title: 'Networking Hub', size: 'medium' },
    { id: 27, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', title: 'Global Sync', size: 'wide' },
    { id: 28, url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800', title: 'Collaborative Coding', size: 'medium' },
    { id: 29, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', title: 'Tech Rack', size: 'small' },
    { id: 30, url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', title: 'AI Research', size: 'large' },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
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
                <motion.div
                    layout
                    className={styles.galleryGrid}
                >
                    {GALLERY_IMAGES.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className={`${styles.galleryItem} ${styles[image.size]}`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className={styles.image}
                                    loading="lazy"
                                />
                                <div className={styles.overlay}>
                                    <h3 className={styles.imageTitle}>{image.title}</h3>
                                    <span className={styles.viewBadge}>VIEW FULL</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
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
