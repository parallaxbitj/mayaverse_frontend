import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEvents, registerForEvent } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { EvervaultCard } from '../../../components/ui/evervault-card';
import { ROUTES } from '../../../constants/config';
import styles from './Events.module.css';

/**
 * MAYAVERSE - Events Page (Trials Arena)
 * 
 * Displays events using the Aceternity UI EvervaultCard component.
 */

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getFormUrl = () => {
    return 'https://forms.gle/Rum61AswAjc58qzy8';
  };

  const closeModals = () => {
    setSelectedEvent(null);
    setShowGoogleForm(false);
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.events);
      setLoading(false);
    } catch (error) {
      console.error('Error loading events:', error);
      setLoading(false);
    }
  };


  const handleRegisterClick = () => {
    if (!isAuthenticated()) {
      navigate(ROUTES.LOGIN);
      return;
    }

    setShowGoogleForm(true);
  };

  if (loading) {
    return <div className={styles.loading}>Loading events...</div>;
  }

  const filteredEvents = events;

  return (
    <div className={styles.eventsPage} style={isHomePage ? { backgroundImage: 'none', backgroundColor: 'transparent' } : {}}>
      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className={styles.container}>
          {/* Section Heading — always visible */}
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[4px] uppercase"
              style={{
                fontFamily: 'var(--font-primary)',
                background: 'linear-gradient(135deg, #CFE8FF 0%, #B9A7FF 50%, #9EE6FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 18px rgba(155,140,255,0.55))',
              }}>
              TRIALS OF THE REALM
            </h2>
            <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent opacity-60" />
          </div>

          {/* Events Grid — 3 Columns as requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-8">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0a0a0f] cursor-pointer hover:border-[#00f2fe]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)]"
              >
                {/* Full Height Evervault Card */}
                <div className="absolute inset-0 z-0">
                  <EvervaultCard text={event.title} imageUrl={event.image} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-5 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/80 to-transparent">
                  <h2 className="text-white text-base font-bold font-cinzel tracking-[1.5px] uppercase group-hover:text-[#00f2fe] transition-colors duration-300">
                    {event.title}
                  </h2>
                  <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#00f2fe] to-purple-500 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className={styles.noEvents}>
              <p>No events found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal (Modern Side-by-Side) */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={closeModals}>
          <div className={styles.eventDetailCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModals} title="Close">
              ✕
            </button>

            {/* Left Side: Visuals */}
            <div className={styles.detailImageSection}>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className={styles.detailImage}
                loading="eager"
              />
            </div>

            {/* Right Side: Intel */}
            <div className={styles.detailInfoSection}>
              <div className={styles.headerWrap}>
                <span className={styles.categoryTag}>{selectedEvent.category}</span>
                <h2 className={styles.detailTitle}>{selectedEvent.title}</h2>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Timeline</span>
                  <p className={styles.infoValue}>{selectedEvent.date || "March 2026"} • {selectedEvent.time || "TBD"}</p>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Coordinates</span>
                  <p className={styles.infoValue}>{selectedEvent.venue || "The Rift Arena"}</p>
                </div>

                <div className={styles.descriptionBox}>
                  <span className={styles.infoLabel}>Transmission</span>
                  <p>{selectedEvent.description}</p>
                </div>
              </div>

              <div className={styles.actionSection}>
                <button
                  onClick={handleRegisterClick}
                  className={styles.registerBtn}
                >
                  Initiate Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
