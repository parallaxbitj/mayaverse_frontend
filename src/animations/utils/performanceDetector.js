/**
 * MAYAVERSE - Performance Detector
 * 
 * Detects device performance level and adjusts animations accordingly.
 * This ensures smooth experience on all devices.
 */

/**
 * Performance Levels
 */
export const PERFORMANCE_LEVEL = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

/**
 * Detect device performance level
 * Based on: CPU cores, memory, device type, and user preference
 */
export const detectPerformanceLevel = () => {
  // Check for user's reduced motion preference (accessibility)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return PERFORMANCE_LEVEL.LOW;
  }

  // Get hardware info
  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 4; // GB
  
  // Check if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Performance scoring
  let score = 0;

  // CPU cores scoring
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;

  // Memory scoring
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else score += 1;

  // Mobile penalty
  if (isMobile) score -= 2;

  // Determine level
  if (score >= 5) return PERFORMANCE_LEVEL.HIGH;
  if (score >= 3) return PERFORMANCE_LEVEL.MEDIUM;
  return PERFORMANCE_LEVEL.LOW;
};

/**
 * Get animation configuration based on performance level
 */
export const getAnimationConfig = (performanceLevel) => {
  const configs = {
    [PERFORMANCE_LEVEL.HIGH]: {
      enableComplexAnimations: true,
      enableParticles: true,
      enableBlur: true,
      scrollSmoothness: 1,
      maxScrollTriggers: 50,
      portalDuration: 3,
      transitionDuration: 1.5,
    },
    [PERFORMANCE_LEVEL.MEDIUM]: {
      enableComplexAnimations: true,
      enableParticles: false,
      enableBlur: false,
      scrollSmoothness: 0.8,
      maxScrollTriggers: 30,
      portalDuration: 2,
      transitionDuration: 1,
    },
    [PERFORMANCE_LEVEL.LOW]: {
      enableComplexAnimations: false,
      enableParticles: false,
      enableBlur: false,
      scrollSmoothness: 0.5,
      maxScrollTriggers: 10,
      portalDuration: 1,
      transitionDuration: 0.5,
    },
  };

  return configs[performanceLevel];
};

/**
 * Store and retrieve performance level
 */
const PERFORMANCE_KEY = 'mayaverse_performance_level';

export const getStoredPerformanceLevel = () => {
  const stored = localStorage.getItem(PERFORMANCE_KEY);
  if (stored && Object.values(PERFORMANCE_LEVEL).includes(stored)) {
    return stored;
  }
  
  // Detect and store
  const detected = detectPerformanceLevel();
  localStorage.setItem(PERFORMANCE_KEY, detected);
  return detected;
};

export const setPerformanceLevel = (level) => {
  if (Object.values(PERFORMANCE_LEVEL).includes(level)) {
    localStorage.setItem(PERFORMANCE_KEY, level);
  }
};

/**
 * Performance monitoring
 */
export const shouldReduceAnimations = () => {
  const level = getStoredPerformanceLevel();
  return level === PERFORMANCE_LEVEL.LOW;
};

export const shouldDisableComplexEffects = () => {
  const level = getStoredPerformanceLevel();
  return level !== PERFORMANCE_LEVEL.HIGH;
};

/**
 * FPS Monitor (for debugging)
 */
export class FPSMonitor {
  constructor() {
    this.frames = [];
    this.lastTime = performance.now();
  }

  update() {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;
    
    this.frames.push(1000 / delta);
    if (this.frames.length > 60) {
      this.frames.shift();
    }
  }

  getAverageFPS() {
    if (this.frames.length === 0) return 60;
    return Math.round(
      this.frames.reduce((a, b) => a + b, 0) / this.frames.length
    );
  }

  isPerformanceGood() {
    return this.getAverageFPS() >= 50;
  }
}

export default {
  detectPerformanceLevel,
  getAnimationConfig,
  getStoredPerformanceLevel,
  setPerformanceLevel,
  shouldReduceAnimations,
  shouldDisableComplexEffects,
  PERFORMANCE_LEVEL,
  FPSMonitor,
};