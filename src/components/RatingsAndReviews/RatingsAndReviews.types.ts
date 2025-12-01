import { Dispatch, SetStateAction } from "react";
import { ICountry } from "../CountryBanner/CountryBanner.types";

export interface IInformation {
  averageRating: string;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  totalRatings: number;
  reviews: IReview[];
  t: any;
}

export interface ISendReview {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  review: string;
  setReview: Dispatch<SetStateAction<string>>;
  currentCountry: ICountry;
  t: any;
}

type IProfile = {
  picture: string;
  name: string;
  username: string;
};

export interface IReview {
  id: number;
  created_at: string;
  country_cca2: string;
  star: number;
  review: string;
  user_id: string;
  is_approved: boolean;
  profiles: IProfile;
}

export interface IRatingsAndReviewsProps {
  currentCountry: ICountry;
  reviews: IReview[];
}
