import { IUserData } from "../EditProfile/EditProfile.types";

export interface Trip {
  id: number;
  title: string;
  country: string;
  description: string;
  image: string;
  date: string;
  duration: string;
}

export interface MyTripsProps {
  trips: Trip[];
  isOwner: boolean;
  userData: IUserData;
}

export interface TripData {
  id: string;
  title: string;
  picture: string;
  description: string;
  country?: string;
  duration?: string;
  created_at?: string;
  profiles?: {
    name: string;
    username: string;
    picture?: string;
  };
}
