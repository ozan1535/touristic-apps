"use client";
import dynamic from "next/dynamic";
import React from "react";

const NoSSR = dynamic(
  () => import("@/components/WorldMapComponent/WorldMapComponent"),
  { ssr: false }
);

function WorldMap() {
  return <NoSSR />;
}

export default WorldMap;
