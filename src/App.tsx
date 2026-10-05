/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesOverview } from './components/IndicesOverview';
import { GlobalIndicesTable } from './components/GlobalIndicesTable';
import { MostActiveStocks } from './components/MostActiveStocks';
import { CurrenciesCommodities } from './components/CurrenciesCommodities';
import { Footer } from './components/Footer';
import { InstrumentDetailModal } from './components/InstrumentDetailModal';
import { MarketHeatmapModal } from './components/MarketHeatmapModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { LegalModal } from './components/LegalModal';

import {
  INITIAL_TOP_INDICES,
  GLOBAL_INDICES_TABLE,
  MOST_ACTIVE_STOCKS,
  KEY_CURRENCIES_COMMODITIES,
} from './data/mockMarketData';

import {
  MarketInstrument,
  MarketCategory,
  MarketRegion,
  PaperPosition,
  KeyCurrencyCommodityItem,
} from './types/market';

export default function App() {
  // Navigation & Categorization state
  const [activeNav, setActiveNav] = useState<string>('Markets');
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('us_stocks');
  const [activeRegion, setActiveRegion] = useState<MarketRegion>('Global');

  // Market Datasets
  const [topIndices, setTopIndices] = useState<MarketInstrument[]>(INITIAL_TOP_INDICES);
  const [tableIndices, setTableIndices] = useState<MarketInstrument[]>(GLOBAL_INDICES_TABLE);
  const [activeStocks, setActiveStocks] = useState<MarketInstrument[]>(MOST_ACTIVE_STOCKS);
  const [currencyCommodityData, setCurrencyCommodityData] = useState(KEY_CURRENCIES_COMMODITIES);

  // Selected Index Pill (Default: S&P 500)
  const [selectedIndexId, setSelectedIndexId] = useState<string>('sp500');

  // Modals & Panels
  const [selectedInstrument, setSelectedInstrument] = useState<MarketInstrument | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [legalTopic, setLegalTopic] = useState<string | null>(null);

  // Live Ticker & Theme Settings
  const [isLiveTickerActive, setIsLiveTickerActive] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Paper Trading positions
  const [paperPositions, setPaperPositions] = useState<PaperPosition[]>([
    {
      instrumentId: 'nvda',
      symbol: 'NVDA',
      shares: 25,
      avgEntryPrice: 138.2,
      type: 'BUY',
      timestamp: '09:42 AM',
    },
    {
      instrumentId: 'sp500',
      symbol: 'S&P 500',
      shares: 5,
      avgEntryPrice: 5960.0,
      type: 'BUY',
      timestamp: '10:15 AM',
    },
  ]);

  // Sync Dark Mode class with documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Keyboard Shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Live Price Tick Simulation Engine
  useEffect(() => {
    if (!isLiveTickerActive) return;

    const interval = setInterval(() => {
      const targetGroup = Math.random();

      if (targetGroup < 0.35) {
        // Tick Top Indices
        setTopIndices((prev) => {
          const indexToTick = Math.floor(Math.random() * prev.length);
          return prev.map((item, idx) => {
            if (idx !== indexToTick) return { ...item, lastTickDirection: undefined };
            const deltaPct = (Math.random() - 0.49) * 0.08;
            const newPrice = Number((item.price * (1 + deltaPct / 100)).toFixed(2));
            const newChg = Number((item.chg + (newPrice - item.price)).toFixed(2));
            const newChgPct = Number((item.chgPct + deltaPct).toFixed(2));
            const direction = deltaPct >= 0 ? 'up' : 'down';
            return {
              ...item,
              price: newPrice,
              chg: newChg,
              chgPct: newChgPct,
              lastTickDirection: direction,
            };
          });
        });
      } else if (targetGroup < 0.7) {
        // Tick Active Stocks
        setActiveStocks((prev) => {
          const indexToTick = Math.floor(Math.random() * prev.length);
          return prev.map((item, idx) => {
            if (idx !== indexToTick) return { ...item, lastTickDirection: undefined };
            const deltaPct = (Math.random() - 0.49) * 0.12;
            const newPrice = Number((item.price * (1 + deltaPct / 100)).toFixed(2));
            const newChg = Number((item.chg + (newPrice - item.price)).toFixed(2));
            const newChgPct = Number((item.chgPct + deltaPct).toFixed(2));
            const direction = deltaPct >= 0 ? 'up' : 'down';
            return {
              ...item,
              price: newPrice,
              chg: newChg,
              chgPct: newChgPct,
              lastTickDirection: direction,
            };
          });
        });
      } else {
        // Tick Table Indices
        setTableIndices((prev) => {
          const indexToTick = Math.floor(Math.random() * prev.length);
          return prev.map((item, idx) => {
            if (idx !== indexToTick) return { ...item, lastTickDirection: undefined };
            const deltaPct = (Math.random() - 0.49) * 0.08;
            const newPrice = Number((item.price * (1 + deltaPct / 100)).toFixed(2));
            const newChg = Number((item.chg + (newPrice - item.price)).toFixed(2));
            const newChgPct = Number((item.chgPct + deltaPct).toFixed(2));
            const direction = deltaPct >= 0 ? 'up' : 'down';
            return {
              ...item,
              price: newPrice,
              chg: newChg,
              chgPct: newChgPct,
              lastTickDirection: direction,
            };
          });
        });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveTickerActive]);

  // Combine all instruments for global search and lookup
  const allInstruments: MarketInstrument[] = [
    ...topIndices,
    ...tableIndices,
    ...activeStocks,
  ];

  // Handle clicking an index pill
  const handleSelectIndexPill = (instrument: MarketInstrument) => {
    setSelectedIndexId(instrument.id);
    setSelectedInstrument(instrument);
  };

  // Handle selecting an instrument from table or search
  const handleSelectInstrument = (instrument: MarketInstrument) => {
    setSelectedInstrument(instrument);
  };

  // Handle selecting instrument by symbol from heatmap
  const handleSelectBySymbol = (symbol: string) => {
    const found = allInstruments.find((i) => i.symbol === symbol || i.ticker === symbol);
    if (found) {
      setSelectedInstrument(found);
      setIsHeatmapOpen(false);
    } else {
      // Create fallback instrument on the fly
      const fallback: MarketInstrument = {
        id: symbol.toLowerCase(),
        symbol: symbol,
        name: `${symbol} Equities`,
        ticker: symbol,
        exchange: 'NASDAQ',
        category: 'us_stocks',
        price: 150.0,
        chg: 2.1,
        chgPct: 1.4,
        badge: { text: symbol.slice(0, 2), bg: '#2962ff', color: '#fff', isSquare: true },
        sparkline: [145, 147, 148, 149.5, 150.0],
        high24h: 152.0,
        low24h: 144.5,
        volume: '15.4M',
      };
      setSelectedInstrument(fallback);
      setIsHeatmapOpen(false);
    }
  };

  // Paper trade executed handler
  const handleTradeExecuted = (newPosition: PaperPosition) => {
    setPaperPositions((prev) => [newPosition, ...prev]);
  };

  // Close paper trade position
  const handleClosePosition = (index: number) => {
    setPaperPositions((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter table data based on active category / region
  const filteredTableIndices = tableIndices.filter((item) => {
    if (activeRegion === 'Global') return true;
    if (activeRegion === 'US') return item.region === 'US';
    if (activeRegion === 'Europe') return item.region === 'Europe';
    if (activeRegion === 'Asia') return item.region === 'Asia';
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#131722] flex flex-col antialiased text-[#131722] dark:text-white transition-colors duration-150">
      {/* 1. Header (Sticky Top Bar) */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSignIn={() => setIsAccountOpen(true)}
        isLiveTickerActive={isLiveTickerActive}
        onToggleLiveTicker={() => setIsLiveTickerActive(!isLiveTickerActive)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* 2. Hero Section: Title with Chevron & Category Filter Bar */}
      <HeroSection
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        activeRegion={activeRegion}
        onSelectRegion={setActiveRegion}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* Section 1: Indices Overview Pills */}
        <IndicesOverview
          indices={topIndices}
          selectedIndexId={selectedIndexId}
          onSelectIndex={handleSelectIndexPill}
          onViewAllIndices={() => {
            const tableElem = document.querySelector('[data-purpose="indices-table"]');
            tableElem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 2: Detailed Market Movers & Tables (2 cols Left, 1 col Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Major Global Indices Table */}
          <GlobalIndicesTable
            instruments={filteredTableIndices}
            onSelectInstrument={handleSelectInstrument}
            onSeeAllIndices={() => setIsHeatmapOpen(true)}
          />

          {/* Most Active US Stocks */}
          <MostActiveStocks
            stocks={activeStocks}
            onSelectStock={handleSelectInstrument}
            onOpenHeatmaps={() => setIsHeatmapOpen(true)}
          />
        </div>

        {/* Section 3: Currencies, Commodities & Crypto Highlights */}
        <CurrenciesCommodities
          itemsByCategory={currencyCommodityData}
          onSelectItem={handleSelectInstrument}
        />
      </main>

      {/* 4. Footer */}
      <Footer onOpenLegal={(topic) => setLegalTopic(topic)} />

      {/* MODALS */}
      {/* Interactive TradingView Instrument Detail & Chart Modal */}
      <InstrumentDetailModal
        instrument={selectedInstrument}
        onClose={() => setSelectedInstrument(null)}
        onTradeExecuted={handleTradeExecuted}
      />

      {/* S&P 500 Market Treemap Heatmap Modal */}
      <MarketHeatmapModal
        isOpen={isHeatmapOpen}
        onClose={() => setIsHeatmapOpen(false)}
        onSelectInstrument={handleSelectBySymbol}
      />

      {/* Global Symbol Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        instruments={allInstruments}
        onSelectInstrument={handleSelectInstrument}
      />

      {/* Account & Paper Trading Portfolio Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        positions={paperPositions}
        onClosePosition={handleClosePosition}
        instruments={allInstruments}
        onSelectInstrument={handleSelectInstrument}
      />

      {/* Legal & Terms Information Modal */}
      <LegalModal topic={legalTopic} onClose={() => setLegalTopic(null)} />
    </div>
  );
}
