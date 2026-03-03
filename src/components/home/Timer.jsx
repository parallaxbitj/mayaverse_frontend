import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const containerRef = useRef(null);
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    // Target Date: March 11
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const currentYear = now.getFullYear();
            let targetDate = new Date(`March 11, ${currentYear} 00:00:00`);

            if (now > targetDate) {
                targetDate = new Date(`March 11, ${currentYear + 1} 00:00:00`);
            }

            const difference = targetDate - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, []);

    // 3D Tilt Effect — Desktop only (skip on touch devices to prevent jank)
    const handleMouseMove = (e) => {
        if (!containerRef.current || isTouchDevice) return;
        const { innerWidth, innerHeight } = window;
        const x = (innerWidth / 2 - e.clientX) / 40;
        const y = (innerHeight / 2 - e.clientY) / 40;
        containerRef.current.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    };

    useEffect(() => {
        if (isTouchDevice) return;
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{ perspective: '1500px' }}>
            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    gap: 'clamp(6px, 2.5vw, 15px)',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s ease-out',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label} style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,242,254,0.2)',
                        padding: 'clamp(10px, 2.5vw, 20px)',
                        borderRadius: '12px',
                        textAlign: 'center',
                        minWidth: 'clamp(60px, 16vw, 100px)',
                        backdropFilter: 'blur(10px)',
                        transition: 'transform 0.3s',
                        transform: 'translateZ(0px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onMouseEnter={(e) => { if (!isTouchDevice) e.currentTarget.style.transform = 'translateZ(30px)'; }}
                        onMouseLeave={(e) => { if (!isTouchDevice) e.currentTarget.style.transform = 'translateZ(0px)'; }}
                    >
                        <span style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: 'clamp(1.3rem, 4.5vw, 2.5rem)',
                            fontWeight: '900',
                            background: 'linear-gradient(135deg, #00f2fe, #ff00de)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1
                        }}>
                            {value.toString().padStart(2, '0')}
                        </span>
                        <label style={{
                            marginTop: '6px',
                            fontSize: 'clamp(0.5rem, 1.5vw, 0.6rem)',
                            letterSpacing: '2px',
                            color: 'rgba(0,242,254,0.7)',
                            fontFamily: "'Syncopate', sans-serif"
                        }}>
                            {label.toUpperCase()}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timer;
