import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketInstrument } from '../types/market';

interface MostActiveStocksProps {
  stocks: MarketInstrument[];
  onSelectStock: (stock: MarketInstrument) => void;
  onOpenHeatmaps: () => void;
}

export const MostActiveStocks: React.FC<MostActiveStocksProps> = ({
  stocks,
  onSelectStock,
  onOpenHeatmaps,
}) => {
  const [filterMode, setFilterMode] = useState<'active' | 'gainers' | 'losers'>('active');

  let displayStocks = [...stocks];
  if (filterMode === 'gainers') {
    displayStocks.sort((a, b) => b.chgPct - a.chgPct);
  } else if (filterMode === 'losers') {
    displayStocks.sort((a, b) => a.chgPct - b.chgPct);
  }

  // Display top 4-5 items matching design layout
  const topStocks = displayStocks.slice(0, 4);

  return (
    <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-[#131722] flex flex-col transition-colors duration-150">
      {/* Widget Header */}
      <div className="p-4 sm:p-5 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[#131722] dark:text-white">
            Most Active US Stocks
          </h3>
          <p className="text-xs text-[#787b86]">Top traded assets today by volume</p>
        </div>

        {/* Quick Filter toggle */}
        <div className="hidden sm:flex items-center space-x-1 bg-[#f0f3fa] dark:bg-[#1e222d] p-0.5 rounded-lg text-[11px] font-medium">
          <button
            onClick={() => setFilterMode('active')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              filterMode === 'active'
                ? 'bg-white dark:bg-[#2a2e39] text-[#131722] dark:text-white shadow-xs font-semibold'
                : 'text-[#787b86] hover:text-[#131722]'
            }`}
          >
            Volume
          </button>
          <button
            onClick={() => setFilterMode('gainers')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              filterMode === 'gainers'
                ? 'bg-white dark:bg-[#2a2e39] text-[#089981] shadow-xs font-semibold'
                : 'text-[#787b86] hover:text-[#131722]'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={() => setFilterMode('losers')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              filterMode === 'losers'
                ? 'bg-white dark:bg-[#2a2e39] text-[#f23645] shadow-xs font-semibold'
                : 'text-[#787b86] hover:text-[#131722]'
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      {/* Stock rows */}
      <div className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39] flex-1">
        {topStocks.map((stock) => {
          const isPositive = stock.chgPct >= 0;

          return (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className={`p-4 hover:bg-[#fafbfd] dark:hover:bg-[#1e222d] transition-colors flex items-center justify-between cursor-pointer select-none ${
                stock.lastTickDirection === 'up'
                  ? 'flash-up'
                  : stock.lastTickDirection === 'down'
                  ? 'flash-down'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  style={{
                    backgroundColor: stock.badge.bg,
                    color: stock.badge.color || '#ffffff',
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                >
                  {stock.badge.text}
                </div>
                <div>
                  <span className="font-bold text-sm block text-[#131722] dark:text-white leading-tight">
                    {stock.symbol}
                  </span>
                  <span className="text-xs text-[#787b86]">{stock.name}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-semibold tv-mono block text-[#131722] dark:text-white">
                  ${stock.price.toFixed(2)}
                </span>
                <span
                  className={`text-xs tv-mono font-medium ${
                    isPositive ? 'tv-green-text' : 'tv-red-text'
                  }`}
                >
                  {isPositive ? `+${stock.chgPct.toFixed(2)}%` : `${stock.chgPct.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Link to Heatmap */}
      <div className="p-3 bg-[#fafbfd] dark:bg-[#1a1e29] border-t border-[#f0f3fa] dark:border-[#2a2e39] text-center">
        <button
          onClick={onOpenHeatmaps}
          className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer inline-flex items-center space-x-1 focus:outline-hidden"
          type="button"
        >
          <span>View full market heatmaps</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
