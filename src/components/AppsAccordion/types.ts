export interface IAppDetail {
  id: string;
  app_name: string;
  description: string;
  logo_url: string;
  website_url?: string;
  app_store_url?: string;
  play_store_url?: string;
  isTop: boolean;
}

export interface ICategoryWithApps {
  category: string;
  apps: IAppDetail[];
}
