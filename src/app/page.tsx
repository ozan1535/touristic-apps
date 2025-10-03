import AppDetails from "@/components/Dialog/AppDetails";
import WorldMap from "@/components/NoSsr/WorldMap/WorldMap";
import { SearchCountry } from "@/components/SearchCountry/SearchCountry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Touristic App",
  description:
    "A touristic app that guides tourists for each country by suggesting apps",
};

export default function Home() {
  return (
    <div className="h-[90vh] w-full p-10 ">
      <AppDetails />
      <SearchCountry />
      <div className="flex justify-center mt-10">
        <WorldMap />
      </div>
    </div>
  );
}
