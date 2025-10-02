// Tooltip doesnt work if you zoom in

// "use client";
// import React, { MouseEvent, useCallback, useState } from "react";
// import { allCountries } from "@/lib/helpers";
// import { WorldMap } from "react-svg-worldmap";
// import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   handleMouseDown,
//   handleMouseMove,
//   handleMouseUp,
//   handleReset,
//   handleWheel,
//   handleZoomIn,
//   handleZoomOut,
// } from "./helpers";
// import { useLanguage } from "@/app/context/SelectedLanguage";

// function WorldMapComponent() {
//   const { language } = useLanguage();
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const data = allCountries.map((item) => ({
//     country: item.cca2,
//     value: 1,
//   }));

//   const clickAction = useCallback(
//     (
//       event: MouseEvent<SVGElement, MouseEvent>,
//       countryName: string,
//       isoCode: string,
//       value: string,
//       prefix: string,
//       suffix: string
//     ) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set("country", isoCode.toLocaleLowerCase());

//       router.replace(`?${params.toString()}`);
//     },
//     [searchParams, router]
//   );

//   const getTooltipText = useCallback(
//     (context: string, shortName: string) => {
//       return allCountries.find((item) => item.cca2 === shortName)?.name[
//         language
//       ];
//     },
//     [language]
//   );
//   /*
//   const handleZoomIn = () => {
//     setScale((prev) => Math.min(prev + 0.3, 3));
//   };

//   const handleZoomOut = () => {
//     setScale((prev) => Math.max(prev - 0.3, 1));
//   };

//   const handleReset = () => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (scale > 1) {
//       setIsDragging(true);
//       setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (isDragging && scale > 1) {
//       setPosition({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y,
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleWheel = (e: React.WheelEvent) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.1 : 0.1;
//     setScale((prev) => Math.max(1, Math.min(prev + delta, 3)));
//   }; */

//   return (
//     <div className="relative w-full">
//       <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
//         <button
//           onClick={() => handleZoomIn(setScale)}
//           className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
//           title={language === "en" ? "Zoom In" : "Yaklaştır"}
//         >
//           <ZoomIn className="w-5 h-5 text-gray-700" />
//         </button>
//         <button
//           onClick={() => handleZoomOut(setScale)}
//           className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
//           title={language === "en" ? "Zoom Out" : "Uzaklaştır"}
//         >
//           <ZoomOut className="w-5 h-5 text-gray-700" />
//         </button>
//         <button
//           onClick={() => handleReset(setScale, setPosition)}
//           className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
//           title={language === "en" ? "Reset View" : "Sıfırla"}
//         >
//           <RotateCcw className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div
//         className="flex justify-center overflow-hidden rounded-lg border border-gray-200 bg-white"
//         onWheel={(e) => handleWheel(e, setScale)}
//         onDoubleClick={() => handleZoomIn(setScale)}
//         onMouseDown={(e) =>
//           handleMouseDown(e, scale, setIsDragging, setDragStart, position)
//         }
//         onMouseMove={(e) =>
//           handleMouseMove(e, isDragging, scale, setPosition, dragStart)
//         }
//         onMouseUp={() => handleMouseUp(setIsDragging)}
//         onMouseLeave={() => handleMouseUp(setIsDragging)}
//         style={{
//           cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
//         }}
//       >
//         <div
//           style={{
//             transform: `scale(${scale}) translate(${position.x / scale}px, ${
//               position.y / scale
//             }px)`,
//             transformOrigin: "center center",
//             transition: isDragging ? "none" : "transform 0.2s ease-out",
//           }}
//         >
//           <WorldMap
//             color="#3b82f6"
//             borderColor="#1e293b"
//             // tooltipBgColor="#1e293b"
//             // tooltipTextColor="#ffffff"
//             size="xl"
//             data={data}
//             onClickFunction={clickAction as () => any}
//             title={language === "en" ? "Select a country" : "Bir ülke seçin"}
//             tooltipTextFunction={getTooltipText}
//             valuePrefix=""
//             valueSuffix=""
//             // tooltipBgColor="transparent"
//             // tooltipTextColor="transparent"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WorldMapComponent;

// Tooltip works if you zoom in
"use client";
import React, { MouseEvent, useCallback, useState } from "react";
import { allCountries } from "@/lib/helpers";
import { WorldMap } from "react-svg-worldmap";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleReset,
  handleWheel,
  handleZoomIn,
  handleZoomOut,
} from "./helpers";
import { useLanguage } from "@/app/context/SelectedLanguage";

function WorldMapComponent() {
  const { language } = useLanguage();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const router = useRouter();
  const searchParams = useSearchParams();

  const data = allCountries.map((item) => ({
    country: item.cca2,
    value: 1,
  }));

  const clickAction = useCallback(
    (
      event: MouseEvent<SVGElement, MouseEvent>,
      countryName: string,
      isoCode: string,
      value: string,
      prefix: string,
      suffix: string
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("country", isoCode.toLocaleLowerCase());

      router.replace(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const getTooltipText = useCallback(
    (context: string, shortName: string) => {
      return (
        allCountries.find((item) => item.cca2 === shortName)?.name[language] ||
        ""
      );
    },
    [language]
  );

  return (
    <div className="relative w-full">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => handleZoomIn(setScale)}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
          title={language === "en" ? "Zoom In" : "Yaklaştır"}
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => handleZoomOut(setScale)}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
          title={language === "en" ? "Zoom Out" : "Uzaklaştır"}
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => handleReset(setScale, setPosition)}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
          title={language === "en" ? "Reset View" : "Sıfırla"}
        >
          <RotateCcw className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div
        className="flex justify-center overflow-hidden rounded-lg border border-gray-200 bg-white"
        onWheel={(e) => handleWheel(e, setScale)}
        onDoubleClick={() => handleZoomIn(setScale)}
        onMouseDown={(e) =>
          handleMouseDown(e, scale, setIsDragging, setDragStart, position)
        }
        onMouseMove={(e) =>
          handleMouseMove(e, isDragging, scale, setPosition, dragStart)
        }
        onMouseUp={() => handleMouseUp(setIsDragging)}
        onMouseLeave={() => handleMouseUp(setIsDragging)}
        style={{
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
      >
        <WorldMap
          color="#3b82f6"
          borderColor="#1e293b"
          size="xl"
          data={data}
          onClickFunction={clickAction as () => any}
          title={language === "en" ? "Select a country" : "Bir ülke seçin"}
          tooltipTextFunction={getTooltipText}
          valuePrefix=""
          valueSuffix=""
        />
      </div>
    </div>
  );
}

export default WorldMapComponent;
