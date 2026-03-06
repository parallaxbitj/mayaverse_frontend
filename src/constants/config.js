/**
 * MAYAVERSE - Configuration Constants
 * 
 * This file contains all constant values used throughout the application.
 * Modify these values to customize your techfest settings.
 */

// Application Info
export const APP_NAME = 'MAYAVERSE';
export const APP_TAGLINE = 'The Ultimate Technical Fest Experience';
export const APP_VERSION = '1.0.0';

// API Configuration (for future backend integration)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 10000; // 10 seconds

// Authentication
export const AUTH_TOKEN_KEY = 'mayaverse_auth_token';
export const USER_DATA_KEY = 'mayaverse_user_data';
export const SESSION_TIMEOUT = 3600000; // 1 hour in milliseconds

// Routes - Public
export const ROUTES = {
  // Public Routes
  HOME: '/home',
  ABOUT: '/about',
  EVENTS: '/events',
  GALLERY: '/gallery',
  SPONSORS: '/sponsors',
  MERCHANDISE: '/merchandise',
  TEAM: '/team',

  // Auth Routes
  LOGIN: '/login',
  SIGNUP: '/signup',

  // User Routes
  USER_PROFILE: '/user/profile',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
};

// Event Categories
export const EVENT_CATEGORIES = {
  TECHNICAL: 'Technical',
  CULTURAL: 'Cultural',
  WORKSHOP: 'Workshop',
  COMPETITION: 'Competition',
  GAMING: 'Gaming',
};

// Event Status
export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Merchandise Categories
export const MERCH_CATEGORIES = {
  CLOTHING: 'Clothing',
  ACCESSORIES: 'Accessories',
  TECH: 'Tech Gear',
  COLLECTIBLES: 'Collectibles',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// File Upload (for future use)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Social Media Links (customize these)
export const SOCIAL_LINKS = {
  FACEBOOK: '#',
  TWITTER: '#',
  INSTAGRAM: 'https://www.instagram.com/techvibesbit?igsh=dDhudDY2Mmc3NW9k',
  LINKEDIN: 'https://www.linkedin.com/company/techvibesbit/',
  YOUTUBE: '#',
};

// Contact Info (customize these)
export const CONTACT_INFO = {
  EMAIL: 'contact@mayaverse.com',
  PHONE: '+91 97733 52111', // Varun Tyagi Sir
  ADDRESS: 'Mayaverse HQ',
  TEAM: [
    { NAME: 'Varun Tyagi Sir', PHONE: '+91 97733 52111' },
    { NAME: 'Vansh Sir', PHONE: '+91 81144 82258' }
  ]
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
};

// Date Formats
export const DATE_FORMAT = 'MMM DD, YYYY';
export const DATETIME_FORMAT = 'MMM DD, YYYY HH:mm';

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  LOGOUT: 'Successfully logged out!',
  SIGNUP: 'Account created successfully!',
  EVENT_REGISTER: 'Successfully registered for event!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  LOGIN_FAILED: 'Invalid email or password.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

export default {
  APP_NAME,
  APP_TAGLINE,
  APP_VERSION,
  API_BASE_URL,
  ROUTES,
  EVENT_CATEGORIES,
  SOCIAL_LINKS,
  CONTACT_INFO,
};