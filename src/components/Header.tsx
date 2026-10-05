import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, User, Moon, Sun, Radio, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSignIn: () => void;
  isLiveTickerActive: boolean;
  onToggleLiveTicker: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSignIn,
  isLiveTickerActive,
  onToggleLiveTicker,
  isDarkMode,
  onToggleDarkMode,
  activeNav,
  setActiveNav,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'EN', label: 'English (US)' },
    { code: 'ES', label: 'Español' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'JA', label: '日本語' },
    { code: 'FR', label: 'Français' },
    { code: 'ZH', label: '简体中文' }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#131722] border-b border-[#f0f3fa] dark:border-[#2a2e39] h-16 flex items-center px-4 lg:px-7 select-none transition-colors duration-150">
      {/* Left branding & search */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* TradingView Geometric Monogram Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="TradingView Home"
          className="flex items-center group cursor-pointer focus:outline-hidden"
        >
          <svg
            className="h-6 w-auto fill-current text-black dark:text-white transition-colors"
            fill="none"
            viewBox="0 0 36 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 22H7V6h7v16zm8-16h-5v22h5V6zm14 8h-6v14h6V14z" fill="currentColor"></path>
            <path d="M2 2v24h4V2H2z" fill="none"></path>
          </svg>
        </a>

        {/* Quick Search Bar */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2.5 bg-[#f0f3fa] dark:bg-[#1e222d] hover:bg-[#e0e3eb] dark:hover:bg-[#2a2e39] transition-colors rounded-full px-3.5 py-1.5 md:py-2 text-sm text-[#787b86] dark:text-[#9598a1] w-44 sm:w-60 md:w-64 lg:w-72 cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-[#2962ff]"
          type="button"
          title="Search symbols, indices, crypto (Ctrl+K)"
        >
          <Search className="w-4 h-4 text-[#787b86] dark:text-[#9598a1] shrink-0" />
          <span className="font-normal text-xs sm:text-sm truncate">Search (Ctrl+K)</span>
          <kbd className="hidden lg:inline-block ml-auto text-[10px] bg-white dark:bg-[#131722] border border-[#d1d4dc] dark:border-[#363a45] rounded px-1.5 py-0.5 font-mono text-[#787b86]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden lg:flex items-center space-x-7 ml-8 text-[15px] font-medium text-[#131722] dark:text-[#d1d4dc]">
        {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((nav) => {
          const isActive = activeNav === nav;
          return (
            <button
              key={nav}
              onClick={() => setActiveNav(nav)}
              className={`py-5 transition-colors cursor-pointer border-b-2 ${
                isActive
                  ? 'text-[#2962ff] dark:text-[#2962ff] border-[#2962ff] font-semibold'
                  : 'border-transparent hover:text-[#2962ff] dark:hover:text-[#2962ff]'
              }`}
            >
              {nav}
            </button>
          );
        })}
      </nav>

      {/* Right Global Actions */}
      <div className="ml-auto flex items-center space-x-2 sm:space-x-3.5">
        {/* Live Market Simulation Toggle */}
        <button
          onClick={onToggleLiveTicker}
          className={`hidden sm:flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors ${
            isLiveTickerActive
              ? 'bg-[#089981]/10 text-[#089981] hover:bg-[#089981]/20'
              : 'bg-[#f0f3fa] dark:bg-[#1e222d] text-[#787b86] hover:bg-[#e0e3eb]'
          }`}
          title={isLiveTickerActive ? 'Live market simulation is active' : 'Live updates paused'}
          type="button"
        >
          <span className={`w-2 h-2 rounded-full ${isLiveTickerActive ? 'bg-[#089981] animate-pulse' : 'bg-[#787b86]'}`} />
          <span>{isLiveTickerActive ? 'Live' : 'Paused'}</span>
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] rounded-full transition-colors text-[#131722] dark:text-[#d1d4dc] cursor-pointer"
          title={isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
          type="button"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Language Selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="hidden sm:flex items-center space-x-1.5 text-sm font-semibold hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] px-2.5 py-1.5 rounded-lg transition-colors text-[#131722] dark:text-[#d1d4dc] cursor-pointer"
            title="Language"
            type="button"
          >
            <Globe className="w-5 h-5 text-[#131722] dark:text-[#d1d4dc]" />
            <span>{currentLang}</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-[#1e222d] rounded-xl shadow-lg border border-[#e0e3eb] dark:border-[#2a2e39] py-1.5 z-50 text-xs">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setCurrentLang(l.code);
                    setLangMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-[#131722] dark:text-[#d1d4dc]"
                >
                  <span>{l.label}</span>
                  {currentLang === l.code && <Check className="w-3.5 h-3.5 text-[#2962ff]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Icon Button */}
        <button
          onClick={onOpenSignIn}
          aria-label="User Profile"
          className="p-2 hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] rounded-full transition-colors text-[#131722] dark:text-[#d1d4dc] cursor-pointer"
          type="button"
          title="Account & Watchlists"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Get Started Primary CTA (TradingView Gradient Button) */}
        <button
          onClick={onOpenSignIn}
          className="bg-gradient-to-r from-[#2962ff] via-[#4d53e8] to-[#9c27b0] hover:opacity-95 text-white font-medium text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full shadow-xs transition-all flex items-center justify-center cursor-pointer whitespace-nowrap"
          type="button"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
