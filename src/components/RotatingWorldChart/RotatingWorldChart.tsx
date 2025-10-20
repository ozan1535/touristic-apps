"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_lang_TR from "@amcharts/amcharts5-geodata/lang/TR";
import am5geodata_lang_EN from "@amcharts/amcharts5-geodata/lang/EN";
import { useLanguage } from "@/app/context/SelectedLanguage";

export default function RotatingWorldChart() {
  const chartRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    // Create root element
    const root = am5.Root.new(chartRef.current || "");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        geodataNames:
          language === "tr" ? am5geodata_lang_TR : am5geodata_lang_EN,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    // Create series for background fill
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    polygonSeries.mapPolygons.template.events.on("click", (a) => {
      const params = new URLSearchParams(searchParams.toString());
      const data = a.target.dataItem?.dataContext as { id: string };

      params.set("country", data.id.toLowerCase());

      router.replace(`?${params.toString()}`);
    });

    // polygonSeries.mapPolygons.template.events.on("click", function (ev) {
    //   const countryData = ev.target.dataItem.dataContext;
    //   console.log("Clicked country:", countryData);

    //   // You can access country properties like:
    //   // countryData.name - Country name
    //   // countryData.id - Country code (e.g., "US", "GB")

    //   alert(`You clicked on: ${countryData.name}`);

    //   // You can replace the alert with your own logic:
    //   // - Navigate to another page
    //   // - Open a modal
    //   // - Update state
    //   // - Make an API call
    //   // etc.
    // });

    // Create graticule series
    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    );
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.25,
      stroke: root.interfaceColors.get("stroke"),
    });

    // Rotate animation
    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity,
    });

    // Make stuff animate on load
    chart.appear(1000, 100);

    // Cleanup
    return () => {
      root.dispose();
    };
  }, [language]);

  return (
    <div className="w-full max-w-full">
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
}
