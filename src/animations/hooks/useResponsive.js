/**
 * MAYAVERSE - useResponsive Hook
 * 
 * Custom hook for managing responsive design patterns.
 * Provides breakpoint detection and responsive utilities throughout the app.
 */

import { useState, useEffect, useCallback } from 'react';

// Define breakpoints (matching Tailwind defaults for consistency)
export const BREAKPOINTS = {
  mobile: 480,      // xs
  tablet: 768,      // sm
  desktop: 1024,    // md
  wide: 1280,       // lg
  ultraWide: 1536   // xl
};

/**
 * Hook to detect current screen size and breakpoint
 * Returns boolean flags for each breakpoint
 */
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < BREAKPOINTS.tablet);
  const [isTablet, setIsTablet] = useState(() => window.innerWidth < BREAKPOINTS.desktop && window.innerWidth >= BREAKPOINTS.tablet);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= BREAKPOINTS.desktop);
  const [isWide, setIsWide] = useState(() => window.innerWidth >= BREAKPOINTS.wide);
  const [isUltraWide, setIsUltraWide] = useState(() => window.innerWidth >= BREAKPOINTS.ultraWide);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setWindowWidth(width);
        setIsMobile(width < BREAKPOINTS.tablet);
        setIsTablet(width < BREAKPOINTS.desktop && width >= BREAKPOINTS.tablet);
        setIsDesktop(width >= BREAKPOINTS.desktop);
        setIsWide(width >= BREAKPOINTS.wide);
        setIsUltraWide(width >= BREAKPOINTS.ultraWide);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isUltraWide,
    windowWidth,
    // Utility methods
    isMobileOrTablet: isMobile || isTablet,
    isDesktopOrWide: isDesktop || isWide,
  };
};

/**
 * Hook to get responsive values based on screen size
 * Example: useResponsiveValue({ mobile: 12, tablet: 16, desktop: 20 })
 */
export const useResponsiveValue = (values) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return isMobile ? values.mobile : isTablet ? values.tablet : values.desktop || values.tablet || values.mobile;
};

/**
 * Hook to check if viewport matches a specific breakpoint
 * Example: useMediaQuery('(min-width: 768px)')
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => setMatches(e.matches));
      return () => mediaQuery.removeEventListener('change', (e) => setMatches(e.matches));
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => setMatches(e.matches));
      return () => mediaQuery.removeListener((e) => setMatches(e.matches));
    }
  }, [query]);

  return matches;
};

/**
 * Hook to handle orientation changes (portrait/landscape)
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(() => window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');

  useEffect(() => {
    const handleOrientationChange = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setOrientation(portrait ? 'portrait' : 'landscape');
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return {
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  };
};

/**
 * Hook to get safe area insets (for devices with notches)
 */
export const useSafeAreaInsets = () => {
  const [insets, setInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });

  useEffect(() => {
    const getInsets = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
        right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0'),
        bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
        left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0')
      });
    };

    getInsets();
    // Also check on viewport change
    window.addEventListener('resize', getInsets);
    return () => window.removeEventListener('resize', getInsets);
  }, []);

  return insets;
};

export default useResponsive;
