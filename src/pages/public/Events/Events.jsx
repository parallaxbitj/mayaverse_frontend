import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEvents, registerForEvent } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { EvervaultCard } from '../../../components/ui/evervault-card';
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

  if (loading) {
    return <div className={styles.loading}>Loading events...</div>;
  }

  const filteredEvents = events;

  return (
    <div className={styles.eventsPage} style={isHomePage ? { backgroundImage: 'none', backgroundColor: 'transparent' } : {}}>
      {/* Hero Section */}
      {!isHomePage && (
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>TRIALS OF THE REALM</h1>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className={`px-4 relative z-10 w-full flex justify-center ${isHomePage ? 'py-20' : 'py-12'}`}>
        <div className="max-w-4xl text-center flex flex-col items-center gap-6">
          <p className="text-white/80 font-light text-lg md:text-xl leading-relaxed">
            <strong className="text-white font-cinzel tracking-wider mr-2">PARALLAX 2026,</strong>
            formerly known as TechVibes, is the annual technical fest of BIT Mesra, Jaipur Campus — celebrating innovation, creativity, and technological excellence.
          </p>
          <p className="text-white/60 font-light text-md md:text-lg leading-relaxed">
            Inspired by <span className="text-[#ff00de] italic">parallax</span> — a shift in perspective that reveals new possibilities — the fest promotes bold thinking through competitions, workshops, exhibitions, and visionary sessions.
          </p>
          <div className="mt-4 p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(0,242,254,0.15)] transition-all hover:shadow-[0_0_60px_rgba(0,242,254,0.3)] hover:border-[#00f2fe]/30">
            <h3 className="text-[#00f2fe] font-cinzel text-xl md:text-2xl font-bold italic tracking-wide mb-4" style={{ textShadow: "0 0 15px rgba(0, 242, 254, 0.6)" }}>
              “Mayaverse — Where Innovation Feels Like Magic”
            </h3>
            <p className="text-white/80 font-light text-md leading-relaxed">
              This year’s theme imagines a space where imagination meets technology, and when innovation reaches its peak, it becomes more than technology — it becomes magic.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className={styles.container}>
          {/* Events Grid */}
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent({ ...event, detailedDescription: generateRandomDetails() })}
                className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] w-full cursor-pointer hover:border-white/50 transition-colors"
              >

                <div className="w-full flex-grow relative overflow-hidden flex items-center justify-center">
                  <EvervaultCard text={event.title} />
                </div>

                <h2 className="text-white mt-4 text-sm font-light uppercase tracking-wider font-cinzel">
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
          <div className="bg-[#0a0a0f] border border-white/20 p-8 rounded-2xl max-w-lg w-full relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-cinzel text-[#00f2fe] uppercase tracking-wider mb-2 font-bold">{selectedEvent.title}</h2>
            <p className="text-sm text-white/50 mb-6 font-mono border-b border-white/10 pb-4">Date: {selectedEvent.date || "TBD"}</p>

            <div className="text-white/80 font-light text-sm leading-relaxed mb-8">
              <p>{selectedEvent.detailedDescription}</p>
            </div>

            <button
              onClick={() => alert(`Registered for ${selectedEvent.title}!`)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all text-sm uppercase tracking-wider cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
