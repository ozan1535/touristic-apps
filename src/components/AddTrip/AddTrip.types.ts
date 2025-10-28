import { TripData } from "../MyTrips/MyTrips.types";

export interface ITripDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    kinde_user_id: string;
    username: string;
  };
  tripData?: TripData | null;
  mode?: string;
}

export interface IFormData {
  picture: File | string | null;
  country: string;
  title: string;
  description: string;
  countryCca2?: string;
}
