import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Settings, ChevronDown } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Home from './components/Home';
import Armory from './components/Armory';
import logoImage from './assets/logo.png';
import './App.css';

function AppContent() {
  const [lang, setLang] = useState('id');
  const [theme, setTheme] = useState('dark');
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsMenuOpen && !event.target.closest('.tools-menu-container')) {
        setToolsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toolsMenuOpen]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleToolsMenu = () => {
    setToolsMenuOpen(!toolsMenuOpen);
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <header className="header">
        <div className="header-controls-left">
          <div className="tools-menu-container">
            <button onClick={toggleToolsMenu} className="tools-toggle" aria-label="Tools menu">
              <Settings className="tools-icon" />
              <span className="tools-text">Tools</span>
              <ChevronDown className={`tools-chevron ${toolsMenuOpen ? 'rotated' : ''}`} />
            </button>
            {toolsMenuOpen && (
              <div className="tools-dropdown">
                <Link to="/" className="tools-item" onClick={() => setToolsMenuOpen(false)}>
                  Homes
                </Link>
                <Link to="/armory" className="tools-item" onClick={() => setToolsMenuOpen(false)}>
                  Armory
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="header-controls">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
          </button>
          <button onClick={toggleLang} className="lang-toggle">
            <span className="flag-icon">{lang === 'en' ? '🇮🇩' : '🇬🇧'}</span>
            <span className="lang-text">{lang === 'en' ? 'ID' : 'EN'}</span>
          </button>
        </div>

        {isHomePage && (
          <>
            <div className="logo-container">
              <div className="logo">
                <img src={logoImage} alt="LILO Store Logo" className="logo-image" />
              </div>
            </div>
            <h1 className="site-title">LILO Store</h1>
            <p className="site-tagline">{lang === 'en' ? '- SELL FAST - BUY CHEAP - LOAN QUICK -' : '- JUAL CEPAT - BELI MURAH - PINJAM CEPAT -'}</p>
          </>
        )}
      </header>

      <Routes>
        <Route path="/" element={<Home lang={lang} theme={theme} toggleTheme={toggleTheme} toggleLang={toggleLang} />} />
        <Route path="/armory" element={<Armory />} />
      </Routes>

      <Analytics />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
