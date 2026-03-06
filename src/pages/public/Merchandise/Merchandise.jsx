import React, { useState, useRef } from 'react';
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
  const [selectedItem, setSelectedItem] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const containerRef = useRef(null);

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

  const handleBuyNow = (item) => {
    if (!isAuthenticated()) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setSelectedItem(item);
    setShowForm(true);
  };

  if (loading) return <div className={styles.loading}>Entering the Rift Market...</div>;

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

      {/* Merch Grid */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.merchGrid}>
            {merchandise.map((item) => (
              <div key={item.id} className={styles.merchCard}>
                <div className={styles.imageFrame}>
                  <img src={item.image} alt={item.name} className={styles.productImage} />
                  <span className={styles.limitedBadge}>LIMITED EDITION</span>
                </div>

                <div className={styles.cardInfo}>
                  <span className={styles.productTagline}>{item.tagline}</span>
                  <h2 className={styles.productName}>{item.name}</h2>
                  <p className={styles.productDesc}>{item.description}</p>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>{formatCurrency(item.price, 'INR')}</span>
                    <button
                      className={styles.buyButton}
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.disclaimer}>
            Orders fulfilled on-site at PARALLAX · Payment at event
          </p>
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
              Item: <strong>{selectedItem?.name}</strong>
            </p>
            <iframe
              src={GOOGLE_FORM_URL}
              className={styles.formIframe}
              title="MAYAVERSE T-Shirt Order Form"
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