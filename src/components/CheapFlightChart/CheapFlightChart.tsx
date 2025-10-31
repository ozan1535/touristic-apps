"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CheapFlightChart({ value = 50 }) {
  const t = useTranslations("CheapFlightChart");
  const option = {
    backgroundColor: "transparent",
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: "90%",
        center: ["50%", "70%"],
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.2, "#dc2626"],
              [0.4, "#ea580c"],
              [0.6, "#f59e0b"],
              [0.8, "#84cc16"],
              [1, "#22c55e"],
            ],
          },
        },
        pointer: {
          length: "75%",
          width: 6,
          offsetCenter: [0, 0],
          itemStyle: {
            color: "#ffffff",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 8,
            shadowOffsetY: 2,
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 15,
          lineStyle: {
            color: "#fff",
            width: 3,
          },
        },
        axisLabel: {
          distance: 50,
          color: "#ffffff",
          fontSize: 14,
          fontWeight: "bold",
          formatter: function (value: number) {
            if (value === 0) return t("expensive");
            if (value === 50) return t("average");
            if (value === 100) return t("cheap");
            return "";
          },
        },
        detail: {
          valueAnimation: true,
          formatter: function (value: number) {
            if (value < 20) return t("veryExpensive");
            if (value < 40) return t("expensive");
            if (value < 60) return t("average");
            if (value < 80) return t("affordable");
            return t("veryAffordable");
          },
          color: "#ffffff",
          fontSize: 20,
          fontWeight: "bold",
          offsetCenter: [0, "20%"],
        },
        title: {
          offsetCenter: [0, "-30%"],
          fontSize: 16,
          color: "#ffffff",
          fontWeight: "500",
        },
        data: [
          {
            value,
            // name: "Flight Price Level",
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full border border-purple-400/25 rounded-xl p-6 bg-slate-700/20 backdrop-blur-sm shadow-xl mt-5">
      <h1 className="text-center text-white font-bold text-2xl flex justify-center items-center gap-2">
        <Plane size={24} /> <span>{t("title")}</span>
      </h1>
      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
