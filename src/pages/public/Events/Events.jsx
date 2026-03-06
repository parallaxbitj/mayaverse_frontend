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

  const generateRandomDetails = () => {
    const details = [
      "Prepare yourself for the ultimate challenge! In this trial, participants will form teams and tackle some of the most complex algorithmic puzzles ever devised. Will you emerge victorious, or will the code break you?",
      "The arena awaits! Connect your neural interfaces and dive into a gauntlet of non-stop action. Quick reflexes and tactical brilliance are your only hope. Surviving this means ultimate glory.",
      "An esoteric challenge hidden deep within the MayaVerse archives. Decipher the ancient runes, solve the cryptic riddles, and unlock the vault before time runs out. Only the sharpest minds will succeed."
    ];
    return details[Math.floor(Math.random() * details.length)];
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

          {/* Events Grid */}
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent({ ...event, detailedDescription: generateRandomDetails() })}
                className="border border-white/[0.2] flex flex-col items-start max-w-[20rem] mx-auto p-4 relative h-[22rem] w-full cursor-pointer hover:border-white/50 transition-colors"
              >

                <div className="w-full flex-grow relative overflow-hidden flex items-center justify-center">
                  <EvervaultCard text={event.title} />
                </div>

                <h2 className="text-white mt-4 text-center w-full text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>
                  {event.title}
                </h2>
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

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`bg-[#0a0a0f] border border-white/20 p-8 rounded-2xl ${showGoogleForm ? 'max-w-4xl' : 'max-w-lg'} w-full relative transition-all duration-300 overflow-hidden`}>
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {showGoogleForm ? (
              <div className="w-full">
                <h2 className="text-2xl font-cinzel text-[#00f2fe] uppercase tracking-wider mb-6 font-bold text-center">
                  Register for {selectedEvent.title}
                </h2>
                <div className="w-full bg-white/5 rounded-xl overflow-hidden h-[60vh] md:h-[70vh]">
                  <iframe
                    src={getFormUrl()}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="Event Registration Form"
                    className="w-full h-full"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-cinzel text-[#00f2fe] uppercase tracking-wider mb-2 font-bold">{selectedEvent.title}</h2>
                <p className="text-sm text-white/50 mb-6 font-mono border-b border-white/10 pb-4">Date: {selectedEvent.date || "TBD"}</p>

                <div className="text-white/80 font-light text-sm leading-relaxed mb-8">
                  <p>{selectedEvent.detailedDescription}</p>
                </div>

                <button
                  onClick={handleRegisterClick}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all text-sm uppercase tracking-wider cursor-pointer"
                >
                  Register Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
