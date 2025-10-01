import { Dispatch, SetStateAction } from "react";

export const handleZoomIn = (setScale: Dispatch<SetStateAction<number>>) => {
  setScale((prev) => Math.min(prev + 0.3, 3));
};

export const handleZoomOut = (setScale: Dispatch<SetStateAction<number>>) => {
  setScale((prev) => Math.max(prev - 0.3, 1));
};

export const handleReset = (
  setScale: Dispatch<SetStateAction<number>>,
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >
) => {
  setScale(1);
  setPosition({ x: 0, y: 0 });
};

export const handleMouseDown = (
  e: React.MouseEvent,
  scale: number,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  setDragStart: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  position: {
    x: number;
    y: number;
  }
) => {
  if (scale > 1) {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }
};

export const handleMouseMove = (
  e: React.MouseEvent,
  isDragging: boolean,
  scale: number,
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  dragStart: {
    x: number;
    y: number;
  }
) => {
  if (isDragging && scale > 1) {
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }
};

export const handleMouseUp = (
  setIsDragging: Dispatch<SetStateAction<boolean>>
) => {
  setIsDragging(false);
};

export const handleWheel = (
  e: React.WheelEvent,
  setScale: Dispatch<SetStateAction<number>>
) => {
  // e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  setScale((prev) => Math.max(1, Math.min(prev + delta, 3)));
};
