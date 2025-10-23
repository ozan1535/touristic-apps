import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

export type IIconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;
