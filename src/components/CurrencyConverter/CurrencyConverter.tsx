/* "use client";
import React, { useState, useEffect } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import {
  currencies,
  handleAmountChange,
  handleSwapCurrencies,
} from "./CurrencyConverter.helpers";
import { ConversionRates } from "./CurrencyConverter.types";
import { useTranslations } from "next-intl";

export default function CurrencyConverter() {
  const t = useTranslations("CountryApps");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("0.00");
  const [rates, setRates] = useState<ConversionRates>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_API_KEY}/latest/${fromCurrency}`
        );
        const data = await response.json();

        if (data.result === "success") {
          setRates(data.conversion_rates);
        } else {
          setError("Failed to fetch exchange rates");
        }
      } catch (err) {
        setError("Error fetching exchange rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (amount && rates[toCurrency]) {
      const result = parseFloat(amount) * rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount("0.00");
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="w-full mx-auto py-5 px-2 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">
          {t("currencyConverter")}
        </h2>
        {rates[toCurrency] && !loading && (
          <p className="text-xs font-bold text-white/90">
            1 {fromCurrency} = {rates[toCurrency].toFixed(4)} {toCurrency}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-xs">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full flex-1 flex items-center gap-2">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-1/2 flex-1  px-1 py-2 bg-white text-black text-sm rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e, setAmount)}
            placeholder="0.00"
            className="w-1/2 px-3 py-2 bg-white text-black text-sm text-right rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() =>
            handleSwapCurrencies(
              setFromCurrency,
              toCurrency,
              setToCurrency,
              fromCurrency
            )
          }
          className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-500 transition-colors flex-shrink-0"
          aria-label="Swap currencies"
        >
          <ArrowRightLeft className="text-white" size={16} />
        </button>

        <div className="w-full flex-1 flex items-center gap-2">
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-1/2 flex-1 px-1 py-2 bg-white text-black text-sm rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          <div className="w-1/2 px-3 py-2 bg-white text-black text-sm text-right rounded-lg border border-indigo-600 flex items-center justify-end">
            {loading ? (
              <Loader2 className="animate-spin text-blue-500" size={16} />
            ) : (
              <span className="font-semibold overflow-scroll no-scrollbar">
                {convertedAmount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 */

"use client";
import React, { useState, useEffect } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import {
  currencies,
  handleAmountChange,
  handleSwapCurrencies,
} from "./CurrencyConverter.helpers";
import { ConversionRates } from "./CurrencyConverter.types";
import { useTranslations } from "next-intl";

export default function CurrencyConverter() {
  const t = useTranslations("CountryApps");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("0.0");
  const [rates, setRates] = useState<ConversionRates>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_API_KEY}/latest/${fromCurrency}`
        );
        const data = await response.json();

        if (data.result === "success") {
          setRates(data.conversion_rates);
        } else {
          setError("Failed to fetch exchange rates");
        }
      } catch (err) {
        setError("Error fetching exchange rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (amount && rates[toCurrency]) {
      const result = parseFloat(amount) * rates[toCurrency];
      setConvertedAmount(result.toFixed(1));
    } else {
      setConvertedAmount("0.0");
    }
  }, [amount, toCurrency, rates]);

  const handleNumberClick = (num: string) => {
    if (num === "." && amount.includes(".")) return;
    setAmount((prev) => prev + num);
  };

  const handleClear = () => {
    setAmount("");
  };

  const handleSwap = () => {
    handleSwapCurrencies(
      setFromCurrency,
      toCurrency,
      setToCurrency,
      fromCurrency
    );
  };

  const displayAmount = amount || "0";

  return (
    <div className="w-full">
      <div className="relative">
        {error && (
          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded text-red-600 text-xs">
            {error}
          </div>
        )}

        <div className="bg-white rounded-t-2xl p-6">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-start mb-1">
              <div className="flex justify-center gap-3">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="text-lg font-semibold text-gray-800 bg-transparent border-none outline-none cursor-pointer appearance-none pr-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_center] bg-no-repeat"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {currencies.find((c) => c.code === fromCurrency)?.name ||
                  fromCurrency}
              </p>
            </div>
            {rates[toCurrency] && !loading && (
              <p className="text-sm text-gray-500 text-right">
                1 {fromCurrency} = {rates[toCurrency].toFixed(4)} {toCurrency}
              </p>
            )}
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold text-gray-800 md:hidden">
              {displayAmount}
            </div>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="hidden md:block w-full text-left text-4xl font-bold text-gray-800 bg-transparent border-none outline-none placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="flex justify-center absolute z-10 top-30 right-20">
          <button
            onClick={handleSwap}
            className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="text-indigo-600 rotate-90" size={20} />
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-2xl p-6">
          <div className="flex flex-col justify-center items-start mb-1">
            <div className="flex items-center gap-3">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="text-lg font-semibold text-gray-800 bg-transparent border-none outline-none cursor-pointer appearance-none pr-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_center] bg-no-repeat"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {currencies.find((c) => c.code === toCurrency)?.name ||
                toCurrency}
            </p>
          </div>
          <div className="text-left">
            {loading ? (
              <div className="flex justify-end items-center h-12">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
              </div>
            ) : (
              <>
                <div className="text-4xl font-bold text-gray-800 overflow-hidden">
                  {convertedAmount}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t rounded-2xl border-gray-200 md:hidden">
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="py-4 text-2xl font-semibold text-gray-800 bg-white rounded-xl shadow hover:shadow-md transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleNumberClick(".")}
            className="py-4 text-2xl font-semibold text-gray-800 bg-white rounded-xl shadow hover:shadow-md transition-all active:scale-95"
          >
            .
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="py-4 text-2xl font-semibold text-gray-800 bg-white rounded-xl shadow hover:shadow-md transition-all active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleClear}
            className="py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow hover:shadow-md transition-all active:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
