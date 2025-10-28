export interface IPriceItem {
  id: string;
  created_at: string;
  country_cca2: string;
  language: string;
  title: string;
  price: number;
  component: string;
  description: string;
}

export interface IPriceGuideProps {
  priceGuide: IPriceItem[];
}
