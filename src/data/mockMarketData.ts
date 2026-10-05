import { MarketInstrument, KeyCurrencyCommodityItem, Candle } from '../types/market';

export const INITIAL_TOP_INDICES: MarketInstrument[] = [
  {
    id: 'sp500',
    symbol: 'S&P 500',
    name: 'S&P 500',
    ticker: 'SPX',
    exchange: 'US500 • CBOE',
    category: 'us_stocks',
    region: 'US',
    price: 5983.99,
    chg: 22.70,
    chgPct: 0.38,
    badge: { text: '500', bg: '#f23645', color: '#ffffff' },
    sparkline: [5961, 5968, 5963, 5974, 5971, 5980, 5977, 5983.99],
    high24h: 5991.45,
    low24h: 5958.20,
    volume: '3.82B',
    fiftyTwoWeekHigh: 6025.50,
    fiftyTwoWeekLow: 4953.56,
    description: 'Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.'
  },
  {
    id: 'nasdaq100',
    symbol: 'Nasdaq 100',
    name: 'Nasdaq 100',
    ticker: 'NDX',
    exchange: 'NDX • NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 20911.23,
    chg: 128.45,
    chgPct: 0.62,
    badge: { text: '100', bg: '#00897b', color: '#ffffff' },
    sparkline: [20782, 20810, 20795, 20860, 20850, 20890, 20880, 20911.23],
    high24h: 20950.12,
    low24h: 20755.80,
    volume: '5.14B',
    fiftyTwoWeekHigh: 21182.00,
    fiftyTwoWeekLow: 16973.90,
    description: 'The Nasdaq-100 is a stock market index made up of 101 equity securities issued by 100 of the largest non-financial companies listed on the Nasdaq.'
  },
  {
    id: 'dow30',
    symbol: 'Dow 30',
    name: 'Dow 30',
    ticker: 'DJI',
    exchange: 'DJI • INDEX',
    category: 'us_stocks',
    region: 'US',
    price: 43910.98,
    chg: -92.14,
    chgPct: -0.21,
    badge: { text: '30', bg: '#0288d1', color: '#ffffff' },
    sparkline: [44003, 43980, 44010, 43950, 43930, 43890, 43920, 43910.98],
    high24h: 44115.30,
    low24h: 43860.10,
    volume: '342M',
    fiftyTwoWeekHigh: 44486.72,
    fiftyTwoWeekLow: 37122.95,
    description: 'The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the US.'
  }
];

