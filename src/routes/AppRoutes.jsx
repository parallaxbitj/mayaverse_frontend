import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/config';

// Layouts
import PublicLayout from '../layouts/PublicLayout/PublicLayout';

// Public Pages
import Home from '../pages/public/Home/Home';
import About from '../pages/public/About/About';
import Events from '../pages/public/Events/Events';
import Sponsors from '../pages/public/Sponsors/Sponsors';
import Merchandise from '../pages/public/Merchandise/Merchandise';
import Gallery from '../pages/public/Gallery/Gallery';
import Team from '../pages/public/Team/Team';

// Auth Pages
import Login from '../pages/user/Login/Login';
import Signup from '../pages/user/Signup/Signup';

// User Pages
import UserProfile from '../pages/user/UserProfile/UserProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.EVENTS} element={<Events />} />
        <Route path={ROUTES.GALLERY} element={<Gallery />} />
        <Route path={ROUTES.SPONSORS} element={<Sponsors />} />
        <Route path={ROUTES.MERCHANDISE} element={<Merchandise />} />
        <Route path={ROUTES.TEAM} element={<Team />} />

        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />

        {/* User Routes */}
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />

        {/* 404 — redirect to home */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;