export type MarketCategory =
  | 'us_stocks'
  | 'world_stocks'
  | 'crypto'
  | 'futures'
  | 'forex'
  | 'bonds'
  | 'etfs'
  | 'economy';

export type MarketRegion = 'Global' | 'US' | 'Europe' | 'Asia' | 'Americas';

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface InstrumentBadge {
  text: string;
  bg: string;
  color?: string;
  isSquare?: boolean;
}

export interface MarketInstrument {
  id: string;
  symbol: string;
  name: string;
  ticker: string;
  exchange: string;
  category: MarketCategory;
  region?: MarketRegion;
  price: number;
  chg: number;
  chgPct: number;
  badge: InstrumentBadge;
  sparkline: number[];
  high24h: number;
  low24h: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  dividend?: string;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  description?: string;
  sector?: string;
  candles?: Record<string, Candle[]>;
  lastTickDirection?: 'up' | 'down';
}

export interface KeyCurrencyCommodityItem {
  id: string;
  pair: string;
  label: string;
  price: number;
  chgPct: number;
  type: 'Currencies' | 'Commodities' | 'Crypto';
  sparkline: number[];
  lastTickDirection?: 'up' | 'down';
}

export interface PaperPosition {
  instrumentId: string;
  symbol: string;
  shares: number;
  avgEntryPrice: number;
  type: 'BUY' | 'SELL';
  timestamp: string;
}
