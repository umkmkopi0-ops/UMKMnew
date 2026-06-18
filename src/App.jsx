/**
 * App.jsx — Root application shell.
 *
 * Responsibilities:
 *  - Language state management (EN / ID toggle)
 *  - Mobile menu open/close state
 *  - Renders shared layout: Navbar → Routes → Footer
 *  - Wraps everything in BrowserRouter
 *
 * All heavy UI is delegated to child components:
 *  @see components/Navbar.jsx
 *  @see components/MobileMenu.jsx
 *  @see components/Footer.jsx
 *  @see pages/Home.jsx
 *  @see pages/Explore.jsx
 */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { locales } from './locales';

/* ── Layout components ── */
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';

/* ── Page components ── */
import Home from './pages/Home';
import Explore from './pages/Explore';

/* ─────────────────────────────────────────────────────────
 * AppInner
 * Lives inside <BrowserRouter> so child components can
 * safely use hooks like useNavigate / useLocation.
 * ───────────────────────────────────────────────────────── */
function AppInner() {
  /* ── State ── */
  const [lang, setLang] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ── Handlers ── */
  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  /* ── Current locale ── */
  const t = locales[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-stone-300 font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* ── Navbar ── */}
      <Navbar
        t={t}
        toggleLang={toggleLang}
        openMobileMenu={openMobileMenu}
        closeMenu={closeMenu}
      />

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            t={t}
            lang={lang}
            closeMenu={closeMenu}
            toggleLang={toggleLang}
          />
        )}
      </AnimatePresence>

      {/* ── Page routes ── */}
      <Routes>
        <Route path="/" element={<Home t={t} lang={lang} />} />
        <Route path="/explore" element={<Explore t={t} lang={lang} />} />
      </Routes>

      {/* ── Footer ── */}
      <Footer t={t} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
 * App (default export)
 * Wraps AppInner in BrowserRouter at the top level.
 * ───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}