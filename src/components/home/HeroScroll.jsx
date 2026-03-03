import React, { useRef, useEffect, useState } from 'react';
import Timer from './Timer';

const HeroScroll = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const dateTeaserRef = useRef(null); // Sequence 1
    const presentsRef = useRef(null);   // Sequence 2
    const mainContentRef = useRef(null); // Sequence 3
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const frameCount = 202; // 120 original + 82 new frames
    const fadeStartFrame = 95; // User requirement

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const promises = [];

            // Load first 120 frames (ezgif-frame-001.jpg to ezgif-frame-120.jpg)
            for (let i = 1; i <= 120; i++) {
                const paddedIndex = i.toString().padStart(3, '0');
                const src = `/intro-assets/herosection_scroll/ezgif-frame-${paddedIndex}.jpg`;

                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(null);
                    };
                    img.src = src;
                });
                promises.push(promise);
            }

            // Load additional 82 frames (Create_a_dark_1080p_202602121634_000.webp to 081.webp)
            for (let i = 0; i <= 81; i++) {
                const paddedIndex = i.toString().padStart(3, '0');
                const src = `/intro-assets/herosection_scroll/Create_a_dark_1080p_202602121634_${paddedIndex}.webp`;

                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load new frame ${i}`);
                        resolve(null);
                    };
                    img.src = src;
                });
                promises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(promises);
                setImages(loadedImages);
                setLoading(false);
            } catch (err) {
                console.error("Error loading images", err);
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    // Scroll handling and drawing
    useEffect(() => {
        if (loading || images.length === 0) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        let animationFrameId;

        const render = () => {
            if (!container || !canvas) return;

            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            const containerRect = container.getBoundingClientRect();
            const scrollTop = -containerRect.top;
            const scrollHeight = container.offsetHeight - window.innerHeight;

            let progress = scrollTop / scrollHeight;
            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.floor(progress * (frameCount - 1));

            // Handling Text Overlay Opacity

            // Helper for fade in/out sequence
            const getSequenceOpacity = (current, start, end, fadeInLen = 5, fadeOutLen = 5) => {
                if (current < start || current > end) return 0;

                // Fade In
                if (current < start + fadeInLen) {
                    return (current - start) / fadeInLen;
                }
                // Fade Out
                if (current > end - fadeOutLen) {
                    return (end - current) / fadeOutLen;
                }
                // Fully Visible
                return 1;
            };

            // 1. Date Teaser (10-30)
            if (dateTeaserRef.current) {
                dateTeaserRef.current.style.opacity = getSequenceOpacity(frameIndex, 10, 30);
            }

            // 2. Presents Teaser (40-60)
            if (presentsRef.current) {
                presentsRef.current.style.opacity = getSequenceOpacity(frameIndex, 40, 60);
            }

            // 3. MAYAVERSE main content — always visible once loaded
            // (opacity is set to 1 in JSX; no scroll-based fade needed)

            const img = images[frameIndex];
            if (img) {
                drawImageCover(context, img, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [loading, images]);

    // Draw image helper
    const drawImageCover = (ctx, img, canvasWidth, canvasHeight) => {
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        let renderWidth, renderHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            renderWidth = canvasWidth;
            renderHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - renderHeight) / 2;
        } else {
            renderWidth = canvasHeight * imgRatio;
            renderHeight = canvasHeight;
            offsetX = (canvasWidth - renderWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    return (
        <div ref={containerRef} style={{ height: '280vh', position: 'relative', backgroundColor: 'black' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

                {/* === SEQUENCE 1: Date Teaser (Frames 10-30) === */}
                <div
                    ref={dateTeaserRef}
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'none', zIndex: 6, opacity: 0
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontFamily: "'Montserrat', sans-serif", color: 'white' }}>
                        <div style={{ fontSize: 'clamp(0.7rem, 2vw, 1.2rem)', letterSpacing: '4px', fontWeight: '500', opacity: 0.8 }}>THIS</div>
                        <div style={{ fontSize: 'clamp(2.5rem, 9vw, 5rem)', fontWeight: '700', lineHeight: '0.9' }}>11–12</div>
                        <div style={{ fontSize: 'clamp(1rem, 3.5vw, 2rem)', letterSpacing: 'clamp(3px, 1.5vw, 8px)', fontWeight: '600', color: '#00f2fe' }}>MARCH</div>
                    </div>
                </div>

                {/* === SEQUENCE 2: Presents Teaser (Frames 40-60) === */}
                {/* <div
                    ref={presentsRef}
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'none', zIndex: 6, opacity: 0
                    }}
                >
                    <h3 style={{
                        fontFamily: "'Syncopate', sans-serif",
                        fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
                        fontWeight: '700',
                        color: '#00f2fe',
                        letterSpacing: '6px',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        margin: 0
                    }}>
                        PARALLAX <span style={{ fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', fontWeight: '400', color: 'white', display: 'block', marginTop: '10px' }}>presents</span>
                    </h3>
                </div> */}

                {/* === SEQUENCE 3: Main Layout (Frames 95+) === */}
                <div
                    ref={mainContentRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 1,
                        pointerEvents: 'none',
                        zIndex: 5,
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '0 0 20px rgba(0,0,0,0.8)'
                    }}
                >
                    {/* Main Title */}
                    <h1 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        fontWeight: '700',
                        letterSpacing: '8px',
                        background: 'linear-gradient(135deg, #CFE8FF 0%, #B9A7FF 50%, #9EE6FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 10px rgba(155, 140, 255, 0.6))',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1
                    }}>
                        MAYAVERSE
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'clamp(0.75rem, 2vw, 1.2rem)',
                        letterSpacing: '3px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: 'clamp(2rem, 5vh, 5rem)',
                        padding: '0 1rem',
                        textAlign: 'center'
                    }}>
                        Decoding Reality – Where Code Meets Illusion
                    </p>

                    {/* Timer Only */}
                    <div style={{ pointerEvents: 'auto' }}>
                        <Timer />
                    </div>
                </div>

                {loading && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', background: 'black', zIndex: 10
                    }}>
                        Escorting you to the MAYAVERSE
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroScroll;
