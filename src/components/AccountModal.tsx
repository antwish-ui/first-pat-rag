import React, { useState } from 'react';
import { X, User, Briefcase, Star, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PaperPosition, MarketInstrument } from '../types/market';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  positions: PaperPosition[];
  onClosePosition: (index: number) => void;
  instruments: MarketInstrument[];
  onSelectInstrument: (instrument: MarketInstrument) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  positions,
  onClosePosition,
  instruments,
  onSelectInstrument,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'watchlist' | 'settings'>('portfolio');

  if (!isOpen) return null;

  const startingCash = 100000;
  // Calculate total positions value and PnL
  let positionsValue = 0;
  let totalCost = 0;

  positions.forEach((p) => {
    const inst = instruments.find((i) => i.symbol === p.symbol || i.id === p.instrumentId);
    const curPrice = inst ? inst.price : p.avgEntryPrice;
    totalCost += p.shares * p.avgEntryPrice;
    positionsValue += p.shares * curPrice;
  });

  const unrealizedPnL = positionsValue - totalCost;
  const cashBalance = startingCash - totalCost;
  const totalEquity = cashBalance + positionsValue;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2962ff] to-[#9c27b0] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              TV
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">TradingView Paper Account</h2>
              <span className="text-xs text-[#787b86]">Standard Demo Trader • Pro Features Active</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#787b86]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#f0f3fa] dark:border-[#2a2e39] px-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'portfolio'
                ? 'border-[#2962ff] text-[#2962ff]'
                : 'border-transparent text-[#787b86] hover:text-[#131722] dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Paper Portfolio ({positions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'watchlist'
                ? 'border-[#2962ff] text-[#2962ff]'
                : 'border-transparent text-[#787b86] hover:text-[#131722] dark:hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Watchlist</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'portfolio' && (
            <>
              {/* Account Balances Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#fafbfd] dark:bg-[#1a1e29] p-4 rounded-xl border border-[#f0f3fa] dark:border-[#2a2e39]">
                <div>
                  <span className="text-[11px] text-[#787b86] block">Total Equity</span>
                  <span className="text-lg font-bold tv-mono">
                    ${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#787b86] block">Cash Balance</span>
                  <span className="text-base font-semibold tv-mono text-[#787b86] dark:text-[#a0a3ad]">
                    ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#787b86] block">Unrealized P&amp;L</span>
                  <span
                    className={`text-base font-bold tv-mono ${
                      unrealizedPnL >= 0 ? 'tv-green-text' : 'tv-red-text'
                    }`}
                  >
                    {unrealizedPnL >= 0 ? `+$${unrealizedPnL.toFixed(2)}` : `-$${Math.abs(unrealizedPnL).toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Positions List */}
              <div>
                <h3 className="text-xs font-bold text-[#787b86] uppercase tracking-wider mb-2">
                  Open Paper Positions
                </h3>

                {positions.length > 0 ? (
                  <div className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl overflow-hidden">
                    {positions.map((p, idx) => {
                      const inst = instruments.find((i) => i.symbol === p.symbol);
                      const curPrice = inst ? inst.price : p.avgEntryPrice;
                      const pnl = (curPrice - p.avgEntryPrice) * p.shares;
                      const isProfit = pnl >= 0;

                      return (
                        <div
                          key={idx}
                          className="p-3 bg-white dark:bg-[#131722] flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm">{p.symbol}</span>
                              <span className="px-1.5 py-0.5 rounded bg-[#f0f3fa] dark:bg-[#1e222d] text-[10px] font-semibold text-[#2962ff]">
                                {p.type} {p.shares} shs
                              </span>
                            </div>
                            <span className="text-[#787b86] text-[11px]">
                              Entry: ${p.avgEntryPrice.toFixed(2)} • Time: {p.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <span className="font-semibold tv-mono block">${(p.shares * curPrice).toFixed(2)}</span>
                              <span className={`tv-mono font-medium ${isProfit ? 'tv-green-text' : 'tv-red-text'}`}>
                                {isProfit ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`}
                              </span>
                            </div>

                            <button
                              onClick={() => onClosePosition(idx)}
                              title="Close / Liquidate Position"
                              className="p-1.5 text-[#787b86] hover:text-[#f23645] hover:bg-[#f23645]/10 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed border-[#d1d4dc] dark:border-[#363a45] rounded-xl text-xs text-[#787b86]">
                    No open paper trading positions. Open any stock or index to place a simulated paper trade!
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'watchlist' && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#787b86] uppercase tracking-wider mb-2">
                Priority Watchlist
              </h3>
              <div className="divide-y divide-[#f0f3fa] dark:divide-[#2a2e39] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl overflow-hidden">
                {instruments.slice(0, 6).map((inst) => (
                  <div
                    key={inst.id}
                    onClick={() => {
                      onSelectInstrument(inst);
                      onClose();
                    }}
                    className="p-3 bg-white dark:bg-[#131722] hover:bg-[#fafbfd] dark:hover:bg-[#1e222d] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        style={{ backgroundColor: inst.badge.bg, color: inst.badge.color || '#fff' }}
                        className="w-7 h-7 rounded-md text-xs font-bold flex items-center justify-center shrink-0"
                      >
                        {inst.badge.text}
                      </span>
                      <div>
                        <div className="font-bold text-xs">{inst.symbol}</div>
                        <div className="text-[11px] text-[#787b86]">{inst.name}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-semibold tv-mono">${inst.price.toFixed(2)}</div>
                      <div className={`text-[11px] tv-mono ${inst.chgPct >= 0 ? 'tv-green-text' : 'tv-red-text'}`}>
                        {inst.chgPct >= 0 ? `+${inst.chgPct.toFixed(2)}%` : `${inst.chgPct.toFixed(2)}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
