import { IUserData } from "../EditProfile/EditProfile.types";

export interface IProfileSidebarProps {
  userData: IUserData;
  isOwner: boolean;
  postsLength: number;
  tripsLength: number;
}
