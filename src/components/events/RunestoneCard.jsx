import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RunestoneCard.module.css';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/config';

/**
 * RunestoneCard — Video-driven event card with absolute frame synchronization.
 * 
 * We use requestVideoFrameCallback (supported in most modern browsers) 
 * to tie the container's CSS scale/translate directly to the video's 
 * actual rendered frames at high speeds.
 */
const RunestoneCard = ({ event, onRegister }) => {
    // idle | opening | modal | closing
    const [state, setState] = useState('idle');
    const [locked, setLocked] = useState(false);
    const [showGoogleForm, setShowGoogleForm] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Determine which Google Form URL to use based on user's email domain
    const getFormUrl = () => {
        return 'https://forms.gle/Rum61AswAjc58qzy8';
    };

    const cardRef = useRef(null);
    const videoContainerRef = useRef(null);
    const openVideoRef = useRef(null);
    const closeVideoRef = useRef(null);
    const vfcIdRef = useRef(null);
    const rafIdRef = useRef(null);

    // Speed constant - 3.0x is very snappy as requested
    const PLAYBACK_SPEED = 3.0;

    const getSpatialData = () => {
        if (!cardRef.current) return null;
        const r = cardRef.current.getBoundingClientRect();

        // Read actual header height from DOM (handles responsive height changes)
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 70;

        // Smaller margin on narrow screens
        const isMobile = window.innerWidth < 768;
        const margin = isMobile ? 12 : 40;

        const availableWidth = window.innerWidth - margin * 2;
        const availableHeight = window.innerHeight - headerHeight - margin * 2;

        // Cap scale at 1.0 on mobile to prevent overflow
        const maxScale = isMobile ? 1.0 : 1.35;
        const scale = Math.min(availableWidth / r.width, availableHeight / r.height, maxScale);
        const scaledW = r.width * scale;
        const scaledH = r.height * scale;

        const targetCenterX = window.innerWidth / 2;
        const targetCenterY = headerHeight + margin + availableHeight / 2;

        return {
            start: { top: r.top, left: r.left, width: r.width, height: r.height },
            translate: {
                x: targetCenterX - (r.left + r.width / 2),
                y: targetCenterY - (r.top + r.height / 2)
            },
            scale: scale
        };
    };

    const updateFrame = (vid, container, reverse = false) => {
        if (!vid || !container) return;
        const spatial = getSpatialData();
        if (!spatial) return;

        const { translate, scale } = spatial;
        const duration = vid.duration;
        if (!duration) return;

        const progress = Math.min(vid.currentTime / duration, 1);

        // Strictly linear for perfect frame-to-position sync
        const p = reverse ? (1 - progress) : progress;

        const tx = translate.x * p;
        const ty = translate.y * p;
        const s = 1 + (scale - 1) * p;

        container.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;

        // Opacity management
        if (reverse) {
            container.style.opacity = progress > 0.9 ? 0 : 1;
        } else {
            container.style.opacity = progress < 0.1 ? progress * 10 : 1;
        }
    };

    const startSyncLoop = (vid, container, reverse = false) => {
        const sync = () => {
            updateFrame(vid, container, reverse);

            if (vid.requestVideoFrameCallback) {
                vfcIdRef.current = vid.requestVideoFrameCallback(sync);
            } else {
                rafIdRef.current = requestAnimationFrame(sync);
            }
        };

        if (vid.requestVideoFrameCallback) {
            vfcIdRef.current = vid.requestVideoFrameCallback(sync);
        } else {
            rafIdRef.current = requestAnimationFrame(sync);
        }
    };

    const stopSyncLoop = (vid) => {
        if (vid && vid.cancelVideoFrameCallback && vfcIdRef.current) {
            vid.cancelVideoFrameCallback(vfcIdRef.current);
        }
        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
        }
    };

    // ─── OPEN ───
    const handleOpen = useCallback(() => {
        if (locked || state !== 'idle') return;
        setLocked(true);
        setState('opening');

        const vid = openVideoRef.current;
        const container = videoContainerRef.current;

        if (vid && container) {
            const spatial = getSpatialData();
            if (spatial) {
                // Initialize position
                Object.assign(container.style, {
                    top: `${spatial.start.top}px`,
                    left: `${spatial.start.left}px`,
                    width: `${spatial.start.width}px`,
                    height: `${spatial.start.height}px`,
                    transform: 'translate(0, 0) scale(1)',
                    opacity: '0',
                });
            }

            vid.currentTime = 0;
            vid.playbackRate = PLAYBACK_SPEED;

            const onEnded = () => {
                vid.removeEventListener('ended', onEnded);
                stopSyncLoop(vid);
                setState('modal');
                setLocked(false);
            };
            vid.addEventListener('ended', onEnded);

            startSyncLoop(vid, container, false);
            vid.play().catch(() => {
                setState('modal');
                setLocked(false);
            });
        }
    }, [locked, state]);

    // ─── CLOSE ───
    const handleClose = useCallback(() => {
        if (locked || state !== 'modal') return;
        setLocked(true);
        setState('closing');

        const openVid = openVideoRef.current;
        const closeVid = closeVideoRef.current;
        const container = videoContainerRef.current;

        if (openVid) { openVid.pause(); openVid.currentTime = 0; }

        if (closeVid && container) {
            const spatial = getSpatialData();
            if (spatial) {
                // Should already be at center, but let's confirm
                container.style.transform = `translate(${spatial.translate.x}px, ${spatial.translate.y}px) scale(${spatial.scale})`;
            }

            closeVid.currentTime = 0;
            closeVid.playbackRate = PLAYBACK_SPEED;

            const onEnded = () => {
                closeVid.removeEventListener('ended', onEnded);
                stopSyncLoop(closeVid);
                closeVid.pause();
                closeVid.currentTime = 0;
                setState('idle');
                setLocked(false);
            };
            closeVid.addEventListener('ended', onEnded);

            startSyncLoop(closeVid, container, true);
            closeVid.play().catch(() => {
                setState('idle');
                setLocked(false);
            });
        }
    }, [locked, state]);

    useEffect(() => {
        return () => {
            stopSyncLoop(openVideoRef.current);
            stopSyncLoop(closeVideoRef.current);
        };
    }, []);

    // ─── Register ripple ───
    const handleRegisterClick = (e) => {
        e.stopPropagation();

        if (!isAuthenticated()) {
            navigate(ROUTES.LOGIN);
            return;
        }

        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = styles.ripple;
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
        // Show Google Form modal instead of calling onRegister callback
        setShowGoogleForm(true);
    };

    const isIdle = state === 'idle';
    const isOpening = state === 'opening';
    const isModal = state === 'modal';
    const isClosing = state === 'closing';
    const showContainer = isOpening || isModal || isClosing;

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.backdrop} ${!isIdle ? styles.visible : ''}`} />

            {/* FRONT CARD (IDLE) */}
            <div
                ref={cardRef}
                className={`${styles.card} ${!isIdle ? styles.hidden : ''}`}
                onClick={handleOpen}
            >
                <video
                    className={styles.cardVideo}
                    src="/events-assets/Event_to_Modal.mp4"
                    preload="metadata"
                    muted
                    playsInline
                    onMouseEnter={e => e.currentTarget.play()}
                    onMouseLeave={e => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                    }}
                />
                <div className={styles.engravedOverlay}>
                    <div className={styles.runeSymbols}>᛭ ᚱ ᚢ ᚾ ᛖ ᛭</div>
                    <h3 className={styles.engravedTitle}>{event.title}</h3>
                    <div className={styles.engravedSub}>{event.category}</div>
                    <div className={styles.engravedDivider} />
                    <div className={styles.engravedInfo}>
                        {event.date}
                        {event.venue && <><br />{event.venue}</>}
                    </div>
                </div>
            </div>

            {/* ANIMATION CONTAINER */}
            <div
                ref={videoContainerRef}
                className={`${styles.videoContainer} ${showContainer ? styles.visible : ''}`}
            >
                {/* Opening Video */}
                <video
                    ref={openVideoRef}
                    className={`${styles.vid} ${(isOpening || isModal) ? styles.showVid : ''}`}
                    src="/events-assets/Event_to_Modal.mp4"
                    preload="metadata"
                    muted
                    playsInline
                />

                {/* Closing Video */}
                <video
                    ref={closeVideoRef}
                    className={`${styles.vid} ${isClosing ? styles.showVid : ''}`}
                    src="/events-assets/Modal_to_Event.mp4"
                    preload="metadata"
                    muted
                    playsInline
                />

                {/* MODAL ON STONE */}
                <div className={`${styles.stoneModal} ${isModal ? styles.visible : ''}`}>
                    <button className={styles.closeBtn} onClick={handleClose}>✕</button>
                    <h2 className={styles.stoneTitle}>{event.title}</h2>
                    <div className={styles.stoneDetails}>
                        <div className={styles.detailRow}>
                            <div className={styles.detailLabel}>Date & Time</div>
                            <div className={styles.detailValue}>
                                {event.date} {event.time && `· ${event.time}`}
                            </div>
                        </div>
                        {event.venue && (
                            <div className={styles.detailRow}>
                                <div className={styles.detailLabel}>Venue</div>
                                <div className={styles.detailValue}>{event.venue}</div>
                            </div>
                        )}
                    </div>
                    <div className={styles.stoneDivider} />
                    <p className={styles.stoneDesc}>{event.description}</p>
                    <button className={styles.registerBtn} onClick={handleRegisterClick}>
                        Register Now
                    </button>
                </div>
            </div>

            {/* GOOGLE FORM MODAL */}
            {showGoogleForm && (
                <div className={styles.formBackdrop} onClick={() => setShowGoogleForm(false)}>
                    <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.formCloseBtn}
                            onClick={() => setShowGoogleForm(false)}
                        >
                            ✕
                        </button>
                        <div className={styles.formContent}>
                            <h3 className={styles.formTitle}>Register for {event.title}</h3>
                            <iframe
                                src={getFormUrl() || event.googleFormUrl}
                                width="100%"
                                height="600"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="Event Registration Form"
                                className={styles.googleForm}
                            >
                                Loading…
                            </iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RunestoneCard;
