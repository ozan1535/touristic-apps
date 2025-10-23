export interface IPriceItem {
  label: string;
  price: string;
  icon: React.ReactNode;
  description?: string;
}

export interface IPriceGuideProps {
  countryId?: string;
}
