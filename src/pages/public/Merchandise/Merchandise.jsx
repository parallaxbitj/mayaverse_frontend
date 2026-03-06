import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/helpers';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/config';
import styles from './Merchandise.module.css';

/**
 * MAYAVERSE - Merchandise Page (Rift Market)
 * Single featured product: MAYAVERSE T-Shirt
 * Buy Now opens an embedded Google Form iframe modal.
 */

// ← Replace this URL with your actual Google Form link
const GOOGLE_FORM_URL = 'https://forms.gle/Rum61AswAjc58qzy8';

const TSHIRT = {
  id: '1',
  name: 'MAYAVERSE T-Shirt',
  tagline: 'Official PARALLAX Limited Edition',
  description:
    'Wear the verse. This is the official PARALLAX tech-fest tee — limited edition, premium 100% cotton, featuring exclusive artwork.',
  price: 599,
  stock: 150,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'White', 'Navy'],
  features: [
    '100% premium cotton',
    'Limited edition PARALLAX artwork',
    'Unisex fit',
    'Available in 3 colours',
  ],
};

const Merchandise = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const containerRef = useRef(null);

  // Entry animation
  useGSAP(() => {
    if (!heroTitleRef.current) return;
    const { gsap } = window;
    if (!gsap) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(heroTitleRef.current, { opacity: 0, y: 30, duration: 1, ease: 'power2.out' })
      .from(heroSubtitleRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
    return () => tl.kill();
  }, []);

  const canBuy = selectedSize && selectedColor;

  const handleBuyNow = () => {
    if (!canBuy) return;

    if (!isAuthenticated()) {
      navigate(ROUTES.LOGIN);
      return;
    }

    setShowForm(true);
  };

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

      {/* Featured Product */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.productLayout}>

            {/* Image */}
            <div className={styles.imageCol}>
              <div className={styles.imageFrame}>
                <div className={styles.imagePlaceholder}>
                  <svg viewBox="0 0 24 24" fill="none" className={styles.shirtIcon}>
                    <path
                      d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46L2 9l3 .5V20a2 2 0 002 2h10a2 2 0 002-2V9.5L22 9l-1.62-5.54z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.comingSoonLabel}>Photo Coming Soon</span>
                </div>
                <span className={styles.limitedBadge}>LIMITED EDITION</span>
              </div>
            </div>

            {/* Info */}
            <div className={styles.infoCol}>
              <span className={styles.productTag}>Official Merchandise</span>
              <h2 className={styles.productName}>{TSHIRT.name}</h2>
              <p className={styles.productTagline}>{TSHIRT.tagline}</p>
              <p className={styles.productDesc}>{TSHIRT.description}</p>

              <ul className={styles.featureList}>
                {TSHIRT.features.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <span className={styles.featureDot}>✦</span> {f}
                  </li>
                ))}
              </ul>

              <div className={styles.priceRow}>
                <span className={styles.price}>{formatCurrency(TSHIRT.price, 'INR')}</span>
                <span className={styles.stockLabel}>{TSHIRT.stock} in stock</span>
              </div>

              {/* Size */}
              <div className={styles.selectorGroup}>
                <p className={styles.selectorLabel}>Select Size</p>
                <div className={styles.selectorRow}>
                  {TSHIRT.sizes.map((s) => (
                    <button
                      key={s}
                      className={`${styles.sizeBtn} ${selectedSize === s ? styles.selected : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* Colour */}
              <div className={styles.selectorGroup}>
                <p className={styles.selectorLabel}>Select Colour</p>
                <div className={styles.selectorRow}>
                  {TSHIRT.colors.map((c) => (
                    <button
                      key={c}
                      className={`${styles.colorBtn} ${selectedColor === c ? styles.selected : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >{c}</button>
                  ))}
                </div>
              </div>

              {!canBuy && (
                <p className={styles.selectHint}>← Choose a size and colour to continue</p>
              )}

              <button
                className={styles.buyButton}
                onClick={handleBuyNow}
                disabled={!canBuy}
              >
                Buy Now
              </button>

              <p className={styles.disclaimer}>
                Orders fulfilled on-site at PARALLAX · Payment at event
              </p>
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
              Size: <strong>{selectedSize}</strong> &nbsp;|&nbsp; Colour: <strong>{selectedColor}</strong>
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