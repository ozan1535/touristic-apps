export interface ICountryPageProp {
  params: {
    countryId: string;
    locale: "en" | "tr";
  };
}

export interface IContribution {
  user_id: string;
  country: string;
  app_name: string;
  description: string;
  created_at: string;
  app_logo: string;
  is_approved: boolean;
  id: string;
}
