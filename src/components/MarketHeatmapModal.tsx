import React, { useState } from 'react';
import { X, ZoomIn, Info } from 'lucide-react';
import { MarketInstrument } from '../types/market';

interface HeatmapTile {
  symbol: string;
  name: string;
  price: number;
  chgPct: number;
  weight: number; // For relative sizing
  sector: string;
}

interface MarketHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstrument: (symbol: string) => void;
}

export const MarketHeatmapModal: React.FC<MarketHeatmapModalProps> = ({
  isOpen,
  onClose,
  onSelectInstrument,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');

  if (!isOpen) return null;

  const heatmapData: HeatmapTile[] = [
    // Technology
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 141.54, chgPct: 4.12, weight: 32, sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 422.54, chgPct: 0.82, weight: 30, sector: 'Technology' },
    { symbol: 'AAPL', name: 'Apple Inc', price: 228.28, chgPct: 1.38, weight: 31, sector: 'Technology' },
    { symbol: 'AVGO', name: 'Broadcom', price: 168.40, chgPct: 2.15, weight: 12, sector: 'Technology' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 142.30, chgPct: 3.25, weight: 9, sector: 'Technology' },
    { symbol: 'ORCL', name: 'Oracle Corp', price: 188.90, chgPct: -0.65, weight: 8, sector: 'Technology' },
    { symbol: 'CRM', name: 'Salesforce Inc', price: 334.10, chgPct: 1.10, weight: 7, sector: 'Technology' },

    // Consumer Discretionary & Retail
    { symbol: 'TSLA', name: 'Tesla Inc', price: 342.77, chgPct: -2.45, weight: 18, sector: 'Consumer Discretionary' },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 208.15, chgPct: 1.64, weight: 26, sector: 'Consumer Discretionary' },
    { symbol: 'HD', name: 'Home Depot', price: 409.20, chgPct: 0.42, weight: 8, sector: 'Consumer Discretionary' },
    { symbol: 'MCD', name: "McDonald's Corp", price: 295.40, chgPct: -0.30, weight: 7, sector: 'Consumer Discretionary' },

    // Communication Services
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 178.90, chgPct: 0.45, weight: 22, sector: 'Communication Services' },
    { symbol: 'META', name: 'Meta Platforms', price: 592.10, chgPct: 2.18, weight: 20, sector: 'Communication Services' },
    { symbol: 'NFLX', name: 'Netflix Inc', price: 890.30, chgPct: 1.95, weight: 9, sector: 'Communication Services' },

    // Financials
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 242.80, chgPct: 0.95, weight: 14, sector: 'Financials' },
    { symbol: 'V', name: 'Visa Inc', price: 312.40, chgPct: 0.55, weight: 12, sector: 'Financials' },
    { symbol: 'MA', name: 'Mastercard', price: 524.10, chgPct: 0.62, weight: 10, sector: 'Financials' },
    { symbol: 'BAC', name: 'Bank of America', price: 46.20, chgPct: -0.85, weight: 7, sector: 'Financials' },

    // Healthcare
    { symbol: 'LLY', name: 'Eli Lilly and Co', price: 792.50, chgPct: -1.80, weight: 14, sector: 'Healthcare' },
    { symbol: 'UNH', name: 'UnitedHealth Group', price: 602.40, chgPct: 0.25, weight: 12, sector: 'Healthcare' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 154.20, chgPct: -0.40, weight: 8, sector: 'Healthcare' },

    // Energy
    { symbol: 'XOM', name: 'Exxon Mobil', price: 119.40, chgPct: -1.35, weight: 10, sector: 'Energy' },
    { symbol: 'CVX', name: 'Chevron Corp', price: 159.20, chgPct: -1.10, weight: 8, sector: 'Energy' },
  ];

  const filteredTiles =
    selectedSector === 'All'
      ? heatmapData
      : heatmapData.filter((t) => t.sector === selectedSector);

  const sectors = ['All', 'Technology', 'Consumer Discretionary', 'Communication Services', 'Financials', 'Healthcare', 'Energy'];

  const getTileColor = (chgPct: number) => {
    if (chgPct >= 3.0) return 'bg-[#089981] text-white';
    if (chgPct >= 1.5) return 'bg-[#0bb397] text-white';
    if (chgPct >= 0.3) return 'bg-[#26a69a] text-white';
    if (chgPct >= 0.0) return 'bg-[#4db6ac] text-white';
    if (chgPct >= -1.0) return 'bg-[#ef5350] text-white';
    if (chgPct >= -2.5) return 'bg-[#f23645] text-white';
    return 'bg-[#c62828] text-white';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">S&amp;P 500 Market Heatmap</h2>
              <span className="text-xs bg-[#f0f3fa] dark:bg-[#1e222d] text-[#787b86] dark:text-[#a0a3ad] px-2 py-0.5 rounded">
                Treemap by Market Cap
              </span>
            </div>
            <p className="text-xs text-[#787b86]">Visualizing market breadth and daily price movement</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#787b86] hover:text-[#131722] dark:hover:text-white transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedSector === sec
                  ? 'bg-[#2962ff] text-white shadow-xs'
                  : 'bg-[#f0f3fa] dark:bg-[#1e222d] text-[#787b86] hover:text-[#131722] dark:hover:text-white'
              }`}
              type="button"
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {filteredTiles.map((tile) => {
              const colorClass = getTileColor(tile.chgPct);
              const isLarge = tile.weight >= 20;

              return (
                <div
                  key={tile.symbol}
                  onClick={() => onSelectInstrument(tile.symbol)}
                  className={`${colorClass} ${
                    isLarge ? 'col-span-2 row-span-2 min-h-36' : 'min-h-24'
                  } rounded-xl p-3 flex flex-col justify-between cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-transform select-none relative group`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-base tracking-tight">{tile.symbol}</span>
                      <span className="text-[11px] opacity-90 tv-mono">
                        {tile.chgPct >= 0 ? `+${tile.chgPct.toFixed(2)}%` : `${tile.chgPct.toFixed(2)}%`}
                      </span>
                    </div>
                    <span className="text-[11px] opacity-80 block truncate">{tile.name}</span>
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    <span className="text-xs font-semibold tv-mono">${tile.price.toFixed(2)}</span>
                    <span className="text-[10px] opacity-75">{tile.sector.split(' ')[0]}</span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute inset-0 bg-black/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                    <span className="text-xs font-bold text-white">Click to view Chart</span>
                    <span className="text-[10px] text-gray-300">Open {tile.symbol}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info legend */}
        <div className="px-5 py-3 bg-[#fafbfd] dark:bg-[#1a1e29] border-t border-[#f0f3fa] dark:border-[#2a2e39] flex flex-wrap items-center justify-between text-xs text-[#787b86]">
          <div className="flex items-center space-x-2">
            <Info className="w-3.5 h-3.5" />
            <span>Tile sizes are weighted by market capitalization</span>
          </div>

          <div className="flex items-center space-x-1.5 font-mono text-[11px] mt-2 sm:mt-0">
            <span>-3%</span>
            <div className="w-16 h-2 rounded-full bg-gradient-to-r from-[#c62828] via-[#ef5350] via-[#4db6ac] to-[#089981]" />
            <span>+3%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
