/**
 * MAYAVERSE - Mock Data Service
 * 
 * This file contains mock data for development.
 * Replace these functions with actual API calls when backend is ready.
 * 
 * All functions return Promises to simulate async API calls.
 */

import { generateId } from '../utils/helpers';

import { EVENT_CATEGORIES, EVENT_STATUS, MERCH_CATEGORIES, ORDER_STATUS, USER_ROLES } from '../constants/config';

// ==================== MOCK DATA ====================

// Mock Users
export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@mayaverse.com',
    password: 'admin123', // In production, passwords should be hashed
    role: USER_ROLES.ADMIN,
    phone: '+1234567890',
    college: 'Admin College',
    registeredEvents: [],
    orders: [],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@mayaverse.com',
    password: 'user123',
    role: USER_ROLES.USER,
    phone: '+1234567891',
    college: 'Tech University',
    registeredEvents: ['1', '3'],
    orders: ['1'],
    createdAt: '2024-01-15',
  },
];

// Mock Events
export const mockEvents = [
  {
    id: '1',
    title: 'Code Combat',
    description: 'Competitive programming competition where teams solve algorithmic challenges.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-15',
    time: '10:00 AM',
    venue: 'Main Auditorium',
    registrationFee: 500,
    maxParticipants: 100,
    currentParticipants: 45,
    image: '/assets/images/events/code-combat.jpg',
    organizer: 'Tech Club',
    prizes: ['₹50,000', '₹30,000', '₹20,000'],
    rules: [
      'Team size: 2-3 members',
      'Laptops required',
      'Duration: 3 hours',
    ],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',

  },
  {
    id: '2',
    title: 'Robo Wars',
    description: 'Battle of the bots! Build and compete with your custom robot.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-16',
    time: '02:00 PM',
    venue: 'Sports Ground',
    registrationFee: 1000,
    maxParticipants: 50,
    currentParticipants: 30,
    image: '/assets/images/events/robo-wars.jpg',
    organizer: 'Robotics Club',
    prizes: ['₹75,000', '₹45,000', '₹30,000'],
    rules: [
      'Weight limit: 50kg',
      'No projectile weapons',
      'Safety gear mandatory',
    ],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',

  },
  {
    id: '3',
    title: 'Web Design Workshop',
    description: 'Learn modern web design techniques from industry experts.',
    category: EVENT_CATEGORIES.WORKSHOP,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-14',
    time: '11:00 AM',
    venue: 'Workshop Hall',
    registrationFee: 300,
    maxParticipants: 80,
    currentParticipants: 60,
    image: '/assets/images/events/workshop.jpg',
    organizer: 'Design Team',
    prizes: [],
    rules: [
      'Bring your laptop',
      'Basic HTML/CSS knowledge required',
    ],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',

  },
  {
    id: '4',
    title: 'Cultural Night',
    description: 'Showcase your talent in music, dance, and drama!',
    category: EVENT_CATEGORIES.CULTURAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-17',
    time: '06:00 PM',
    venue: 'Open Air Theatre',
    registrationFee: 200,
    maxParticipants: 200,
    currentParticipants: 120,
    image: '/assets/images/events/cultural.jpg',
    organizer: 'Cultural Committee',
    prizes: ['₹25,000', '₹15,000', '₹10,000'],
    rules: [
      'Solo or group performance',
      'Max duration: 10 minutes',
    ],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',

  },
  {
    id: '5',
    title: 'Gaming Tournament',
    description: 'E-sports tournament featuring popular games.',
    category: EVENT_CATEGORIES.GAMING,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-18',
    time: '12:00 PM',
    venue: 'Gaming Arena',
    registrationFee: 400,
    maxParticipants: 64,
    currentParticipants: 50,
    image: '/assets/images/events/gaming.jpg',
    organizer: 'Gaming Club',
    prizes: ['₹40,000', '₹25,000', '₹15,000'],
    rules: [
      'Games: CS:GO, Valorant',
      'Team size: 5 members',
    ],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',

  },
  {
    id: '6',
    title: 'Hackathon 2026',
    description: '24-hour coding marathon to build innovative solutions.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-19',
    time: '09:00 AM',
    venue: 'Innovation Center',
    registrationFee: 800,
    maxParticipants: 120,
    currentParticipants: 95,
    image: '/assets/images/events/hackathon.jpg',
    organizer: 'Tech Committee',
    prizes: ['₹100,000', '₹60,000', '₹40,000'],
    rules: [
      'Team size: 3-5 members',
      'Theme will be announced',
      '24 hours duration',
    ],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',

  },
];

