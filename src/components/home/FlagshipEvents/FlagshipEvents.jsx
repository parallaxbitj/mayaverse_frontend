import React, { useState, useEffect } from 'react';
import { EvervaultCard } from '../../ui/evervault-card';
import { mockEvents } from '../../../services/mockData';
import { EXTERNAL_STUDENT_WHATSAPP } from '../../../constants/config';
import styles from './FlagshipEvents.module.css';
import eventStyles from '../../../pages/public/Events/Events.module.css';

const mockFlagshipEvents = [
  { id: 1, title: 'TECHX (Opening Ceremony)', date: 'TBD', venue: 'TBD' },
  { id: 2, title: 'Tech Escape (Programmix)', date: 'TBD', venue: 'TBD' },
  { id: 3, title: 'Circuit Debugging', date: 'TBD', venue: 'TBD' },
  { id: 4, title: 'Rapid Keys', date: 'TBD', venue: 'TBD' },
  { id: 5, title: 'Robo Soccer', date: 'TBD', venue: 'TBD' },
  { id: 6, title: 'Brand Wars: Dominate or Disappear', date: 'TBD', venue: 'TBD' },
  { id: 7, title: 'Panel Discussion', date: 'TBD', venue: 'TBD' },
  { id: 8, title: 'Techno Quiz / Programmix Event (Unstop)', date: 'TBD', venue: 'TBD' },
  { id: 9, title: 'Ad Making (For Sponsors)', date: 'TBD', venue: 'TBD' },
  { id: 10, title: 'Filmaura (Lensoc)', date: 'TBD', venue: 'TBD' },
  { id: 11, title: 'Research Paper and Poster Presentation', date: 'TBD', venue: 'TBD' },
  { id: 12, title: 'Kurukshetra (Hackathon) (Devnote)', date: 'TBD', venue: 'TBD' },
  { id: 13, title: 'College Band Performance', date: 'TBD', venue: 'TBD' },
  { id: 14, title: 'Code Wars (GFG)', date: 'TBD', venue: 'TBD' },
  { id: 15, title: 'AI Prompt Battle', date: 'TBD', venue: 'TBD' },
  { id: 16, title: 'Stock Strom (Stock Grow)', date: 'TBD', venue: 'TBD' },
  { id: 17, title: 'Auction League', date: 'TBD', venue: 'TBD' },
  { id: 18, title: 'Mock Parliament', date: 'TBD', venue: 'TBD' },
  { id: 19, title: 'Treasure Hunt (Hogwarts Theme)', date: 'TBD', venue: 'TBD' },
  { id: 20, title: 'Alumni Hour', date: 'TBD', venue: 'TBD' },
  { id: 21, title: 'Decode the Scam', date: 'TBD', venue: 'TBD' },
  { id: 22, title: 'Gaming Event (BGMI, FIFA, Valorant)', date: 'TBD', venue: 'TBD' }
];

const FlagshipEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [showGoogleForm, setShowGoogleForm] = useState(false);

  // Map flagship events to full event data from mockData
  const getFullEventData = (title) => {
    // Basic normalization of titles to match
    const normalizedTitle = title.split('(')[0].trim().toLowerCase();
    return mockEvents.find(e =>
      e.title.toLowerCase().includes(normalizedTitle) ||
      normalizedTitle.includes(e.title.toLowerCase())
    );
  };

  const handleRegisterClick = (e, event) => {
    e.stopPropagation();
    const fullEvent = getFullEventData(event.title);
    if (fullEvent) {
      setSelectedEvent({ ...event, ...fullEvent });
      setShowGoogleForm(true);
    } else {
      alert(`Registration for ${event.title} will open soon!`);
    }
  };

  const closeForm = () => {
    setShowGoogleForm(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, mockFlagshipEvents.length - cardsToShow));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const generateRandomDetails = () => {
    const details = [
      "Prepare yourself for the ultimate challenge! In this trial, participants will form teams and tackle some of the most complex algorithmic puzzles ever devised. Will you emerge victorious, or will the code break you?",
      "The arena awaits! Connect your neural interfaces and dive into a gauntlet of non-stop action. Quick reflexes and tactical brilliance are your only hope. Surviving this means ultimate glory.",
      "An esoteric challenge hidden deep within the MayaVerse archives. Decipher the ancient runes, solve the cryptic riddles, and unlock the vault before time runs out. Only the sharpest minds will succeed."
    ];
    return details[Math.floor(Math.random() * details.length)];
  };

  return (
    <div style={{ backgroundImage: 'none', backgroundColor: 'transparent', width: '100%', display: 'flex', flexDirection: 'column' }} className="relative z-10 w-full flex flex-col">

      {/* Events Section */}
      <section className={styles.flagshipSection}>
        <div className={styles.container}>
          {/* Section Heading — always visible */}
          <div className="text-center mb-4">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold tracking-[6px] uppercase"
              style={{
                background: 'linear-gradient(135deg, #FFB7B2 0%, #E284FF 50%, #9EE6FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(226,132,255,0.5))',
              }}>
              FLAGSHIP EVENTS
              <br></br>
              <br></br>
              <br></br>
            </h2>
            <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#E284FF] to-transparent opacity-60" />
          </div>

          {/* Carousel Slider */}
          <div className="relative w-full mt-8 group">

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-[-1rem] md:left-[-3rem] top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-[#E284FF]/20 border border-white/10 hover:border-[#E284FF]/50 rounded-full backdrop-blur-sm transition-all text-white opacity-0 group-hover:opacity-100 disabled:opacity-0 cursor-pointer"
              aria-label="Previous events"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              disabled={currentIndex >= mockFlagshipEvents.length - cardsToShow}
              className="absolute right-[-1rem] md:right-[-3rem] top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-[#E284FF]/20 border border-white/10 hover:border-[#E284FF]/50 rounded-full backdrop-blur-sm transition-all text-white opacity-0 group-hover:opacity-100 disabled:opacity-0 cursor-pointer"
              aria-label="Next events"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>

            {/* Slider Track Wrapper */}
            <div className="overflow-hidden w-full relative h-[32rem]">
              <div
                className="flex w-full transition-transform duration-500 ease-out h-[30rem]"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (100% + 2rem) / ${cardsToShow}))`,
                  gap: '2rem'
                }}
              >
                {mockFlagshipEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent({ ...event, detailedDescription: generateRandomDetails() })}
                    className="shrink-0 border border-white/[0.2] flex flex-col items-start p-4 relative h-full cursor-pointer hover:border-white/50 transition-colors bg-[#06060e]"
                    style={{
                      width: `calc((100% - ${(cardsToShow - 1) * 2}rem) / ${cardsToShow})`
                    }}
                  >
                    <div className="w-full flex-grow relative overflow-hidden flex items-center justify-center">
                      <EvervaultCard text={event.title} />
                    </div>

                    <div className="w-full mt-4">
                      <h2 className="text-white text-sm font-light uppercase tracking-wider font-cinzel line-clamp-2">
                        {event.title}
                      </h2>
                      <div className="flex flex-col gap-2 text-white/70 text-xs font-mono border-t border-white/10 pt-2 mt-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-[#E284FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-[#E284FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
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

            <h2 className="text-2xl font-cinzel text-[#E284FF] uppercase tracking-wider mb-2 font-bold">{selectedEvent.title}</h2>
            <p className="text-sm text-white/50 mb-6 font-mono border-b border-white/10 pb-4">Date: {selectedEvent.date || "TBD"}</p>

            <div className="text-white/80 font-light text-sm leading-relaxed mb-8">
              <p>{selectedEvent.detailedDescription}</p>
            </div>

            <button
              onClick={(e) => handleRegisterClick(e, selectedEvent)}
              className="w-full py-3 bg-gradient-to-r from-[#FFB7B2] to-[#E284FF] hover:from-[#E284FF] hover:to-[#9EE6FF] text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all text-sm uppercase tracking-wider cursor-pointer"
            >
              Register Now
            </button>
            <p className="mt-3 text-center text-[0.72rem] leading-relaxed text-white/75">
              {EXTERNAL_STUDENT_WHATSAPP.MESSAGE}{' '}
              <a
                href={EXTERNAL_STUDENT_WHATSAPP.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#74f6bc] underline underline-offset-2 transition-colors hover:text-[#a1f9d2]"
              >
                {EXTERNAL_STUDENT_WHATSAPP.CTA}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Google Form Modal */}
      {showGoogleForm && (
        <div className={eventStyles.formOverlay} onClick={closeForm}>
          <div className={eventStyles.formModal} onClick={(e) => e.stopPropagation()}>
            <button className={eventStyles.formClose} onClick={closeForm} aria-label="Close form">
              ✕
            </button>
            <div className={eventStyles.formHeader}>
              <span className={eventStyles.formTag}>Event Registration</span>
              <h3 className={eventStyles.formTitle}>{selectedEvent?.title}</h3>
            </div>
            <iframe
              src={selectedEvent?.googleFormUrl}
              className={eventStyles.formIframe}
              title="Event Registration Form"
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

export default FlagshipEvents;
