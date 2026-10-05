import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe2 } from 'lucide-react';
import { MarketCategory, MarketRegion } from '../types/market';

interface HeroSectionProps {
  activeCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
  activeRegion: MarketRegion;
  onSelectRegion: (region: MarketRegion) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  activeRegion,
  onSelectRegion,
}) => {
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'us_stocks', label: 'US stocks' },
    { id: 'world_stocks', label: 'World stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Government bonds' },
    { id: 'bonds', label: 'Corporate bonds' },
    { id: 'etfs', label: 'ETFs' },
    { id: 'economy', label: 'Economy' },
  ];

  const regions: { id: MarketRegion; label: string; desc: string }[] = [
    { id: 'Global', label: 'Global Markets', desc: 'World aggregate exchanges' },
    { id: 'US', label: 'United States', desc: 'NYSE, NASDAQ, CBOE' },
    { id: 'Europe', label: 'Europe', desc: 'LSE, XETRA, Euronext' },
    { id: 'Asia', label: 'Asia-Pacific', desc: 'TSE, HKEX, SGX' },
    { id: 'Americas', label: 'Americas', desc: 'TSX, BM&F Bovespa' }
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setRegionMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="pt-8 sm:pt-10 pb-4 px-4 text-center select-none">
      {/* Main Headline with Dropdown Chevron */}
      <div className="relative inline-block" ref={regionRef}>
        <div
          onClick={() => setRegionMenuOpen(!regionMenuOpen)}
          className="inline-flex items-center justify-center cursor-pointer group mb-6"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setRegionMenuOpen(!regionMenuOpen);
            }
          }}
          aria-expanded={regionMenuOpen}
          aria-haspopup="true"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131722] dark:text-white transition-colors">
            Markets, {activeRegion === 'Global' ? 'everywhere' : activeRegion}
          </h1>
          <button
            aria-label="Choose market region"
            className="ml-2.5 p-1 rounded-full text-black dark:text-white hover:bg-slate-100 dark:hover:bg-[#1e222d] transition-colors focus:outline-hidden"
            type="button"
          >
            <ChevronDown
              className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5] transform transition-transform ${
                regionMenuOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
              }`}
            />
          </button>
        </div>

        {/* Region Dropdown Modal */}
        {regionMenuOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-72 sm:w-80 bg-white dark:bg-[#1e222d] rounded-2xl shadow-xl border border-[#e0e3eb] dark:border-[#2a2e39] py-2 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-2 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#787b86] uppercase tracking-wider">Select Market Region</span>
              <Globe2 className="w-3.5 h-3.5 text-[#787b86]" />
            </div>
            <div className="p-1.5 space-y-0.5">
              {regions.map((reg) => {
                const isSelected = activeRegion === reg.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => {
                      onSelectRegion(reg.id);
                      setRegionMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#131722] dark:text-white font-semibold'
                        : 'hover:bg-[#f8f9fd] dark:hover:bg-[#252936] text-[#787b86] dark:text-[#a3a6af]'
                    }`}
                  >
                    <div>
                      <div className="text-sm">{reg.label}</div>
                      <div className="text-[11px] text-[#787b86] font-normal">{reg.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2962ff] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Category Pills Navigation Bar */}
      <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center space-x-2 py-2 px-2 text-sm font-medium">
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat.id && (cat.id !== 'bonds' || idx === 5);
          return (
            <button
              key={`${cat.id}-${idx}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full shrink-0 transition-colors whitespace-nowrap cursor-pointer text-sm ${
                isActive
                  ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] font-semibold text-[#131722] dark:text-white shadow-xs'
                  : 'text-[#787b86] dark:text-[#9598a1] hover:text-[#131722] dark:hover:text-white hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d]'
              }`}
              type="button"
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
