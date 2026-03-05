import { useState, useEffect } from 'react';

// Common breakpoints (in pixels)
const breakpoints = {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1536,
};

/**
 * A custom hook to determine the current screen size category.
 * Useful for rendering different components or logic based on device size.
 * 
 * @returns {Object} An object containing the current window dimensions and device category booleans.
 */
const useResponsive = () => {
    // Initialize state with current window dimensions (with fallback for SSR)
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        // Only run on the client side
        if (typeof window === 'undefined') return;

        // Handler to call on window resize
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Compute boolean flags based on current width
    const { width } = windowSize;

    return {
        width: windowSize.width,
        height: windowSize.height,

        // Exact categories
        isMobile: width < breakpoints.tablet,                                         // < 768px
        isTablet: width >= breakpoints.tablet && width < breakpoints.laptop,          // 768px - 1023px
        isLaptop: width >= breakpoints.laptop && width < breakpoints.desktop,         // 1024px - 1279px
        isDesktop: width >= breakpoints.desktop && width < breakpoints.wide,          // 1280px - 1535px
        isWide: width >= breakpoints.wide,                                            // >= 1536px

        // Useful combined categories
        isMobileOrTablet: width < breakpoints.laptop,                                 // < 1024px
        isTabletOrLarger: width >= breakpoints.tablet,                                // >= 768px
        isLaptopOrLarger: width >= breakpoints.laptop,                                // >= 1024px
    };
};

export default useResponsive;
