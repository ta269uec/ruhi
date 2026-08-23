export type Group =
  | "US size & style"
  | "Income & dividend"
  | "International"
  | "Real assets"
  | "Fixed income"
  | "Crypto";
export type Verdict = "CHEAP" | "FAIR" | "RICH";

export interface Etf {
  ticker: string;
  name: string;
  expenseRatio: number; // 0.04 = 0.04%
}

export interface Slice {
  key: string;
  name: string;
  group: Group;
  pct: number; // 0-100 valuation percentile vs. own history — see historyStartYear
  historyStartYear: number; // first year of the percentile history window (2006 for most; later for slices without 20y of data, e.g. crypto)
  fwdPE: string;
  cape: string;
  pb: string; // "—" for slices with no earnings (real assets, fixed income, crypto)
  yld: string; // dividend yield for equities; yield-to-maturity for fixed income
  eps: string; // est. 12m earnings growth
  ath: string; // distance from all-time high
  athDate: string;
  dd: string; // worst drawdown within the history window
  r1: string;
  r3: string;
  r5: string;
  r10: string; // annualised total return
  vol: string; // annual volatility
  corr: string; // correlation to S&P 500
  flow: string; // 12m fund flows
  take: string; // commentary para 1
  take2: string; // commentary para 2, narrative mode only
  risks: string[]; // 3-4 risk factors
  etfs: Etf[]; // 3 per slice
}
