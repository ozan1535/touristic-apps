export interface ICountry {
  cca2: string;
  flag: string;
  name: {
    en: string;
    tr: string;
  };
  capital?: string;
  region?: string;
}

export interface ICountryBannerProps {
  picture: string;
  country: ICountry;
  locale: "en" | "tr";
}
