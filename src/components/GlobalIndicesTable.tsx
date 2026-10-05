import React, { useState } from 'react';
import { ChevronRight, ArrowUpDown } from 'lucide-react';
import { MarketInstrument } from '../types/market';

interface GlobalIndicesTableProps {
  instruments: MarketInstrument[];
  onSelectInstrument: (instrument: MarketInstrument) => void;
  onSeeAllIndices: () => void;
}

type SortField = 'name' | 'price' | 'chg' | 'chgPct';

export const GlobalIndicesTable: React.FC<GlobalIndicesTableProps> = ({
  instruments,
  onSelectInstrument,
  onSeeAllIndices,
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for financial metrics
    }
  };

  const sortedData = [...instruments].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'chg') {
      comparison = a.chg - b.chg;
    } else if (sortField === 'chgPct') {
      comparison = a.chgPct - b.chgPct;
    }
    return sortAsc ? comparison : -comparison;
  });

  // Generate SVG polyline points from sparkline values
  const getSparklinePoints = (values: number[], isPositive: boolean) => {
    if (!values || values.length === 0) {
      return isPositive ? '0,18 20,15 40,20 60,10 80,12 100,4' : '0,5 20,8 40,6 60,18 80,15 100,22';
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const width = 100;
    const height = 25;
    const padding = 3;

    return values
      .map((val, idx) => {
        const x = (idx / (values.length - 1)) * width;
        // Invert Y so highest value is at top
        const y = height - padding - ((val - min) / range) * (height - 2 * padding);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className="lg:col-span-2 border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-[#131722] flex flex-col transition-colors duration-150">
      {/* Table Header */}
      <div className="p-4 sm:p-5 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[#131722] dark:text-white">
            Major Global Indices
          </h3>
          <p className="text-xs text-[#787b86]">Real-time performance across primary financial markets</p>
        </div>
        <button
          onClick={onSeeAllIndices}
          className="text-xs font-semibold text-[#2962ff] hover:underline flex items-center shrink-0 cursor-pointer focus:outline-hidden"
          type="button"
        >
          <span>See all indices</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5 stroke-[2.5]" />
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm" data-purpose="indices-table">
          <thead>
            <tr className="text-xs text-[#787b86] border-b border-[#f0f3fa] dark:border-[#2a2e39] bg-[#fafbfd] dark:bg-[#1a1e29]">
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-5 font-medium cursor-pointer hover:text-[#131722] dark:hover:text-white select-none"
              >
                <div className="flex items-center space-x-1">
                  <span>Index</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('price')}
                className="py-3 px-4 font-medium text-right cursor-pointer hover:text-[#131722] dark:hover:text-white select-none"
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Last</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('chg')}
                className="py-3 px-4 font-medium text-right cursor-pointer hover:text-[#131722] dark:hover:text-white select-none"
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Chg</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('chgPct')}
                className="py-3 px-4 font-medium text-right cursor-pointer hover:text-[#131722] dark:hover:text-white select-none"
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Chg %</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-5 font-medium text-right hidden sm:table-cell select-none">
                Trend (24h)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39]">
            {sortedData.map((row) => {
              const isPositive = row.chgPct >= 0;
              const points = getSparklinePoints(row.sparkline, isPositive);

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectInstrument(row)}
                  className={`hover:bg-[#f8f9fd] dark:hover:bg-[#1e222d] transition-colors cursor-pointer select-none ${
                    row.lastTickDirection === 'up'
                      ? 'flash-up'
                      : row.lastTickDirection === 'down'
                      ? 'flash-down'
                      : ''
                  }`}
                >
                  <td className="py-3.5 px-5 flex items-center space-x-3">
                    <div
                      style={{
                        backgroundColor: row.badge.bg,
                        color: row.badge.color || '#f23645',
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    >
                      {row.badge.text}
                    </div>
                    <div>
                      <span className="font-semibold block text-[#131722] dark:text-white leading-tight">
                        {row.name}
                      </span>
                      <span className="text-xs text-[#787b86]">{row.exchange}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right font-medium tv-mono text-[#131722] dark:text-white">
                    {row.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td
                    className={`py-3.5 px-4 text-right tv-mono font-medium ${
                      isPositive ? 'tv-green-text' : 'tv-red-text'
                    }`}
                  >
                    {isPositive ? `+${row.chg.toFixed(2)}` : row.chg.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-right tv-mono">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        isPositive ? 'tv-green-bg tv-green-text' : 'tv-red-bg tv-red-text'
                      }`}
                    >
                      {isPositive ? `+${row.chgPct.toFixed(2)}%` : `${row.chgPct.toFixed(2)}%`}
                    </span>
                  </td>

                  <td className="py-3.5 px-5 text-right hidden sm:table-cell">
                    <svg
                      className={`w-20 h-5 ml-auto ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 100 25"
                    >
                      <polyline points={points}></polyline>
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
