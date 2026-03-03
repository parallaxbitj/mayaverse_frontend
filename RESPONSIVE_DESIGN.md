# MAYAVERSE - Responsive Design Documentation

## Overview

A comprehensive responsive design system has been implemented for the MAYAVERSE frontend. This includes responsive utilities, hooks, and CSS improvements to support all screen sizes from mobile (480px) to ultra-wide displays (1536px+).

---

## 1. useResponsive Hook

Located in: `src/animations/hooks/useResponsive.js`

A powerful custom React hook that provides responsive breakpoint detection and utilities throughout the app.

### Breakpoints

```javascript
const BREAKPOINTS = {
  mobile: 480,      // xs | Mobile phones
  tablet: 768,      // sm | Tablets
  desktop: 1024,    // md | Desktop
  wide: 1280,       // lg | Widescreen
  ultraWide: 1536   // xl | Ultra-wide displays
}
```

### Available Hooks

#### 1. `useResponsive()`
Main hook for detecting current screen size and breakpoint.

```javascript
const { 
  isMobile,           // true if width < 768px
  isTablet,           // true if 768px <= width < 1024px
  isDesktop,          // true if width >= 1024px
  isWide,             // true if width >= 1280px
  isUltraWide,        // true if width >= 1536px
  windowWidth,        // actual window width in pixels
  isMobileOrTablet,   // utility: mobile OR tablet
  isDesktopOrWide     // utility: desktop OR wide
} = useResponsive();
```

**Example Usage:**
```jsx
import { useResponsive } from '../animations/hooks/useResponsive';

function MyComponent() {
  const { isMobile, isDesktop } = useResponsive();

  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

#### 2. `useResponsiveValue(values)`
Get responsive values based on screen size without conditional rendering.

```javascript
const fontSize = useResponsiveValue({
  mobile: 14,
  tablet: 16,
  desktop: 20
});
```

#### 3. `useMediaQuery(query)`
Check if viewport matches a specific CSS media query.

```javascript
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
```

#### 4. `useOrientation()`
Detect portrait/landscape orientation on mobile devices.

```javascript
const { orientation, isPortrait, isLandscape } = useOrientation();
```

#### 5. `useSafeAreaInsets()`
Get safe area insets for devices with notches (e.g., iPhone X).

```javascript
const { top, right, bottom, left } = useSafeAreaInsets();
```

---

## 2. Responsive CSS Architecture

### Media Query Breakpoints

The following breakpoints are consistently used throughout the application:

- **1024px**: Tablet and below (hide desktop navigation, adjust layouts)
- **768px**: Small devices and below (single column layouts, reduced padding)
- **480px**: Mobile phones (minimal spacing, smallest fonts)

### Typography Scaling

Font sizes automatically scale based on screen size:

```css
/* Desktop (default) */
html { font-size: 16px; }
h1 { font-size: 3rem; }   /* 48px */
h2 { font-size: 2.5rem; } /* 40px */

/* Tablet (1024px and below) */
@media (max-width: 1024px) {
  html { font-size: 15px; }
  h1 { font-size: 2.5rem; } /* 37.5px */
}

/* Mobile (768px and below) */
@media (max-width: 768px) {
  html { font-size: 14px; }
  h1 { font-size: 2rem; } /* 28px */
}

