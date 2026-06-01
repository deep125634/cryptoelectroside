import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Products from './components/Products.jsx';
import CatalogViewer from './components/CatalogViewer.jsx';
import Certifications from './components/Certifications.jsx';
import Clients from './components/Clients.jsx';
import Contact from './components/Contact.jsx';
import SocialDropdown from './components/SocialDropdown.jsx';
import Chatbot from './components/Chatbot.jsx';
import ContactPopup from './components/ContactPopup.jsx';

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup  = useCallback(() => setPopupOpen(true),  []);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  // Auto-open popup after 5 s — only once per browser session
  useEffect(() => {
    if (sessionStorage.getItem('popupShown')) return;
    const timer = setTimeout(() => {
      setPopupOpen(true);
      sessionStorage.setItem('popupShown', '1');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Disable native scroll-restoration + always start at the top on refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Strip any hash (#catalog, #about, etc.) so the browser doesn't jump-scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  // Reveal-on-scroll observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Navbar onOpenPopup={openPopup} />
      <main>
        <Hero />
        <About />
        <Products />
        <CatalogViewer />
        <Certifications />
        <Clients />
        <Contact />
      </main>

      {/* Floating social dropdown */}
      <SocialDropdown />

      {/* Floating chat assistant */}
      <Chatbot />

      {/* Contact popup — auto-opens after 10 s + triggered from Navbar */}
      <ContactPopup open={popupOpen} onClose={closePopup} />
    </>
  );
}
