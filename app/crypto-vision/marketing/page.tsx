"use client";
import {toast, ToastContainer} from 'react-toastify'
import React, { useEffect, useState } from "react";
import { TrendingUp, Bitcoin, DollarSign, Plus, X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

// Binance ticker interface from WebSocket messages
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  q: string; // Quote volume
  h: string; // High price
  l: string; // Low price
}

// MarketData type for displaying each coin's data
interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  volume: string;
  chartData: number[];
}

// Define a type for symbol info objects
interface SymbolInfo {
  symbol: string;
  pair: string;
  name: string;
}

const cryptoIcons: { [key: string]: React.ElementType } = {
  BTC: Bitcoin,
  ETH: DollarSign,
  ADA: DollarSign,
};

const MarketPage: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackedSymbols, setTrackedSymbols] = useState<SymbolInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableCoins, setAvailableCoins] = useState<SymbolInfo[]>([]);

  // Fetch available coins from Binance API
  useEffect(() => {
    const fetchAvailableCoins = async () => {
      try {
        const response = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
        const symbols = response.data.symbols
          .filter((s: any) => s.quoteAsset === "USDT" && s.status === "TRADING")
          .map((s: any) => ({
            symbol: s.baseAsset,
            pair: s.symbol,
            name: s.baseAsset,
          }));
        setAvailableCoins(symbols);
      } catch (err) {
        console.error("Error fetching available coins:", err);
      }
    };

    fetchAvailableCoins();
  }, []);

  // Update tracked symbols in local storage


  // Load trackedSymbols from localStorage after the component mounts (client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSymbols = JSON.parse(localStorage.getItem("trackedSymbols") || "[]");
      setTrackedSymbols(storedSymbols);
    }
  }, []);
  
  // Fetch initial market data whenever the trackedSymbols array changes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const responses = await Promise.all(
          trackedSymbols.map(({ pair }) =>
            axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`)
          )
        );

        const formattedData = responses.map((res, index) => ({
          symbol: trackedSymbols[index].symbol,
          name: trackedSymbols[index].name,
          price: parseFloat(res.data.lastPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          }),
          change: `${parseFloat(res.data.priceChangePercent).toFixed(2)}%`,
          volume: `$${parseFloat(res.data.quoteVolume).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`,
          chartData: [
            parseFloat(res.data.lowPrice),
            parseFloat(res.data.highPrice),
            parseFloat(res.data.lastPrice),
          ],
        }));

        setMarketData(formattedData);
        setLoading(false);
      } catch (err) {
       
        setError("Failed to fetch market data");
        toast.error(error)
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [trackedSymbols]);

  // Set up Binance WebSocket for live market updates
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onmessage = (message) => {
      const data: BinanceTicker[] = JSON.parse(message.data);

      setMarketData((prev) =>
        prev.map((coin) => {
          const update = data.find((d) => d.s === `${coin.symbol}USDT`);
          if (!update) return coin;

          return {
            ...coin,
            price: parseFloat(update.c).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            }),
            change: `${parseFloat(update.P).toFixed(2)}%`,
            volume: `$${parseFloat(update.q).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`,
            chartData: [
              parseFloat(update.l),
              parseFloat(update.h),
              parseFloat(update.c),
            ],
          };
        })
      );
    };

    return () => ws.close();
  }, []);

  // Add a new symbol to trackedSymbols
  const addItem = (symbol: string) => {
    const pair = `${symbol}USDT`;
    const existingSymbol = trackedSymbols.some((item) => item.symbol === symbol);

    if (!existingSymbol) {
      setTrackedSymbols((prev) => [...prev, { symbol, pair, name: symbol }]);
    }
  };

  // Remove a symbol from trackedSymbols
  const removeItem = (symbol: string) => {
    setTrackedSymbols((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  // Filter available coins based on search query
  const filteredCoins = availableCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-purple-400" />
          Live Market Data (USDT)
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a coin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
          {searchQuery && (
            <div className="mt-2 max-h-60 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="p-3 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    addItem(coin.symbol);
                    setSearchQuery("");
                  }}
                >
                  <span className="text-white">{coin.name}</span>
                  <Plus className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {["Coin", "Price", "24h Change", "Volume", "Action"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-gray-900">
              {marketData.map((coin, index) => {
                const Icon = cryptoIcons[coin.symbol] || DollarSign;
                const isPositive = !coin.change.startsWith("-");

                return (
                  <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-yellow-400" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {coin.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {coin.symbol}/USDT
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ${coin.price}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {coin.change}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {coin.volume}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeItem(coin.symbol)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Error and Loading States */}
        {loading && (
          <div className="mt-8 text-white">Loading...</div>
        )}
        {error && (
          <div className="mt-8 text-red-500">{error} {toast.error(error)}</div>
        )}
      </div>
        <ToastContainer/>
    </div>
  );
};

export default MarketPage;