/* Small Mobile (480px and below) */
@media (max-width: 480px) {
  html { font-size: 13px; }
  h1 { font-size: 1.5rem; } /* 19.5px */
}
```

### Component Responsiveness

All major components have been updated:

#### Navbar
- ✅ Logo scales from 1.5rem (desktop) to 1rem (mobile)
- ✅ Header height adjusts: 80px → 70px → 60px
- ✅ Drawer width: 300px (desktop) → 80vw max-width (mobile)
- ✅ Hamburger menu appears at 1024px breakpoint

#### Footer
- ✅ Padding: 4rem (desktop) → 1.5rem (mobile)
- ✅ Footer columns stack vertically on tablets/mobile
- ✅ Text center alignment on mobile
- ✅ Social buttons responsive size: 45px → 40px
- ✅ Contact item borders adapt (vertical left border → horizontal bottom border)

#### Global Layout
- ✅ Grid layouts: 4 columns → 2 columns → 1 column
- ✅ Container max-widths: 1200px → 960px → 100%
- ✅ Padding scales: 20px → 15px → 10px

---

## 3. Responsive Utilities CSS

Located in: `src/styles/responsive.css`

Ready-to-use utility classes for common responsive patterns.

### Visibility Utilities

```html
<!-- Hide on mobile (≤768px) -->
<div class="hide-mobile">Only on tablet/desktop</div>

<!-- Hide on tablet (≤1024px) -->
<div class="hide-tablet">Only on desktop</div>

<!-- Hide on desktop (>1024px) -->
<div class="hide-desktop">Only on tablet/mobile</div>

<!-- Show only on mobile -->
<div class="show-mobile">Only on mobile</div>

<!-- Show only on desktop -->
<div class="show-desktop">Only on desktop</div>
```

### Spacing Utilities

```html
<!-- Responsive horizontal padding -->
<div class="px-responsive">
  <!-- 2rem on desktop, 1rem on tablet, 0.75rem on mobile -->
</div>

<!-- Responsive vertical padding -->
<div class="py-responsive">
  <!-- 3rem on desktop, 2rem on tablet, 1.5rem on mobile -->
</div>

<!-- Responsive margin -->
<div class="mx-responsive">Horizontal margin</div>
<div class="my-responsive">Vertical margin</div>
```

### Text Size Utilities

```html
<!-- Large responsive text -->
<h1 class="text-responsive-lg">
  <!-- 3rem → 2.5rem → 2rem → 1.5rem -->
</h1>

<!-- Medium responsive text -->
<p class="text-responsive-md">
  <!-- 2rem → 1.75rem → 1.5rem → 1.15rem -->
</p>

<!-- Small responsive text -->
<span class="text-responsive-sm">
  <!-- 1rem → 0.95rem → 0.85rem -->
</span>
```

### Layout Utilities

```html
<!-- Responsive flex (columns on mobile) -->
<div class="flex-responsive">
  <!-- flex-direction: row on desktop, column on mobile -->
</div>

<!-- Stack layout on mobile -->
<div class="stack-mobile">
  <!-- Auto-fit grid that stacks on mobile -->
</div>

<!-- Responsive gap -->
<div class="grid gap-responsive">
  <!-- 2rem → 1.5rem → 1rem → 0.75rem -->
</div>
```

### Aspect Ratio

```html
<!-- 16:9 aspect ratio -->
<div class="aspect-video">
  <video src="..."></video>
</div>

<!-- 1:1 aspect ratio -->
<div class="aspect-square">
  <img src="..." />
</div>
```

---

## 4. Implementation Guide

### Using the Responsive Hook in Components

```jsx
import { useResponsive } from '@/animations/hooks/useResponsive';

export function MyComponent() {
  const { isMobile, isTablet, isDesktop, windowWidth } = useResponsive();

  return (
    <>
      {isMobile && (
        <div>
          <h1>Mobile Layout</h1>
          {/* Mobile-specific content */}
        </div>
      )}
      
      {isDesktop && (
        <div>
          <h1>Desktop Layout</h1>
          {/* Desktop-specific content */}
        </div>
      )}

      {/* Show window width in debug */}
      <p>Width: {windowWidth}px</p>
    </>
  );
}
```

### Adding Responsive Styles to CSS Modules

```css
/* src/components/MyComponent/MyComponent.module.css */

