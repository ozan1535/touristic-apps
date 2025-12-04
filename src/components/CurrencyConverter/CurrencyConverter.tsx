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
              <span className="font-semibold overflow-scroll">
                {convertedAmount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