// Mock Sponsors
export const mockSponsors = [
  {
    id: '1',
    name: 'TechCorp',
    logo: '/assets/images/sponsors/techcorp.png',
    tier: 'Platinum',
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider',
  },
  {
    id: '2',
    name: 'InnovateLabs',
    logo: '/assets/images/sponsors/innovate.png',
    tier: 'Gold',
    website: 'https://innovatelabs.com',
    description: 'Innovation and research company',
  },
  {
    id: '3',
    name: 'StartupHub',
    logo: '/assets/images/sponsors/startup.png',
    tier: 'Silver',
    website: 'https://startuphub.com',
    description: 'Startup incubation platform',
  },
  {
    id: '4',
    name: 'CodeMasters',
    logo: '/assets/images/sponsors/code.png',
    tier: 'Bronze',
    website: 'https://codemasters.com',
    description: 'Coding education platform',
  },
];

// Mock Merchandise — only the T-Shirt for now
export const mockMerchandise = [
  {
    id: '1',
    name: 'MAYAVERSE T-Shirt',
    description: 'Official PARALLAX tech-fest tee. Limited edition design, premium quality 100% cotton.',
    category: MERCH_CATEGORIES.CLOTHING,
    price: 599,
    stock: 150,
    image: '/assets/images/merch/tshirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy'],
  },
];

// Mock Orders
export const mockOrders = [
  {
    id: '1',
    userId: '2',
    items: [
      { productId: '1', name: 'MAYAVERSE T-Shirt', quantity: 2, price: 599, size: 'L', color: 'Black' },
      { productId: '3', name: 'MAYAVERSE Cap', quantity: 1, price: 399, size: 'One Size', color: 'Black' },
    ],
    total: 1597,
    status: ORDER_STATUS.PROCESSING,
    orderDate: '2026-02-01',
    shippingAddress: '123 Main St, City, State 12345',
  },
];

// ==================== API FUNCTIONS ====================

import emailjs from '@emailjs/browser';

// Mock OTP storage
const otpStore = new Map();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Authentication
 */
export const sendOTP = async (email) => {
  await delay(800);
  const otp = generateOTP();
  otpStore.set(email.toLowerCase(), otp);

  console.log(`[SECRET] Verification code sent to ${email}`);

  // Get EmailJS credentials from env (or fall back to placeholders for user to fill)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

  // Early exit if keys are missing from .env
  if (serviceId === 'your_service_id' || publicKey === 'your_public_key' || !serviceId || !publicKey) {
    console.warn(`EmailJS keys missing in .env. Falling back to Dev Mode. YOUR OTP IS: ${otp}`);
    return {
      success: true,
      message: 'Verification code sent (Dev Mode)'
    };
  }

  // Initialize EmailJS with Public Key
  emailjs.init(publicKey);

  try {
    // Send real email via EmailJS with Every Possible Key for maximum compatibility
    const templateParams = {
      to_email: email.trim(),        // Recipient Key 1
      user_email: email.trim(),      // Recipient Key 2
      email: email.trim(),           // Recipient Key 3
      to: email.trim(),              // Recipient Key 4
      to_name: 'User',               // Standard Name
      otp: otp,                      // OTP Key 1 (Primary)
      passcode: otp,                 // OTP Key 2
      code: otp,                     // OTP Key 3
      verification_code: otp,        // OTP Key 4
      app_name: 'PARALLAX 2026',
    };

    console.log('%c Sending Real OTP via EmailJS...', 'color: #00f2fe; font-weight: bold;');
    console.table({
      serviceID: serviceId,
      templateID: templateId,
      recipient: email,
      otp_code: otp // Logged here as a fallback for the developer
    });

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('%c EmailJS Status: OK', 'color: #4dff88; font-weight: bold;', response.status, response.text);
    return { success: true, message: 'Authentic OTP sent to your email' };
  } catch (error) {
    console.error('%c Email Delivery Error Detail:', 'color: #ff4d4d; font-weight: bold;', error);

    // Check for the specific "Empty Recipient" error
    if (error.text?.includes('recipients address is empty') || error.status === 422) {
      console.error('CRITICAL: Check your EmailJS Dashboard -> Template -> Settings -> "To Email" field. It MUST contain exactly {{to_email}}');
    }

    throw new Error(`Email Delivery Failed: ${error.text || error.message || 'Check EmailJS Dashboard'}`);
  }
};