export const GLOBAL_INDICES_TABLE: MarketInstrument[] = [
  {
    id: 'sp500-table',
    symbol: 'S&P 500',
    name: 'S&P 500',
    ticker: 'SPX',
    exchange: 'US500 • CBOE',
    category: 'us_stocks',
    region: 'US',
    price: 5983.99,
    chg: 22.70,
    chgPct: 0.38,
    badge: { text: 'SP', bg: '#fee2e2', color: '#f23645' },
    sparkline: [18, 15, 20, 10, 12, 4],
    high24h: 5991.45,
    low24h: 5958.20,
    volume: '3.82B',
    fiftyTwoWeekHigh: 6025.50,
    fiftyTwoWeekLow: 4953.56,
    description: 'Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.'
  },
  {
    id: 'nasdaq100-table',
    symbol: 'Nasdaq 100',
    name: 'Nasdaq 100',
    ticker: 'NDX',
    exchange: 'NDX • NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 20911.23,
    chg: 128.45,
    chgPct: 0.62,
    badge: { text: 'ND', bg: '#ccfbf1', color: '#00897b' },
    sparkline: [20, 16, 18, 8, 10, 2],
    high24h: 20950.12,
    low24h: 20755.80,
    volume: '5.14B',
    fiftyTwoWeekHigh: 21182.00,
    fiftyTwoWeekLow: 16973.90,
    description: 'The Nasdaq-100 is a stock market index made up of 101 equity securities issued by 100 of the largest non-financial companies listed on the Nasdaq.'
  },
  {
    id: 'dow30-table',
    symbol: 'Dow 30',
    name: 'Dow 30',
    ticker: 'DJI',
    exchange: 'DJI • INDEX',
    category: 'us_stocks',
    region: 'US',
    price: 43910.98,
    chg: -92.14,
    chgPct: -0.21,
    badge: { text: 'DJ', bg: '#e0f2fe', color: '#0288d1' },
    sparkline: [5, 8, 6, 18, 15, 22],
    high24h: 44115.30,
    low24h: 43860.10,
    volume: '342M',
    fiftyTwoWeekHigh: 44486.72,
    fiftyTwoWeekLow: 37122.95,
    description: 'The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the US.'
  },
  {
    id: 'nikkei225-table',
    symbol: 'Nikkei 225',
    name: 'Nikkei 225',
    ticker: 'NI225',
    exchange: 'NI225 • TOKYO',
    category: 'world_stocks',
    region: 'Asia',
    price: 38642.91,
    chg: 107.21,
    chgPct: 0.28,
    badge: { text: 'NI', bg: '#ffedd5', color: '#ea580c' },
    sparkline: [15, 12, 16, 8, 5, 3],
    high24h: 38810.00,
    low24h: 38450.20,
    volume: '1.45B',
    fiftyTwoWeekHigh: 42426.77,
    fiftyTwoWeekLow: 31156.12,
    description: 'The Nikkei 225 is a stock market index for the Tokyo Stock Exchange (TSE), calculated daily by the Nihon Keizai Shimbun newspaper.'
  },
  {
    id: 'dax40-table',
    symbol: 'DAX 40',
    name: 'DAX 40',
    ticker: 'DAX',
    exchange: 'DAX • XETRA',
    category: 'world_stocks',
    region: 'Europe',
    price: 19254.97,
    chg: 248.10,
    chgPct: 1.30,
    badge: { text: 'DX', bg: '#f1f5f9', color: '#334155' },
    sparkline: [22, 18, 14, 7, 2, 1],
    high24h: 19310.40,
    low24h: 19020.10,
    volume: '98M',
    fiftyTwoWeekHigh: 19674.68,
    fiftyTwoWeekLow: 14630.21,
    description: 'The DAX is a blue chip stock market index consisting of 40 major German companies trading on the Frankfurt Stock Exchange.'
  },
  {
    id: 'ftse100-table',
    symbol: 'FTSE 100',
    name: 'FTSE 100',
    ticker: 'UK100',
    exchange: 'FTSE • LSE',
    category: 'world_stocks',
    region: 'Europe',
    price: 8382.40,
    chg: 14.90,
    chgPct: 0.18,
    badge: { text: 'FT', bg: '#f3e8ff', color: '#7e22ce' },
    sparkline: [14, 16, 12, 11, 8, 6],
    high24h: 8405.10,
    low24h: 8360.20,
    volume: '654M',
    fiftyTwoWeekHigh: 8474.41,
    fiftyTwoWeekLow: 7384.60,
    description: 'The Financial Times Stock Exchange 100 Index is a share index of the 100 companies listed on the London Stock Exchange with the highest market capitalization.'
  },
  {
    id: 'cac40-table',
    symbol: 'CAC 40',
    name: 'CAC 40',
    ticker: 'PX1',
    exchange: 'CAC • EURONEXT',
    category: 'world_stocks',
    region: 'Europe',
    price: 7421.50,
    chg: 33.15,
    chgPct: 0.45,
    badge: { text: 'CA', bg: '#e0e7ff', color: '#4338ca' },
    sparkline: [17, 19, 15, 12, 9, 7],
    high24h: 7445.80,
    low24h: 7390.20,
    volume: '78M',
    fiftyTwoWeekHigh: 8259.19,
    fiftyTwoWeekLow: 6773.80,
    description: 'The CAC 40 is a benchmark French stock market index representing the top 40 equities on Euronext Paris.'
  }
];

