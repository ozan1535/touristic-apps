import { IApp } from "../TopApps/TopApps.types";
import { IIconType } from "./AppDetailCard.types";

export const getLinks = (
  appDetail: IApp,
  ArrowUpRight: IIconType,
  Play: IIconType,
  Apple: IIconType
) => {
  return [
    { href: appDetail.website_url, Icon: ArrowUpRight, label: "Website" },
    { href: appDetail.play_store_url, Icon: Play, label: "Play Store" },
    { href: appDetail.app_store_url, Icon: Apple, label: "App Store" },
  ];
};