export const verifyOTP = async (email, otp) => {
  await delay(800);
  const storedOtp = otpStore.get(email.toLowerCase());
  if (storedOtp === otp) {
    return { success: true };
  }
  throw new Error('Invalid OTP code');
};

export const login = async (email, password, otp = null) => {
  await delay(500);

  const isBIT = email.toLowerCase().endsWith('@bitmesra.ac.in');

  if (!isBIT && otp) {
    // OTP path for non-BIT
    const storedOtp = otpStore.get(email.toLowerCase());
    if (storedOtp !== otp) throw new Error('Invalid OTP');

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    throw new Error('User not found. Please sign up first.');
  }

  // Legacy/Admin password path
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }
  throw new Error('Invalid email or password');
};

export const googleLogin = async (email) => {
  await delay(1000);
  // For mock purposes, if it's the BIT domain, we "auto-generate" or find the user
  const existingUser = mockUsers.find(u => u.email === email);

  if (existingUser) {
    const { password: _, ...userWithoutPassword } = existingUser;
    return { success: true, user: userWithoutPassword };
  } else {
    // Create a new user automatically for BIT domain
    const newUser = {
      id: generateId(),
      name: email.split('.')[0].toUpperCase(), // Mock name from email
      email: email,
      role: USER_ROLES.USER,
      phone: '',
      college: 'BIT Mesra',
      registeredEvents: [],
      orders: [],
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return { success: true, user: newUser };
  }
};

export const signup = async (userData, otp) => {
  await delay(500);

  const isBIT = userData.email.toLowerCase().endsWith('@bitmesra.ac.in');

  if (!isBIT) {
    const storedOtp = otpStore.get(userData.email.toLowerCase());
    if (storedOtp !== otp) throw new Error('Invalid OTP');
  }

  const existingUser = mockUsers.find(u => u.email === userData.email);

  if (existingUser) {
    throw new Error('Email already registered');
  } else {
    const newUser = {
      id: generateId(),
      ...userData,
      role: USER_ROLES.USER,
      registeredEvents: [],
      orders: [],
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  }
};

/**
 * Events
 */
export const getEvents = async (filters = {}) => {
  return new Promise((resolve) => {
    const filteredEvents = [...mockEvents].filter(e => {
      if (filters.category && e.category !== filters.category) return false;
      if (filters.status && e.status !== filters.status) return false;
      return true;
    });
    resolve({ success: true, events: filteredEvents });
  });
};

export const getEventById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.id === id);

      if (event) {
        resolve({ success: true, event });
      } else {
        reject({ success: false, message: 'Event not found' });
      }
    }, 300);
  });
};

export const registerForEvent = async (userId, eventId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      const event = mockEvents.find(e => e.id === eventId);

      if (!user || !event) {
        reject({ success: false, message: 'User or event not found' });
        return;
      }

      if (user.registeredEvents.includes(eventId)) {
        reject({ success: false, message: 'Already registered for this event' });
        return;
      }

      user.registeredEvents.push(eventId);
      event.currentParticipants += 1;

      resolve({ success: true, message: 'Successfully registered for event' });
    }, 500);
  });
};

/**
 * Sponsors
 */
export const getSponsors = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, sponsors: mockSponsors });
    }, 300);
  });
};