export const MOST_ACTIVE_STOCKS: MarketInstrument[] = [
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    ticker: 'NVDA',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 141.54,
    chg: 5.60,
    chgPct: 4.12,
    badge: { text: 'NV', bg: '#76b900', color: '#ffffff', isSquare: true },
    sparkline: [136, 137.5, 139, 138.8, 140.2, 141.54],
    high24h: 142.80,
    low24h: 136.20,
    volume: '78.4M',
    marketCap: '$3.48T',
    peRatio: 48.2,
    dividend: '0.03%',
    fiftyTwoWeekHigh: 149.77,
    fiftyTwoWeekLow: 45.11,
    sector: 'Semiconductors',
    description: 'NVIDIA Corporation designs graphics processing units for the gaming and professional markets, as well as system on a chip units for the mobile computing and automotive market.'
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 228.28,
    chg: 3.12,
    chgPct: 1.38,
    badge: { text: 'AP', bg: '#111827', color: '#ffffff', isSquare: true },
    sparkline: [225.1, 226, 225.8, 227.4, 228, 228.28],
    high24h: 229.50,
    low24h: 224.80,
    volume: '45.2M',
    marketCap: '$3.46T',
    peRatio: 34.8,
    dividend: '0.44%',
    fiftyTwoWeekHigh: 237.23,
    fiftyTwoWeekLow: 164.08,
    sector: 'Consumer Electronics',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services.'
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc',
    ticker: 'TSLA',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 342.77,
    chg: -8.62,
    chgPct: -2.45,
    badge: { text: 'TS', bg: '#e82127', color: '#ffffff', isSquare: true },
    sparkline: [351.4, 349, 350.2, 345, 344.1, 342.77],
    high24h: 354.20,
    low24h: 340.50,
    volume: '62.1M',
    marketCap: '$1.09T',
    peRatio: 92.4,
    dividend: 'N/A',
    fiftyTwoWeekHigh: 358.64,
    fiftyTwoWeekLow: 138.80,
    sector: 'Automotive & Clean Energy',
    description: 'Tesla, Inc. designs, develops, manufactures, sells, and leases electric vehicles, energy storage systems, and solar panels.'
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    ticker: 'MSFT',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 422.54,
    chg: 3.44,
    chgPct: 0.82,
    badge: { text: 'MS', bg: '#00a4ef', color: '#ffffff', isSquare: true },
    sparkline: [419.1, 420.5, 419.8, 421.9, 422, 422.54],
    high24h: 424.30,
    low24h: 418.50,
    volume: '22.8M',
    marketCap: '$3.14T',
    peRatio: 32.6,
    dividend: '0.71%',
    fiftyTwoWeekHigh: 468.35,
    fiftyTwoWeekLow: 366.50,
    sector: 'Software & Cloud',
    description: 'Microsoft Corporation produces computer software, consumer electronics, personal computers, and related services, including Azure cloud and Windows.'
  },
  {
    id: 'amzn',
    symbol: 'AMZN',
    name: 'Amazon.com Inc',
    ticker: 'AMZN',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 208.15,
    chg: 3.36,
    chgPct: 1.64,
    badge: { text: 'AM', bg: '#ff9900', color: '#ffffff', isSquare: true },
    sparkline: [204.8, 205.5, 206.2, 207.1, 208.15],
    high24h: 209.40,
    low24h: 204.20,
    volume: '31.4M',
    marketCap: '$2.19T',
    peRatio: 42.1,
    dividend: 'N/A',
    fiftyTwoWeekHigh: 215.90,
    fiftyTwoWeekLow: 118.35,
    sector: 'E-Commerce & Cloud',
    description: 'Amazon.com, Inc. focuses on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.'
  },
  {
    id: 'googl',
    symbol: 'GOOGL',
    name: 'Alphabet Inc',
    ticker: 'GOOGL',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 178.90,
    chg: 0.80,
    chgPct: 0.45,
    badge: { text: 'GO', bg: '#4285f4', color: '#ffffff', isSquare: true },
    sparkline: [178.1, 178.5, 178.2, 179.1, 178.90],
    high24h: 179.80,
    low24h: 177.50,
    volume: '19.3M',
    marketCap: '$2.22T',
    peRatio: 24.5,
    dividend: '0.45%',
    fiftyTwoWeekHigh: 191.75,
    fiftyTwoWeekLow: 129.40,
    sector: 'Internet Services',
    description: 'Alphabet Inc. is a multinational technology conglomerate holding company created through a restructuring of Google.'
  },
  {
    id: 'meta',
    symbol: 'META',
    name: 'Meta Platforms',
    ticker: 'META',
    exchange: 'NASDAQ',
    category: 'us_stocks',
    region: 'US',
    price: 592.10,
    chg: 12.65,
    chgPct: 2.18,
    badge: { text: 'ME', bg: '#0668e1', color: '#ffffff', isSquare: true },
    sparkline: [579.4, 583.1, 586.2, 590.1, 592.10],
    high24h: 595.80,
    low24h: 578.20,
    volume: '14.7M',
    marketCap: '$1.50T',
    peRatio: 27.9,
    dividend: '0.34%',
    fiftyTwoWeekHigh: 602.95,
    fiftyTwoWeekLow: 279.40,
    sector: 'Social Media',
    description: 'Meta Platforms, Inc. builds technologies that help people connect, find communities, and grow businesses across Facebook, Instagram, WhatsApp.'
  }
];

