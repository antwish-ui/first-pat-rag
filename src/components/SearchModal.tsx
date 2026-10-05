import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { MarketInstrument } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  instruments: MarketInstrument[];
  onSelectInstrument: (instrument: MarketInstrument) => void;
}

type SearchTab = 'All' | 'Stocks' | 'Crypto' | 'Forex' | 'Indices';

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  instruments,
  onSelectInstrument,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const recentSearches = ['NVDA', 'S&P 500', 'BTC/USD', 'TSLA', 'AAPL'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = instruments.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.ticker.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;

    if (activeTab === 'Stocks') return item.category === 'us_stocks' || item.category === 'world_stocks';
    if (activeTab === 'Crypto') return item.category === 'crypto';
    if (activeTab === 'Forex') return item.category === 'forex';
    if (activeTab === 'Indices') return item.category === 'us_stocks' || item.name.includes('500') || item.name.includes('100') || item.name.includes('Dow');

    return true;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(filtered.length - 1, prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      onSelectInstrument(filtered[selectedIndex]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 p-3 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#1e222d] text-[#131722] dark:text-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search symbol, index, currency, or company..."
            className="w-full bg-transparent border-none text-base outline-hidden placeholder:text-[#787b86] dark:placeholder:text-[#848791]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787b86] hover:text-[#131722] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#787b86] px-2 py-1 rounded font-mono"
          >
            ESC
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-4 py-2 bg-[#fafbfd] dark:bg-[#171a23] border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
          {(['All', 'Stocks', 'Indices', 'Crypto', 'Forex'] as SearchTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#2962ff] text-white shadow-xs'
                  : 'text-[#787b86] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 flex-1 divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]/50">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isPositive = item.chgPct >= 0;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectInstrument(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#f0f3fa] dark:bg-[#2a2e39]'
                      : 'hover:bg-[#fafbfd] dark:hover:bg-[#252936]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      style={{ backgroundColor: item.badge.bg, color: item.badge.color || '#fff' }}
                      className="w-7 h-7 rounded-md text-xs font-bold flex items-center justify-center shrink-0"
                    >
                      {item.badge.text}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm">{item.symbol}</span>
                        <span className="text-[11px] text-[#787b86]">{item.exchange}</span>
                      </div>
                      <span className="text-xs text-[#787b86] block truncate">{item.name}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold tv-mono">
                      ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs tv-mono font-medium ${isPositive ? 'tv-green-text' : 'tv-red-text'}`}>
                      {isPositive ? `+${item.chgPct.toFixed(2)}%` : `${item.chgPct.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-sm text-[#787b86]">
              No instruments found matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Recent Search Suggestions */}
        <div className="p-3 bg-[#fafbfd] dark:bg-[#171a23] border-t border-[#f0f3fa] dark:border-[#2a2e39] flex items-center space-x-2 text-xs text-[#787b86]">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="shrink-0">Popular:</span>
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2 py-0.5 rounded bg-white dark:bg-[#2a2e39] border border-[#e0e3eb] dark:border-[#363a45] text-[#131722] dark:text-white hover:text-[#2962ff] cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
