import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, SOCIAL_LINKS, CONTACT_INFO } from '../../../constants/config';
import styles from './Footer.module.css';

/**
 * MAYAVERSE - Footer Component
 * 
 * Updated footer with neon effects and elegant design.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.mayaFooter}>
      <div className={styles.borderGlow}></div>

      <div className={styles.footerContent}>

        {/* IDENTITY */}
        <div className={styles.footerCol}>
          <div className={styles.brandTitle}>MAYAVERSE</div>
          <p className={styles.brandDesc}>
            Architecting the Illusion.<br />
            Official Technical Committee Portal.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className={styles.footerCol}>
          <div className={styles.navHeader}>SYSTEM LINKS</div>
          <ul className={styles.linkList}>
            <li><Link to={ROUTES.HOME}>Gateway</Link></li>
            <li><Link to={ROUTES.ABOUT}>The Lore</Link></li>
            <li><Link to={ROUTES.EVENTS}>Chronicles</Link></li>
            <li><Link to={ROUTES.GALLERY || '/'}>Gallery</Link></li>
            <li><Link to={ROUTES.TEAM || '/'}>The Architects</Link></li>
          </ul>
        </div>

        {/* SUMMON US */}
        <div className={styles.footerCol}>
          <div className={styles.navHeader}>SUMMON US</div>

          {CONTACT_INFO.TEAM.map((contact, index) => (
            <div className={styles.contactItem} key={index}>
              <span className={styles.contactName}>{contact.NAME}</span>
              <a href={`tel:${contact.PHONE.replace(/\s+/g, '')}`} className={styles.contactNumber}>
                <i className="fas fa-phone-alt"></i> {contact.PHONE}
              </a>
            </div>
          ))}

          <div className={styles.socialRow}>
            <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className={styles.footerBottom}>
        <div className={styles.mayaCta}>“ENTER THE MAYAVERSE.”</div>
        <div className={styles.copyrightText}>
          &copy; {currentYear} Technical Committee. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;