.container {
  padding: 2rem;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .container {
    padding: 1.5rem;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}
```

### Using Responsive Utilities

```html
<!-- Hide navigation on mobile -->
<nav class="hide-mobile">
  <a href="#home">Home</a>
  <a href="#about">About</a>
</nav>

<!-- Show hamburger menu only on mobile -->
<button class="show-mobile hamburger">
  ☰
</button>

<!-- Responsive padding container -->
<div class="container px-responsive py-responsive">
  <!-- Content here -->
</div>

<!-- Responsive text -->
<h1 class="text-responsive-lg">Welcome to MAYAVERSE</h1>
```

---

## 5. Testing Responsive Design

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Click the device toggle icon (Ctrl+Shift+M)
3. Test designs at these widths:
   - **480px** - Mobile
   - **768px** - Tablet
   - **1024px** - Desktop
   - **1280px** - Widescreen

### Responsive Breakpoints to Test

```
480px   → Mobile phone
768px   → Tablet (landscape iPad)
1024px  → Desktop
1280px  → Large desktop
1536px  → Ultra-wide desktop
```

### Key Areas to Test

- ✅ Navigation menu (hamburger vs full menu)
- ✅ Text readability (font sizes)
- ✅ Touch targets (buttons, links - min 44px)
- ✅ Image scaling
- ✅ Layout reflow (columns → stacking)
- ✅ Touch keyboard overlap
- ✅ Safe area insets (notched devices)

---

## 6. Best Practices

### Do's ✅

- ✅ Use the `useResponsive` hook for component-level responsive logic
- ✅ Apply responsive utilities CSS for common patterns
- ✅ Test on actual devices when possible
- ✅ Use max-width containers to limit content width
- ✅ Optimize images for different sizes
- ✅ Use CSS Grid with `auto-fit`/`auto-fill` for flexible layouts
- ✅ Prioritize mobile-first design approach

### Don'ts ❌

- ❌ Don't hardcode fixed widths (use percentages or flex)
- ❌ Don't forget to test on mobile devices
- ❌ Don't use viewport units (100vw, 100vh) for full screen elements
- ❌ Don't ignore safe area insets on notched devices
- ❌ Don't make touch targets smaller than 44x44px
- ❌ Don't use component-specific media queries (use global breakpoints)

---

## 7. File References

### New/Updated Files

| File | Purpose |
|------|---------|
| `src/animations/hooks/useResponsive.js` | Custom responsive hook |
| `src/styles/responsive.css` | Responsive utility classes |
| `src/styles/global.css` | Updated with responsive typography |
| `src/components/common/Navbar/Navbar.module.css` | Enhanced responsive navbar |
| `src/components/common/Footer/Footer.module.css` | Enhanced responsive footer |
| `src/components/common/Navbar/Navbar.jsx` | Integration of useResponsive |

### Import Statement

```javascript
// In main.jsx
import './styles/responsive.css';
```

---

## 8. Future Enhancements

- [ ] Add responsive image optimization
- [ ] Implement CSS custom properties for breakpoints
- [ ] Add touch gesture detection
- [ ] Create responsive component library
- [ ] Add fluid typography sizing
- [ ] Implement container queries
- [ ] Add performance monitoring for responsive layouts

---

## 9. Support & Troubleshooting

### Issue: Styles not applying on mobile

**Solution:** Check browser cache
```bash
# Hard refresh (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
```

### Issue: Hook not detecting screen changes

**Solution:** Verify hook import
```javascript
import { useResponsive } from '../animations/hooks/useResponsive';
```

### Issue: Media queries not working

**Solution:** Check viewport meta tag in HTML
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## Quick Reference

```javascript
// Import hook
import { useResponsive } from '@/animations/hooks/useResponsive';

// Use in component
const { isMobile, isTablet, isDesktop } = useResponsive();

// Common patterns
if (isMobile) { /* mobile layout */ }
if (isDesktop) { /* desktop layout */ }

// Utility classes
class="hide-mobile"      // Hide on mobile
class="show-mobile"      // Show only on mobile
class="px-responsive"    // Responsive padding
class="text-responsive-lg" // Responsive text size
```

---

**Last Updated:** February 2026  
**Author:** GitHub Copilot  
**Version:** 1.0
