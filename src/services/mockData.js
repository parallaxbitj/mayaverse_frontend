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
    title: 'Tech Escape',
    description: 'Tech Escape Room is an immersive challenge where teams solve technical, logical, and programming puzzles to "escape" within a limited time. Participants must decode clues, unlock passwords, and progress through multiple stages to reach the final solution.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-15',
    time: '10:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/techx.png', import.meta.url).href,
    organizer: 'Tech Committee',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Team based event', 'Solve puzzles to progress'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '2',
    title: 'Circuit Debugging',
    description: 'The Circuit Debugging Challenge tests participants\' ability to analyze and troubleshoot electrical and electronic circuits. It focuses on applying practical knowledge and logical thinking to identify issues in circuit designs.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-15',
    time: '11:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/debugging .jpeg', import.meta.url).href,
    organizer: 'Electronics Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Individual participation', 'Identify faults in circuits'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '3',
    title: 'Rapid Keys',
    description: 'Rapid Keys is a fast-paced typing competition that tests participants\' speed, accuracy, and concentration. It challenges students to showcase their keyboard proficiency by typing given passages within a limited time.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-15',
    time: '12:00 PM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/rapidkeys.png', import.meta.url).href,
    organizer: 'Computing Society',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Solo event', 'Highest WPM wins'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '4',
    title: 'Robo Soccer',
    description: 'RoboSoccer is a robotics competition where participants control manually operated robots in a fast-paced 1 vs 1 football-style match. The goal is to maneuver the robot, control the ball, and score against the opponent.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-16',
    time: '10:00 AM',
    venue: 'Arena',
    registrationFee: 0,
    maxParticipants: 50,
    currentParticipants: 0,
    image: new URL('../assets/images/events/robosoc.jpeg', import.meta.url).href,
    organizer: 'Robotics Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['1 vs 1 format', 'Manual control only'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '5',
    title: 'Brand Wars',
    description: 'Brand Wars is a dynamic marketing competition where teams create and promote a brand in real time. Participants must use creativity, strategy, and communication skills to present a strong brand identity.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-16',
    time: '11:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 80,
    currentParticipants: 0,
    image: new URL('../assets/images/events/brandwars.png', import.meta.url).href,
    organizer: 'Marketing Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Team event', 'Pitch and defend your brand'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '7',
    title: 'Techno Quiz',
    description: 'Techno Quiz – Myth or Fact in Tech is an interactive live quiz that tests participants\' awareness of common myths and facts related to technology. Conducted through the Kahoot platform.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-17',
    time: '10:00 AM',
    venue: 'Online/Hall',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/technoquiz.png', import.meta.url).href,
    organizer: 'Quiz Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Real-time leaderboard', 'Fastest finger first'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '8',
    title: 'AD Making',
    description: 'Ad Making is a creative competition where teams design innovative advertisements for a given brand or product. Participants must use storytelling, creativity, and marketing ideas.',
    category: EVENT_CATEGORIES.CULTURAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-17',
    time: '11:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 80,
    currentParticipants: 0,
    image: new URL('../assets/images/events/admaking.png', import.meta.url).href,
    organizer: 'Creative Society',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Team event', 'Original concepts only'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '9',
    title: 'Filmaura',
    description: 'Filmaura is a creative filmmaking event where participants produce short films based on a given theme. The event encourages storytelling, imagination, and cinematic expression.',
    category: EVENT_CATEGORIES.CULTURAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-17',
    time: '02:00 PM',
    venue: 'Screening Room',
    registrationFee: 0,
    maxParticipants: 50,
    currentParticipants: 0,
    image: new URL('../assets/images/events/filmaura.jpeg', import.meta.url).href,
    organizer: 'Movie Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Theme based', 'Minimum 3 minutes long'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '11',
    title: 'HACKATHON',
    description: 'Kurukshetra is a high-intensity battleground for rapid innovation where teams compete to design and build functional solutions within a strict time limit.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-18',
    time: '09:00 AM',
    venue: 'Innovation Lab',
    registrationFee: 0,
    maxParticipants: 150,
    currentParticipants: 0,
    image: new URL('../assets/images/events/gdghackathon.jpeg', import.meta.url).href,
    organizer: 'Tech Committee',
    prizes: ['Grand Prize', 'Certificates'],
    rules: ['Team event', '24 hours sprint'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '12',
    title: 'CODE WARS',
    description: 'Unleash your inner innovator as you debug circuits, solve challenging puzzles, and track down hidden errors to restore the power. This high-voltage tech challenge pushes participants to sharpen their problem-solving skills.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-19',
    time: '10:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/codewars.png', import.meta.url).href,
    organizer: 'Computing Society',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Problem solving', 'Logical thinking'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '13',
    title: 'AI PROMPT BATTLE',
    description: 'PromptCraft is a high-intensity AI Sprint Hackathon where participants build a meaningful AI-powered MVP using a single, well-crafted prompt on the sponsor\'s platform.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-19',
    time: '11:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 80,
    currentParticipants: 0,
    image: new URL('../assets/images/events/aipromptbattle.png', import.meta.url).href,
    organizer: 'AI Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Single prompt challenge', 'MVP generation'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '14',
    title: 'STOCK STORM',
    description: 'StockStorm is a fast-paced stock market simulation where participants step into the role of investors and compete in a dynamic virtual trading environment.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-19',
    time: '02:00 PM',
    venue: 'Finance Lab',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/stockstrom.jpeg', import.meta.url).href,
    organizer: 'Finance Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Virtual trading', 'Market news response'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '15',
    title: 'AUCTION LEAGUE',
    description: 'Auction League is a strategy-based event inspired by the IPL auction where teams act as franchise owners and bid for players to build the strongest squad.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-20',
    time: '10:00 AM',
    venue: 'Main Hall',
    registrationFee: 0,
    maxParticipants: 50,
    currentParticipants: 0,
    image: new URL('../assets/images/events/auctionleague.png', import.meta.url).href,
    organizer: 'Sports Committee',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Budget management', 'Squad rating evaluation'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '16',
    title: 'MOCK PARLIAMENT',
    description: 'Mock Parliament is a platform for critical thinking, collaboration, and persuasive debate where participants engage with real-world issues.',
    category: EVENT_CATEGORIES.CULTURAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-20',
    time: '11:00 AM',
    venue: 'Council Chamber',
    registrationFee: 0,
    maxParticipants: 100,
    currentParticipants: 0,
    image: new URL('../assets/images/events/mockparliament.jpeg', import.meta.url).href,
    organizer: 'Debate Society',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Parliamentary format', 'Structured debates'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '17',
    title: 'TREASURE HUNT',
    description: 'Enter a magical world where logic meets adventure in this Hogwarts-themed Treasure Hunt. Teams explore the campus while solving technical puzzles.',
    category: EVENT_CATEGORIES.COMPETITION,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-20',
    time: '02:00 PM',
    venue: 'Campus-wide',
    registrationFee: 0,
    maxParticipants: 200,
    currentParticipants: 0,
    image: new URL('../assets/images/events/t hunt.jpeg', import.meta.url).href,
    organizer: 'Entertainment Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Team based', 'Decode clues'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '19',
    title: 'DECODE THE SCAM',
    description: 'Step into Decode the Scam, a fast-paced mystery challenge where teams investigate clues, financial trails, and hidden twists to uncover a high-stakes corporate fraud.',
    category: EVENT_CATEGORIES.TECHNICAL,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-21',
    time: '11:00 AM',
    venue: 'TBD',
    registrationFee: 0,
    maxParticipants: 80,
    currentParticipants: 0,
    image: new URL('../assets/images/events/decodethescam.png', import.meta.url).href,
    organizer: 'Cyber Security Club',
    prizes: ['Certificates', 'Goodies'],
    rules: ['Investigation skills', 'Evidence analysis'],
    googleFormUrl: 'https://forms.gle/Rum61AswAjc58qzy8',
  },
  {
    id: '20',
    title: 'GAMING ARENA',
    description: 'Gaming Arena is a competitive e-sports event where players compete in popular titles such as Valorant, BGMI, and FIFA through a structured tournament format.',
    category: EVENT_CATEGORIES.GAMING,
    status: EVENT_STATUS.UPCOMING,
    date: '2026-03-21',
    time: '02:00 PM',
    venue: 'E-Sports Lab',
    registrationFee: 0,
    maxParticipants: 128,
    currentParticipants: 0,
    image: new URL('../assets/images/events/gamingevent.jpeg', import.meta.url).href,
    organizer: 'Gaming Club',
    prizes: ['Cash Prizes', 'Certificates'],
    rules: ['Tournament format', 'Fair play rules'],
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
    tagline: 'Official PARALLAX Limited Edition',
    description: 'Official PARALLAX tech-fest tee. Limited edition design, premium quality 100% cotton.',
    category: MERCH_CATEGORIES.CLOTHING,
    price: 599,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'PARALLAX Hoodie',
    tagline: 'Cyber-Comfort for the Rift',
    description: 'High-quality oversized hoodie with neon PARALLAX branding. Perfect for long coding sessions.',
    category: MERCH_CATEGORIES.CLOTHING,
    price: 1299,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Tech Cap',
    tagline: 'Minimalist Stealth Design',
    description: 'Premium adjustable cap with embroidered MAYAVERSE logo. A must-have for every tech enthusiast.',
    category: MERCH_CATEGORIES.ACCESSORIES,
    price: 399,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
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

// Admin functions removed as per user request
