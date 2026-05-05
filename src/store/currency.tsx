import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const API = "https://currency-api-88eg.onrender.com";
const KEY_CURRENCY = "he_currency_v1";
const KEY_RATES = "he_rates_v1";
const STALE_MS = 1000 * 60 * 60 * 6; // 6h

// Base currency the product catalog is priced in.
export const BASE_CURRENCY = "INR" as const;

export const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", label: "Saudi Riyal" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira" },
  { code: "ZAR", symbol: "R", label: "South African Rand" },
  { code: "PKR", symbol: "₨", label: "Pakistani Rupee" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

interface RatesPayload {
  base: string;
  timestamp: string;
  rates: Record<string, number>;
  fetchedAt: number;
}

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  symbol: string;
  rates: Record<string, number> | null;
  loading: boolean;
  error: string | null;
  updatedAt: string | null;
  convert: (amountInBase: number) => number;
  format: (amountInBase: number) => string;
  refresh: () => Promise<void>;
}

const Ctx = createContext<CurrencyState | null>(null);

function symbolFor(code: string) {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code + " ";
}

function loadStored<T>(k: string): T | null {
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem(KEY_CURRENCY)) as CurrencyCode | null;
    return (stored && CURRENCIES.some((c) => c.code === stored) ? stored : "INR") as CurrencyCode;
  });
  const [payload, setPayload] = useState<RatesPayload | null>(() => loadStored<RatesPayload>(KEY_RATES));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem(KEY_CURRENCY, c); } catch { /* ignore */ }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/rates`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const next: RatesPayload = {
        base: data.base,
        timestamp: data.timestamp,
        rates: data.rates,
        fetchedAt: Date.now(),
      };
      setPayload(next);
      try { localStorage.setItem(KEY_RATES, JSON.stringify(next)); } catch { /* ignore */ }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch rates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!payload || Date.now() - payload.fetchedAt > STALE_MS) {
      void refresh();
    }
  }, [payload, refresh]);

  const convert = useCallback(
    (amountInBase: number) => {
      if (currency === BASE_CURRENCY || !payload) return amountInBase;
      const baseRate = payload.rates[BASE_CURRENCY]; // base->EUR ratio anchor
      const targetRate = payload.rates[currency];
      if (!baseRate || !targetRate) return amountInBase;
      // payload rates are per 1 EUR. amount(INR) -> EUR -> target.
      const inEur = amountInBase / baseRate;
      return inEur * targetRate;
    },
    [currency, payload],
  );

  const format = useCallback(
    (amountInBase: number) => {
      const value = convert(amountInBase);
      const sym = symbolFor(currency);
      const noDecimals = currency === "INR" || currency === "JPY" || currency === "PKR";
      const formatted = value.toLocaleString(undefined, {
        minimumFractionDigits: noDecimals ? 0 : 2,
        maximumFractionDigits: noDecimals ? 0 : 2,
      });
      return `${sym}${formatted}`;
    },
    [convert, currency],
  );

  const value: CurrencyState = useMemo(
    () => ({
      currency,
      setCurrency,
      symbol: symbolFor(currency),
      rates: payload?.rates ?? null,
      loading,
      error,
      updatedAt: payload?.timestamp ?? null,
      convert,
      format,
      refresh,
    }),
    [currency, setCurrency, payload, loading, error, convert, format, refresh],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

export function useFormatPrice() {
  return useCurrency().format;
}