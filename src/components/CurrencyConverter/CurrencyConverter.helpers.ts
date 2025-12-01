import { Dispatch, SetStateAction } from "react";

export const currencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Pound Sterling" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "JPY", name: "Japanese Yen" },
];

export const handleSwapCurrencies = (
  setFromCurrency: Dispatch<SetStateAction<string>>,
  toCurrency: string,
  setToCurrency: Dispatch<SetStateAction<string>>,
  fromCurrency: string
) => {
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
};

export const handleAmountChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAmount: Dispatch<SetStateAction<string>>
) => {
  const value = e.target.value;
  if (value === "" || /^\d*\.?\d*$/.test(value)) {
    setAmount(value);
  }
};