export const KEY_CURRENCIES_COMMODITIES: Record<'Currencies' | 'Commodities' | 'Crypto', KeyCurrencyCommodityItem[]> = {
  Currencies: [
    {
      id: 'eurusd',
      pair: 'EUR/USD',
      label: 'Euro / US Dollar',
      price: 1.05412,
      chgPct: -0.14,
      type: 'Currencies',
      sparkline: [1.056, 1.0552, 1.0558, 1.0545, 1.05412]
    },
    {
      id: 'usdjpy',
      pair: 'USD/JPY',
      label: 'US Dollar / Japanese Yen',
      price: 154.680,
      chgPct: 0.48,
      type: 'Currencies',
      sparkline: [153.94, 154.20, 154.10, 154.55, 154.68]
    },
    {
      id: 'gbpusd',
      pair: 'GBP/USD',
      label: 'British Pound / US Dollar',
      price: 1.26120,
      chgPct: -0.22,
      type: 'Currencies',
      sparkline: [1.264, 1.263, 1.2625, 1.2618, 1.2612]
    },
    {
      id: 'usdcad',
      pair: 'USD/CAD',
      label: 'US Dollar / Canadian Dollar',
      price: 1.39850,
      chgPct: 0.18,
      type: 'Currencies',
      sparkline: [1.396, 1.397, 1.3968, 1.398, 1.3985]
    }
  ],
  Commodities: [
    {
      id: 'xauusd',
      pair: 'Gold (XAU/USD)',
      label: 'Troy Ounce / USD',
      price: 2654.80,
      chgPct: 0.75,
      type: 'Commodities',
      sparkline: [2635, 2642, 2638, 2650, 2654.80]
    },
    {
      id: 'xagusd',
      pair: 'Silver (XAG/USD)',
      label: 'Troy Ounce / USD',
      price: 31.42,
      chgPct: 1.15,
      type: 'Commodities',
      sparkline: [31.06, 31.15, 31.25, 31.35, 31.42]
    },
    {
      id: 'cl1',
      pair: 'Crude Oil WTI',
      label: 'USD / Barrel',
      price: 68.90,
      chgPct: -1.25,
      type: 'Commodities',
      sparkline: [69.77, 69.40, 69.10, 68.85, 68.90]
    },
    {
      id: 'ng1',
      pair: 'Natural Gas',
      label: 'USD / MMBtu',
      price: 3.24,
      chgPct: 4.50,
      type: 'Commodities',
      sparkline: [3.10, 3.14, 3.18, 3.22, 3.24]
    }
  ],
  Crypto: [
    {
      id: 'btcusd',
      pair: 'BTC/USD',
      label: 'Bitcoin / US Dollar',
      price: 91420.00,
      chgPct: 2.84,
      type: 'Crypto',
      sparkline: [88890, 89500, 90200, 90800, 91420]
    },
    {
      id: 'ethusd',
      pair: 'ETH/USD',
      label: 'Ethereum / US Dollar',
      price: 3412.50,
      chgPct: 3.10,
      type: 'Crypto',
      sparkline: [3310, 3345, 3370, 3400, 3412.5]
    },
    {
      id: 'solusd',
      pair: 'SOL/USD',
      label: 'Solana / US Dollar',
      price: 218.40,
      chgPct: 5.65,
      type: 'Crypto',
      sparkline: [206.7, 210.2, 213.5, 216.8, 218.4]
    },
    {
      id: 'xrpusd',
      pair: 'XRP/USD',
      label: 'Ripple / US Dollar',
      price: 1.482,
      chgPct: 8.90,
      type: 'Crypto',
      sparkline: [1.361, 1.39, 1.42, 1.45, 1.482]
    }
  ]
};

// Generate realistic simulated candles for any instrument and timeframe
export function generateCandlesForInstrument(basePrice: number, timeframe: string): Candle[] {
  let count = 30;
  let volatility = basePrice * 0.006;
  const now = Date.now();
  let stepMs = 60 * 1000;

  if (timeframe === '1D') {
    count = 36;
    stepMs = 15 * 60 * 1000;
  } else if (timeframe === '5D') {
    count = 40;
    stepMs = 3 * 3600 * 1000;
    volatility = basePrice * 0.012;
  } else if (timeframe === '1M') {
    count = 30;
    stepMs = 24 * 3600 * 1000;
    volatility = basePrice * 0.025;
  } else if (timeframe === '1Y') {
    count = 52;
    stepMs = 7 * 24 * 3600 * 1000;
    volatility = basePrice * 0.06;
  } else {
    count = 48;
    stepMs = 30 * 24 * 3600 * 1000;
    volatility = basePrice * 0.12;
  }

  const candles: Candle[] = [];
  let current = basePrice * 0.95;

  for (let i = 0; i < count; i++) {
    const timeVal = new Date(now - (count - i) * stepMs);
    const timeLabel = timeframe === '1D'
      ? timeVal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : timeVal.toLocaleDateString([], { month: 'short', day: 'numeric' });

    const delta = (Math.random() - 0.48) * volatility;
    const open = current;
    const close = i === count - 1 ? basePrice : open + delta;
    const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
    const volume = Math.floor(Math.random() * 800000 + 200000);

    candles.push({
      time: timeLabel,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    current = close;
  }

  return candles;
}