/**
 * Merchandise
 */
export const getMerchandise = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMerch = [...mockMerchandise];

      if (filters.category) {
        filteredMerch = filteredMerch.filter(m => m.category === filters.category);
      }

      resolve({ success: true, merchandise: filteredMerch });
    }, 300);
  });
};

export const getMerchandiseById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = mockMerchandise.find(m => m.id === id);

      if (item) {
        resolve({ success: true, item });
      } else {
        reject({ success: false, message: 'Item not found' });
      }
    }, 300);
  });
};

export const placeOrder = async (userId, orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        id: generateId(),
        userId,
        ...orderData,
        status: ORDER_STATUS.PENDING,
        orderDate: new Date().toISOString(),
      };

      mockOrders.push(newOrder);

      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        user.orders.push(newOrder.id);
      }

      resolve({ success: true, order: newOrder });
    }, 500);
  });
};

/**
 * User Profile
 */
export const getUserProfile = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);

      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve({ success: true, user: userWithoutPassword });
      } else {
        reject({ success: false, message: 'User not found' });
      }
    }, 300);
  });
};

export const updateUserProfile = async (userId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);

      if (user) {
        Object.assign(user, updates);
        const { password, ...userWithoutPassword } = user;
        resolve({ success: true, user: userWithoutPassword });
      } else {
        reject({ success: false, message: 'User not found' });
      }
    }, 500);
  });
};

export const getUserOrders = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = mockOrders.filter(o => o.userId === userId);
      resolve({ success: true, orders });
    }, 300);
  });
};

/**
 * Admin Functions
 */
export const getAllUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usersWithoutPasswords = mockUsers.map(({ password, ...user }) => user);
      resolve({ success: true, users: usersWithoutPasswords });
    }, 300);
  });
};

export const createEvent = async (eventData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent = {
        id: generateId(),
        ...eventData,
        currentParticipants: 0,
      };

      mockEvents.push(newEvent);
      resolve({ success: true, event: newEvent });
    }, 500);
  });
};

export const updateEvent = async (eventId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.id === eventId);

      if (event) {
        Object.assign(event, updates);
        resolve({ success: true, event });
      } else {
        reject({ success: false, message: 'Event not found' });
      }
    }, 500);
  });
};

export const deleteEvent = async (eventId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockEvents.findIndex(e => e.id === eventId);
      if (index > -1) {
        mockEvents.splice(index, 1);
      }
      resolve({ success: true });
    }, 500);
  });
};

// Similar CRUD operations for sponsors and merchandise
export const createSponsor = async (sponsorData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSponsor = { id: generateId(), ...sponsorData };
      mockSponsors.push(newSponsor);
      resolve({ success: true, sponsor: newSponsor });
    }, 500);
  });
};

export const updateSponsor = async (sponsorId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sponsor = mockSponsors.find(s => s.id === sponsorId);
      if (sponsor) {
        Object.assign(sponsor, updates);
        resolve({ success: true, sponsor });
      } else {
        reject({ success: false, message: 'Sponsor not found' });
      }
    }, 500);
  });
};

export const deleteSponsor = async (sponsorId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockSponsors.findIndex(s => s.id === sponsorId);
      if (index > -1) {
        mockSponsors.splice(index, 1);
      }
      resolve({ success: true });
    }, 500);
  });
};

export const createMerchandise = async (merchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMerch = { id: generateId(), ...merchData };
      mockMerchandise.push(newMerch);
      resolve({ success: true, item: newMerch });
    }, 500);
  });
};

export const updateMerchandise = async (merchId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const merch = mockMerchandise.find(m => m.id === merchId);
      if (merch) {
        Object.assign(merch, updates);
        resolve({ success: true, item: merch });
      } else {
        reject({ success: false, message: 'Merchandise not found' });
      }
    }, 500);
  });
};

export const deleteMerchandise = async (merchId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockMerchandise.findIndex(m => m.id === merchId);
      if (index > -1) {
        mockMerchandise.splice(index, 1);
      }
      resolve({ success: true });
    }, 500);
  });
};