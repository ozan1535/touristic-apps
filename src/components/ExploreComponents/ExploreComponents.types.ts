export interface IDiscoveryItem {
  id: string;
  created_at: string;
  country: string;
  city: string;
  route: string;
  description: string;
  tag: string;
  country_image_url: string;
  city_image_url: string;
  route_image_url: string;
}

export interface ICountry {
  name: string;
  image_url: string;
}

export interface ICity {
  name: string;
  country: string;
  image_url: string;
}

export interface IRoute {
  id: string;
  discoveryFavoritesId: string;
  title: string;
  description: string;
  tag: string;
  image_url: string;
}

export interface IDiscoveryHeaderProps {
  title: string;
  subtitle: string;
  likedCount: number;
  showBack: boolean;
  onBack: () => void;
}

export interface IEmptyStateProps {
  cityName: string;
  likedRoutes: IRoute[];
  onBackToCity: () => void;
}
