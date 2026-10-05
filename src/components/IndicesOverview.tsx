import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketInstrument } from '../types/market';

interface IndicesOverviewProps {
  indices: MarketInstrument[];
  selectedIndexId: string;
  onSelectIndex: (instrument: MarketInstrument) => void;
  onViewAllIndices: () => void;
}

export const IndicesOverview: React.FC<IndicesOverviewProps> = ({
  indices,
  selectedIndexId,
  onSelectIndex,
  onViewAllIndices,
}) => {
  return (
    <section>
      {/* Section Title with link arrow */}
      <button
        onClick={onViewAllIndices}
        className="group inline-flex items-center space-x-1.5 mb-5 text-[#131722] dark:text-white hover:text-[#2962ff] dark:hover:text-[#2962ff] transition-colors cursor-pointer text-left focus:outline-hidden"
        type="button"
      >
        <h2 className="text-2xl font-bold tracking-tight">Indices</h2>
        <ChevronRight className="w-6 h-6 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Quick Ticker Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {indices.map((item) => {
          const isSelected = selectedIndexId === item.id;
          const isPositive = item.chgPct >= 0;

          return (
            <div
              key={item.id}
              onClick={() => onSelectIndex(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectIndex(item);
                }
              }}
              className={`p-4 rounded-full flex items-center justify-between cursor-pointer transition-all duration-150 border select-none ${
                isSelected
                  ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] border-transparent shadow-xs ring-1 ring-[#2962ff]/30'
                  : 'hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] border-[#f0f3fa] dark:border-[#2a2e39] sm:border-transparent'
              } ${item.lastTickDirection === 'up' ? 'flash-up' : item.lastTickDirection === 'down' ? 'flash-down' : ''}`}
            >
              <div className="flex items-center space-x-3.5 pl-1">
                <span
                  style={{ backgroundColor: item.badge.bg, color: item.badge.color || '#ffffff' }}
                  className="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center tracking-tighter shadow-xs shrink-0"
                >
                  {item.badge.text}
                </span>
                <div>
                  <span className="text-base font-semibold text-[#131722] dark:text-white block leading-tight">
                    {item.name}
                  </span>
                  <span className="text-xs text-[#787b86] font-medium">{item.ticker}</span>
                </div>
              </div>

              <div className="text-right pr-3">
                <span className="text-sm font-semibold tv-mono block text-[#131722] dark:text-white">
                  {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-xs tv-mono font-medium ${
                    isPositive ? 'tv-green-text' : 'tv-red-text'
                  }`}
                >
                  {isPositive ? `+${item.chgPct.toFixed(2)}%` : `${item.chgPct.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
