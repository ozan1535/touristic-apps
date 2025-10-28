import { IContribution } from "@/app/[locale]/[countryId]/countryApps.types";
import { ICategoryWithApps } from "../AppsAccordion/types";

export interface ICountryAppsWithFilterProps {
  countryApps: ICategoryWithApps[];
  contributions: IContribution[];
}
