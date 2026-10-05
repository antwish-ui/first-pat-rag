import React, { useState, useMemo, useRef, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, BarChart2, Activity, DollarSign, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MarketInstrument, Candle, PaperPosition } from '../types/market';
import { generateCandlesForInstrument } from '../data/mockMarketData';

interface InstrumentDetailModalProps {
  instrument: MarketInstrument | null;
  onClose: () => void;
  onTradeExecuted?: (position: PaperPosition) => void;
}

type Timeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';
type ChartStyle = 'candles' | 'area';

export const InstrumentDetailModal: React.FC<InstrumentDetailModalProps> = ({
  instrument,
  onClose,
  onTradeExecuted,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('candles');
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [tradeAction, setTradeAction] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeShares, setTradeShares] = useState<number>(10);
  const [tradeSuccessToast, setTradeSuccessToast] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate realistic candles based on instrument and timeframe
  const candles: Candle[] = useMemo(() => {
    if (!instrument) return [];
    return generateCandlesForInstrument(instrument.price, timeframe);
  }, [instrument, timeframe]);

  // Keep modal open handlers and ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!instrument) return null;

  const isPositive = instrument.chgPct >= 0;
  const activeCandle = hoveredCandle || (candles.length > 0 ? candles[candles.length - 1] : null);

  // Chart coordinate calculations
  const chartHeight = 260;
  const chartWidth = 720;
  const volumeHeight = 50;

  const minPrice = Math.min(...candles.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...candles.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;

  const getY = (val: number) => {
    return chartHeight - ((val - minPrice) / priceRange) * (chartHeight - 20) - 10;
  };

  const candleWidth = Math.max(3, (chartWidth / candles.length) * 0.65);
  const stepX = chartWidth / (candles.length - 1 || 1);

  // Area path for line chart
  const areaPoints = candles.map((c, i) => `${(i * stepX).toFixed(1)},${getY(c.close).toFixed(1)}`);
  const areaPath = `M 0,${getY(candles[0]?.close || 0)} ${areaPoints.map((p) => `L ${p}`).join(' ')} L ${(candles.length - 1) * stepX},${chartHeight} L 0,${chartHeight} Z`;
  const linePath = `M 0,${getY(candles[0]?.close || 0)} ${areaPoints.map((p) => `L ${p}`).join(' ')}`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const index = Math.min(candles.length - 1, Math.max(0, Math.round(ratio * (candles.length - 1))));
    setHoveredCandle(candles[index]);
    setHoverPosition({ x, y: getY(candles[index].close) });
  };

  const handleMouseLeave = () => {
    setHoveredCandle(null);
    setHoverPosition(null);
  };

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const total = tradeShares * instrument.price;
    const pos: PaperPosition = {
      instrumentId: instrument.id,
      symbol: instrument.symbol,
      shares: tradeShares,
      avgEntryPrice: instrument.price,
      type: tradeAction,
      timestamp: new Date().toLocaleTimeString(),
    };
    if (onTradeExecuted) {
      onTradeExecuted(pos);
    }
    setTradeSuccessToast(
      `Order Executed: ${tradeAction} ${tradeShares} shares of ${instrument.symbol} @ $${instrument.price.toFixed(2)} ($${total.toLocaleString('en-US', { minimumFractionDigits: 2 })})`
    );
    setTimeout(() => {
      setTradeSuccessToast(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="bg-white dark:bg-[#131722] text-[#131722] dark:text-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#f0f3fa] dark:border-[#2a2e39] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3.5">
            <span
              style={{ backgroundColor: instrument.badge.bg, color: instrument.badge.color || '#fff' }}
              className={`w-9 h-9 ${
                instrument.badge.isSquare ? 'rounded-lg' : 'rounded-full'
              } text-xs font-bold flex items-center justify-center shadow-xs shrink-0`}
            >
              {instrument.badge.text}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold leading-tight">{instrument.symbol}</h2>
                <span className="text-xs text-[#787b86] dark:text-[#848791] font-mono">
                  {instrument.ticker}
                </span>
                <span className="text-[11px] bg-[#f0f3fa] dark:bg-[#1e222d] text-[#787b86] dark:text-[#a0a3ad] px-2 py-0.5 rounded">
                  {instrument.exchange}
                </span>
              </div>
              <p className="text-xs text-[#787b86]">{instrument.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-lg font-bold tv-mono">
                {instrument.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: instrument.price < 5 ? 4 : 2,
                })}
              </div>
              <div className={`text-xs tv-mono font-medium ${isPositive ? 'tv-green-text' : 'tv-red-text'}`}>
                {isPositive ? `+${instrument.chg.toFixed(2)}` : instrument.chg.toFixed(2)} (
                {isPositive ? `+${instrument.chgPct.toFixed(2)}%` : `${instrument.chgPct.toFixed(2)}%`})
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#787b86] hover:text-[#131722] dark:hover:text-white transition-colors cursor-pointer"
              type="button"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success toast notification */}
        {tradeSuccessToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-2 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{tradeSuccessToast}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Controls Bar: Timeframe & Chart Style */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fafbfd] dark:bg-[#1a1e29] p-2.5 rounded-xl border border-[#f0f3fa] dark:border-[#2a2e39]">
            {/* Timeframe Buttons */}
            <div className="flex items-center space-x-1">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white dark:bg-[#2a2e39] text-[#2962ff] shadow-xs'
                      : 'text-[#787b86] dark:text-[#9598a1] hover:text-[#131722] dark:hover:text-white'
                  }`}
                  type="button"
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Candle values readout on hover */}
            {activeCandle && (
              <div className="text-[11px] tv-mono text-[#787b86] dark:text-[#9598a1] hidden md:flex items-center space-x-3">
                <span>{activeCandle.time}</span>
                <span>
                  O: <strong className="text-[#131722] dark:text-white">{activeCandle.open}</strong>
                </span>
                <span>
                  H: <strong className="text-[#131722] dark:text-white">{activeCandle.high}</strong>
                </span>
                <span>
                  L: <strong className="text-[#131722] dark:text-white">{activeCandle.low}</strong>
                </span>
                <span>
                  C:{' '}
                  <strong
                    className={
                      activeCandle.close >= activeCandle.open ? 'tv-green-text' : 'tv-red-text'
                    }
                  >
                    {activeCandle.close}
                  </strong>
                </span>
              </div>
            )}

            {/* Chart Style Switch */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setChartStyle('candles')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  chartStyle === 'candles'
                    ? 'bg-white dark:bg-[#2a2e39] text-[#2962ff] shadow-xs'
                    : 'text-[#787b86] hover:text-[#131722]'
                }`}
                title="Candlestick Chart"
                type="button"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartStyle('area')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  chartStyle === 'area'
                    ? 'bg-white dark:bg-[#2a2e39] text-[#2962ff] shadow-xs'
                    : 'text-[#787b86] hover:text-[#131722]'
                }`}
                title="Line / Area Chart"
                type="button"
              >
                <Activity className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Interactive Chart Canvas */}
          <div className="relative bg-white dark:bg-[#131722] rounded-xl border border-[#f0f3fa] dark:border-[#2a2e39] p-3 select-none">
            {/* Price Scale Indicators */}
            <div className="absolute right-3 top-3 text-[10px] tv-mono text-[#787b86]">
              {maxPrice.toFixed(2)}
            </div>
            <div className="absolute right-3 bottom-16 text-[10px] tv-mono text-[#787b86]">
              {minPrice.toFixed(2)}
            </div>

            <svg
              className="w-full h-64 sm:h-72 cursor-crosshair overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight + volumeHeight}`}
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2962ff" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="0"
                y1={chartHeight * 0.25}
                x2={chartWidth}
                y2={chartHeight * 0.25}
                stroke="currentColor"
                className="text-[#f0f3fa] dark:text-[#222632]"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1={chartHeight * 0.5}
                x2={chartWidth}
                y2={chartHeight * 0.5}
                stroke="currentColor"
                className="text-[#f0f3fa] dark:text-[#222632]"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1={chartHeight * 0.75}
                x2={chartWidth}
                y2={chartHeight * 0.75}
                stroke="currentColor"
                className="text-[#f0f3fa] dark:text-[#222632]"
                strokeDasharray="4 4"
              />

              {/* Volume Bars */}
              {candles.map((c, i) => {
                const x = i * stepX;
                const vHeight = (c.volume / maxVolume) * volumeHeight;
                const y = chartHeight + volumeHeight - vHeight;
                const isBull = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x - candleWidth / 2}
                    y={y}
                    width={candleWidth}
                    height={Math.max(2, vHeight)}
                    fill={isBull ? 'rgba(8, 153, 129, 0.3)' : 'rgba(242, 54, 69, 0.3)'}
                  />
                );
              })}

              {/* Chart Bodies: Candlestick vs Area */}
              {chartStyle === 'area' ? (
                <>
                  <path d={areaPath} fill="url(#areaGradient)" />
                  <path d={linePath} fill="none" stroke="#2962ff" strokeWidth="2" />
                </>
              ) : (
                candles.map((c, i) => {
                  const x = i * stepX;
                  const isBull = c.close >= c.open;
                  const candleColor = isBull ? '#089981' : '#f23645';
                  const highY = getY(c.high);
                  const lowY = getY(c.low);
                  const openY = getY(c.open);
                  const closeY = getY(c.close);
                  const top = Math.min(openY, closeY);
                  const height = Math.max(2, Math.abs(closeY - openY));

                  return (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={candleColor}
                        strokeWidth="1.2"
                      />
                      {/* Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={top}
                        width={candleWidth}
                        height={height}
                        fill={candleColor}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}

              {/* Crosshair on hover */}
              {hoverPosition && (
                <g>
                  <line
                    x1={hoverPosition.x}
                    y1={0}
                    x2={hoverPosition.x}
                    y2={chartHeight + volumeHeight}
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={0}
                    y1={hoverPosition.y}
                    x2={chartWidth}
                    y2={hoverPosition.y}
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={hoverPosition.x}
                    cy={hoverPosition.y}
                    r="4"
                    fill="#2962ff"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Grid of Key Statistics & Technical Gauge */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Key Statistics */}
            <div className="md:col-span-2 bg-[#fafbfd] dark:bg-[#1a1e29] rounded-xl p-4 border border-[#f0f3fa] dark:border-[#2a2e39]">
              <h3 className="text-xs font-bold text-[#787b86] uppercase tracking-wider mb-3">
                Key Market Statistics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#787b86] block text-[11px]">24h High</span>
                  <span className="font-semibold tv-mono">
                    ${instrument.high24h.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">24h Low</span>
                  <span className="font-semibold tv-mono">
                    ${instrument.low24h.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">52-Week High</span>
                  <span className="font-semibold tv-mono">
                    ${instrument.fiftyTwoWeekHigh?.toFixed(2) || (instrument.price * 1.15).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">52-Week Low</span>
                  <span className="font-semibold tv-mono">
                    ${instrument.fiftyTwoWeekLow?.toFixed(2) || (instrument.price * 0.82).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">Volume</span>
                  <span className="font-semibold tv-mono">{instrument.volume}</span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">Market Cap</span>
                  <span className="font-semibold tv-mono">{instrument.marketCap || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">P/E Ratio</span>
                  <span className="font-semibold tv-mono">{instrument.peRatio || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[#787b86] block text-[11px]">Dividend Yield</span>
                  <span className="font-semibold tv-mono">{instrument.dividend || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Technical Analysis Gauge */}
            <div className="bg-[#fafbfd] dark:bg-[#1a1e29] rounded-xl p-4 border border-[#f0f3fa] dark:border-[#2a2e39] flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#787b86] uppercase tracking-wider mb-2">
                  Technical Summary
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#089981]">
                    {instrument.chgPct > 1
                      ? 'Strong Buy'
                      : instrument.chgPct > 0
                      ? 'Buy'
                      : instrument.chgPct > -1
                      ? 'Neutral'
                      : 'Sell'}
                  </span>
                  <span className="text-xs tv-mono text-[#787b86]">14 Indicators</span>
                </div>
              </div>

              {/* Gauge Meter Bar */}
              <div className="space-y-1.5">
                <div className="h-2 rounded-full bg-gradient-to-r from-[#f23645] via-amber-400 to-[#089981] relative">
                  <div
                    style={{
                      left: `${Math.min(95, Math.max(5, ((instrument.chgPct + 3) / 6) * 100))}%`,
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-2 border-[#131722] dark:border-white rounded-full shadow-md transition-all"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#787b86]">
                  <span>Sell</span>
                  <span>Neutral</span>
                  <span>Buy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Paper Trading Execution Panel */}
          <div className="bg-white dark:bg-[#1e222d] rounded-xl p-4 border border-[#e0e3eb] dark:border-[#2a2e39] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-[#2962ff]" />
                <h3 className="font-bold text-sm">Simulated Paper Trading</h3>
              </div>
              <span className="text-xs text-[#787b86]">$100,000 Demo Account</span>
            </div>

            <form onSubmit={handleExecuteTrade} className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-lg overflow-hidden border border-[#d1d4dc] dark:border-[#363a45] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTradeAction('BUY')}
                  className={`px-3 py-2 cursor-pointer transition-colors ${
                    tradeAction === 'BUY'
                      ? 'bg-[#089981] text-white'
                      : 'bg-white dark:bg-[#131722] text-[#787b86]'
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeAction('SELL')}
                  className={`px-3 py-2 cursor-pointer transition-colors ${
                    tradeAction === 'SELL'
                      ? 'bg-[#f23645] text-white'
                      : 'bg-white dark:bg-[#131722] text-[#787b86]'
                  }`}
                >
                  SELL
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs text-[#787b86]">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={tradeShares}
                  onChange={(e) => setTradeShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-2.5 py-1.5 rounded-lg border border-[#d1d4dc] dark:border-[#363a45] bg-white dark:bg-[#131722] text-xs tv-mono font-medium focus:ring-2 focus:ring-[#2962ff] focus:outline-hidden"
                />
              </div>

              <div className="text-xs text-[#787b86] ml-auto">
                Estimated Total:{' '}
                <strong className="text-[#131722] dark:text-white tv-mono">
                  ${(tradeShares * instrument.price).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <button
                type="submit"
                className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition-opacity cursor-pointer shadow-xs ${
                  tradeAction === 'BUY'
                    ? 'bg-[#089981] hover:opacity-90'
                    : 'bg-[#f23645] hover:opacity-90'
                }`}
              >
                Place {tradeAction} Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
