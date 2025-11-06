/* "use client";
import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_lang_TR from "@amcharts/amcharts5-geodata/lang/TR";
import am5geodata_lang_EN from "@amcharts/amcharts5-geodata/lang/EN";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function RotatingWorldChart() {
  const language = useLocale();
  const router = useRouter();
  const chartRef = useRef(null);

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
      const data = a.target.dataItem?.dataContext as { id: string };

      router.push(`/${data.id.toLowerCase()}`);
    });

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
 */

"use client";
import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_lang_TR from "@amcharts/amcharts5-geodata/lang/TR";
import am5geodata_lang_EN from "@amcharts/amcharts5-geodata/lang/EN";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function RotatingWorldChart({
  clickShortText,
}: {
  clickShortText: string;
}) {
  const language = useLocale() as "en" | "tr";
  const router = useRouter();
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

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
      fill: am5.color(0x4d9be6),
      stroke: am5.color(0x4d65b4),
      strokeWidth: 0.5,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x4d65b4),
      strokeWidth: 1,
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0xf8f8f8),
    });

    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x4d65b4),
      fillOpacity: 0.2,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    polygonSeries.mapPolygons.template.events.on("click", (event) => {
      const data = event.target.dataItem?.dataContext as
        | { id: string }
        | undefined;
      if (data?.id) {
        router.push(`/${language}/${data.id.toLowerCase()}`);
      }
    });

    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    );
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.15,
      stroke: am5.color(0x8b5cf6),
    });

    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 40000,
      loops: Infinity,
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
      rootRef.current = null;
    };
  }, [language, router]);

  return (
    <div className="w-full">
      <div
        ref={chartRef}
        className="w-full"
        style={{
          height: "500px",
          minHeight: "400px",
        }}
      />
      <p className="text-center text-slate-500 text-sm mt-4">{clickShortText}</p>
    </div>
  );
}
