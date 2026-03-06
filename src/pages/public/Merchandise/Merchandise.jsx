import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/helpers';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/config';
import styles from './Merchandise.module.css';
import { getMerchandise } from '../../../services/mockData';

/**
 * MAYAVERSE - Merchandise Page (Rift Market)
 * Single featured product: MAYAVERSE T-Shirt
 * Buy Now opens an embedded Google Form iframe modal.
 */

// ← Replace this URL with your actual Google Form link
const GOOGLE_FORM_URL = 'https://forms.gle/Rum61AswAjc58qzy8';

// Removed hardcoded TSHIRT constant

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const containerRef = useRef(null);

  // Images for the slider (Using premium tech-themed images)
  const sliderImages = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800'
  ];

  // Fetch logic
  React.useEffect(() => {
    const fetchMerch = async () => {
      try {
        const response = await getMerchandise();
        if (response.success) {
          setMerchandise(response.merchandise);
        }
      } catch (err) {
        console.error('Failed to fetch merch', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMerch();
  }, []);

  // Automatic Slider Logic
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // 4 seconds interval
    return () => clearInterval(interval);
  }, [loading, sliderImages.length]);

  // Entry animation
  useGSAP(() => {
    if (!heroTitleRef.current) return;
    const { gsap } = window;
    if (!gsap) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(heroTitleRef.current, { opacity: 0, y: 30, duration: 1, ease: 'power2.out' })
      .from(heroSubtitleRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
    return () => tl.kill();
  }, [loading]);

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setShowForm(true);
  };

  if (loading) return <div className={styles.loading}>Entering the Rift Market...</div>;

  // Use the T-Shirt as the featured item
  const featuredItem = merchandise.find(item => item.id === '1') || merchandise[0];

  return (
    <div className={styles.merchPage} ref={containerRef}>

      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.pageTitle}>Rift Market</h1>
          <p ref={heroSubtitleRef} className={styles.pageSubtitle}>
            Exclusive PARALLAX merchandise — claim yours before the rift closes
          </p>
        </div>
      </section>

      {/* Featured Item Section */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.featuredLayout}>

            {/* Left Column: Image Slider */}
            <div className={styles.sliderContainer}>
              <div className={styles.slider}>
                {sliderImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`${styles.slide} ${idx === currentImageIndex ? styles.activeSlide : ''}`}
                  >
                    <img src={img} alt={`Mayaverse Merch ${idx + 1}`} className={styles.productImage} />
                  </div>
                ))}
              </div>

              <div className={styles.sliderDots}>
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className={styles.limitedBadge}>LIMITED EDITION</span>
            </div>

            {/* Right Column: Info */}
            <div className={styles.featuredInfo}>
              <div className={styles.infoContent}>
                <span className={styles.productTagline}>{featuredItem?.tagline}</span>
                <h2 className={styles.productName}>{featuredItem?.name}</h2>
                <p className={styles.productDesc}>{featuredItem?.description}</p>

                <div className={styles.priceRow}>
                  <div className={styles.priceContainer}>
                    <span className={styles.priceLabel}>PRICE</span>
                    <span className={styles.price}>{formatCurrency(featuredItem?.price || 599, 'INR')}</span>
                  </div>
                </div>

                <button
                  className={styles.buyNowButton}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>

                <p className={styles.disclaimer}>
                  Orders fulfilled on-site at PARALLAX · Payment at event
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Google Form Modal */}
      {showForm && (
        <div className={styles.formOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.formClose} onClick={() => setShowForm(false)} aria-label="Close form">
              ✕
            </button>
            <p className={styles.formNote}>
              Item: <strong>{featuredItem?.name}</strong>
            </p>
            <iframe
              src={GOOGLE_FORM_URL}
              className={styles.formIframe}
              title="MAYAVERSE Merch Order Form"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading form…
            </iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merchandise;