import React, { useState } from 'react';
import { KeyCurrencyCommodityItem, MarketInstrument } from '../types/market';

interface CurrenciesCommoditiesProps {
  itemsByCategory: Record<'Currencies' | 'Commodities' | 'Crypto', KeyCurrencyCommodityItem[]>;
  onSelectItem: (item: MarketInstrument) => void;
}

export const CurrenciesCommodities: React.FC<CurrenciesCommoditiesProps> = ({
  itemsByCategory,
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState<'Currencies' | 'Commodities' | 'Crypto' | 'Curated'>('Curated');

  // If 'Curated' (default as depicted in the exact screenshot):
  // 1: EUR/USD, 2: USD/JPY, 3: Gold (XAU/USD), 4: BTC/USD
  const curatedItems: KeyCurrencyCommodityItem[] = [
    itemsByCategory.Currencies[0], // EUR/USD
    itemsByCategory.Currencies[1], // USD/JPY
    itemsByCategory.Commodities[0], // Gold (XAU/USD)
    itemsByCategory.Crypto[0], // BTC/USD
  ];

  const currentItems = activeTab === 'Curated' ? curatedItems : itemsByCategory[activeTab];

  // Convert a KeyCurrencyCommodityItem into MarketInstrument for the chart modal
  const handleItemClick = (item: KeyCurrencyCommodityItem) => {
    const isCrypto = item.type === 'Crypto' || item.pair.includes('BTC') || item.pair.includes('ETH');
    const isCommodity = item.type === 'Commodities' || item.pair.includes('Gold') || item.pair.includes('Crude');

    const instrument: MarketInstrument = {
      id: item.id,
      symbol: item.pair,
      name: item.pair,
      ticker: item.pair.split(' ')[0],
      exchange: isCrypto ? 'Crypto • Global' : isCommodity ? 'Commodities • NYMEX/COMEX' : 'Forex • Global',
      category: isCrypto ? 'crypto' : isCommodity ? 'futures' : 'forex',
      price: item.price,
      chg: (item.price * item.chgPct) / 100,
      chgPct: item.chgPct,
      badge: {
        text: item.pair.slice(0, 2).toUpperCase(),
        bg: item.chgPct >= 0 ? '#089981' : '#f23645',
        color: '#ffffff',
      },
      sparkline: item.sparkline,
      high24h: item.price * 1.015,
      low24h: item.price * 0.985,
      volume: 'N/A',
      description: `${item.label} real-time quotation and market data.`,
    };

    onSelectItem(instrument);
  };

  return (
    <section className="space-y-5 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-[#131722] dark:text-white">
          Key Currencies &amp; Commodities
        </h2>
        <div className="flex space-x-2 text-xs font-semibold overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('Curated')}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              activeTab === 'Curated'
                ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-black dark:text-white font-bold'
                : 'text-[#787b86] dark:text-[#9598a1] hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d]'
            }`}
            type="button"
          >
            Curated
          </button>
          <button
            onClick={() => setActiveTab('Currencies')}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              activeTab === 'Currencies'
                ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-black dark:text-white font-bold'
                : 'text-[#787b86] dark:text-[#9598a1] hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d]'
            }`}
            type="button"
          >
            Currencies
          </button>
          <button
            onClick={() => setActiveTab('Commodities')}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              activeTab === 'Commodities'
                ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-black dark:text-white font-bold'
                : 'text-[#787b86] dark:text-[#9598a1] hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d]'
            }`}
            type="button"
          >
            Commodities
          </button>
          <button
            onClick={() => setActiveTab('Crypto')}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              activeTab === 'Crypto'
                ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-black dark:text-white font-bold'
                : 'text-[#787b86] dark:text-[#9598a1] hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d]'
            }`}
            type="button"
          >
            Crypto
          </button>
        </div>
      </div>

      {/* Quick Tickers Multi-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentItems.map((item) => {
          const isPositive = item.chgPct >= 0;
          const formattedPrice =
            item.price > 1000
              ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : item.price < 5 && item.price.toString().split('.')[1]?.length > 2
              ? item.price.toFixed(5)
              : item.price.toFixed(3);

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(item);
                }
              }}
              className={`p-4 border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl hover:shadow-sm dark:hover:border-[#434857] transition-all bg-white dark:bg-[#131722] cursor-pointer group ${
                item.lastTickDirection === 'up'
                  ? 'flash-up'
                  : item.lastTickDirection === 'down'
                  ? 'flash-down'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                  {item.pair}
                </span>
                <span
                  className={`text-xs font-semibold tv-mono ${
                    isPositive ? 'tv-green-text' : 'tv-red-text'
                  }`}
                >
                  {isPositive ? `+${item.chgPct.toFixed(2)}%` : `${item.chgPct.toFixed(2)}%`}
                </span>
              </div>
              <div className="text-lg font-bold tv-mono text-[#131722] dark:text-white">
                {formattedPrice}
              </div>
              <span className="text-[11px] text-[#787b86] dark:text-[#848791] block mt-0.5">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
