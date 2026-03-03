import React, { useRef, useEffect, useState } from 'react';

const RingScroll = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const frameCount = 120; // Total number of frames

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const promises = [];
            for (let i = 1; i <= frameCount; i++) {
                const paddedIndex = i.toString().padStart(3, '0');
                const src = `/intro-assets/ring_scroll/ezgif-frame-${paddedIndex}.jpg`;

                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load ring frame ${i}`);
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
                console.error("Error loading ring images", err);
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

            // Ensure canvas matches container size (20vh essentially)
            const targetWidth = container.clientWidth;
            const targetHeight = container.clientHeight;

            if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
                canvas.width = targetWidth;
                canvas.height = targetHeight;
            }

            const rect = container.getBoundingClientRect();

            // Interaction Zone:
            // Element animates as it moves through the viewport.
            // Start (0%): Top of element enters bottom of screen.
            // End (100%): Top of element leaves top of screen (or just reaches top).

            // Let's define the animation range:
            // It should start playing when it becomes visible.

            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // We want the animation to complete by the time the element is fully scrolled or reaches top.
            // Let's say it plays from "entering viewport" to "fully visible at top".

            // Range:
            // Start: elementTop = windowHeight (just entering)
            // End: elementTop = 0 (at top of screen)

            const totalDistance = windowHeight;
            const traveled = windowHeight - elementTop;

            let progress = traveled / totalDistance;

            // Clamp progress
            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.floor(progress * (frameCount - 1));

            const img = images[frameIndex];
            if (img) {
                drawImageContain(context, img, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [loading, images]);

    // Helper to draw image 'contain' style to keep full visibility
    const drawImageContain = (ctx, img, canvasWidth, canvasHeight) => {
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;
        let renderWidth, renderHeight, offsetX, offsetY;

        // Contain logic
        if (canvasRatio > imgRatio) {
            // Canvas is wider than image -> fit by height
            renderHeight = canvasHeight;
            renderWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - renderWidth) / 2;
            offsetY = 0;
        } else {
            // Canvas is taller than image -> fit by width
            renderWidth = canvasWidth;
            renderHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - renderHeight) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    return (
        <div ref={containerRef} style={{ height: '20vh', width: '100%', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

            {/* Gradient Overlay for smooth transition */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)',
                pointerEvents: 'none'
            }} />

            {loading && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', background: 'black', zIndex: 10
                }}>
                    Loading...
                </div>
            )}
        </div>
    );
};

export default RingScroll;
