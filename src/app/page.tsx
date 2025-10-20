import AppDetails from "@/components/Dialog/AppDetails";
import WorldMap from "@/components/NoSsr/WorldMap/WorldMap";
import RotatingWorldChart from "@/components/RotatingWorldChart/RotatingWorldChart";
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
      <h1 className="text-3xl md:text-5xl font-black text-center text-purple-primary">
        GlobalAppGuide
      </h1>

      <p className="text-center text-secondary my-3 md:my-8">
        Your ultimate companion for navigating life abroad. Discover essential
        apps and local prices for any country.
      </p>
      <div className="flex justify-center items-center w-full text-center">
        <div className="w-full md:w-[50%]">
          <SearchCountry />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <RotatingWorldChart />
      </div>
    </div>
  );
}
