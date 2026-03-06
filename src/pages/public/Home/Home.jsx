import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import HeroScroll from '../../../components/home/HeroScroll';
import Events from '../../public/Events/Events';
import Sponsors from '../../public/Sponsors/Sponsors';
import Timeline from '../../../components/home/Timeline/Timeline';
import Merchandise from '../../public/Merchandise/Merchandise';
import TeamSection from '../../../components/home/TeamSection/TeamSection';
import ParallaxIntro from '../../../components/home/ParallaxIntro';

// Module-level: resets on browser refresh, survives in-app navigation
let _introHasPlayed = false;

const Home = () => {
  const [showIntro, setShowIntro] = useState(!_introHasPlayed);
  const [isFading, setIsFading] = useState(false);
  const [videoEnded, setVideoEnded] = useState(_introHasPlayed);
  const [videoRemoved, setVideoRemoved] = useState(_introHasPlayed);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync body class so Navbar knows when to hide (useLayoutEffect = before first paint)
  useLayoutEffect(() => {
    if (showIntro) {
      document.body.classList.add('intro-active');
    } else {
      document.body.classList.remove('intro-active');
    }
    return () => document.body.classList.remove('intro-active');
  }, [showIntro]);

  // Normal click-anywhere — fade out intro, play portal video
  const handleIntroClick = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setShowIntro(false);
      _introHasPlayed = true;
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error('Video play failed', e));
      }
    }, 2000);
  };

  // Skip button — skip EVERYTHING, go straight to content
  const handleSkip = () => {
    _introHasPlayed = true;
    setShowIntro(false);
    setVideoEnded(true);
    setVideoRemoved(true);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => setVideoRemoved(true), 1000);
  };

  return (
    <div className="home-container" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>

      {/* Intro overlay — only shown on first visit per session */}
      {showIntro && (
        <ParallaxIntro
          onStart={handleIntroClick}
          onSkip={handleSkip}
          isFading={isFading}
        />
      )}

      {/* Portal travel video — plays after intro fades */}
      {!videoRemoved && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 1000,
          backgroundColor: 'black',
          opacity: videoEnded ? 0 : 1,
          transition: 'opacity 1s ease-out',
          pointerEvents: videoEnded ? 'none' : 'auto',
        }}>
          <video
            ref={videoRef}
            src="/intro-assets/portal_travel.mp4"
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Main content */}
      <HeroScroll />
      <div className="content-sections" style={{ position: 'relative', zIndex: 10, backgroundColor: '#06060e' }}>
        <Events />
        <Sponsors />
        <Timeline />
        <Merchandise />
        <TeamSection />
      </div>
    </div>
  );
};

export default Home;