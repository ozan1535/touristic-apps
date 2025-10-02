"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: "en" | "tr";
  setLanguage: (language: "en" | "tr") => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: "en" | "tr";
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = "en",
}) => {
  const [language, setLanguage] = useState<"en" | "tr">(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
