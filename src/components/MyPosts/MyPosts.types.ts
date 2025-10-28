import { IUserData } from "../EditProfile/EditProfile.types";

export interface IPost {
  id: number;
  post: string;
  created_at: string;
}

export interface IMyPostsProps {
  posts: IPost[];
  userData: IUserData;
  isOwner: boolean;
}
