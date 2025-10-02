// Tooltip doesnt work if you zoom in
// import { Dispatch, SetStateAction } from "react";

// export const handleZoomIn = (setScale: Dispatch<SetStateAction<number>>) => {
//   setScale((prev) => Math.min(prev + 0.3, 3));
// };

// export const handleZoomOut = (setScale: Dispatch<SetStateAction<number>>) => {
//   setScale((prev) => Math.max(prev - 0.3, 1));
// };

// export const handleReset = (
//   setScale: Dispatch<SetStateAction<number>>,
//   setPosition: Dispatch<
//     SetStateAction<{
//       x: number;
//       y: number;
//     }>
//   >
// ) => {
//   setScale(1);
//   setPosition({ x: 0, y: 0 });
// };

// export const handleMouseDown = (
//   e: React.MouseEvent,
//   scale: number,
//   setIsDragging: Dispatch<SetStateAction<boolean>>,
//   setDragStart: Dispatch<
//     SetStateAction<{
//       x: number;
//       y: number;
//     }>
//   >,
//   position: {
//     x: number;
//     y: number;
//   }
// ) => {
//   if (scale > 1) {
//     setIsDragging(true);
//     setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
//   }
// };

// export const handleMouseMove = (
//   e: React.MouseEvent,
//   isDragging: boolean,
//   scale: number,
//   setPosition: Dispatch<
//     SetStateAction<{
//       x: number;
//       y: number;
//     }>
//   >,
//   dragStart: {
//     x: number;
//     y: number;
//   }
// ) => {
//   if (isDragging && scale > 1) {
//     setPosition({
//       x: e.clientX - dragStart.x,
//       y: e.clientY - dragStart.y,
//     });
//   }
// };

// export const handleMouseUp = (
//   setIsDragging: Dispatch<SetStateAction<boolean>>
// ) => {
//   setIsDragging(false);
// };

// export const handleWheel = (
//   e: React.WheelEvent,
//   setScale: Dispatch<SetStateAction<number>>
// ) => {
//   // e.preventDefault();
//   const delta = e.deltaY > 0 ? -0.1 : 0.1;
//   setScale((prev) => Math.max(1, Math.min(prev + delta, 3)));
// };

// ----------------------------------------------------------------------

// Tooltip works if you zoom in

import { Dispatch, SetStateAction } from "react";

const getSvgGroup = (): SVGGElement | null => {
  const svgs = document.querySelectorAll("svg");

  for (const svg of svgs) {
    const g = svg.querySelector(
      'g[transform*="scale"][transform*="translate"]'
    );
    if (g) {
      return g as SVGGElement;
    }
  }

  return null;
};

const parseTransform = (
  g: SVGGElement
): { scale: number; translateX: number; translateY: number } => {
  const transform = g.getAttribute("transform") || "";
  const scaleMatch = transform.match(/scale\(([-\d.]+)\)/);
  const translateMatch = transform.match(
    /translate\s*\(([-\d.]+),\s*([-\d.]+)\)/
  );

  return {
    scale: scaleMatch ? parseFloat(scaleMatch[1]) : 1,
    translateX: translateMatch ? parseFloat(translateMatch[1]) : 0,
    translateY: translateMatch ? parseFloat(translateMatch[2]) : 0,
  };
};

const applyTransform = (
  scale: number,
  translateX: number,
  translateY: number
) => {
  const g = getSvgGroup();
  if (g) {
    g.setAttribute(
      "transform",
      `scale(${scale}) translate(${translateX}, ${translateY})`
    );
  }
};

export const handleZoomIn = (
  setScale: Dispatch<SetStateAction<number>>,
  mouseX?: number,
  mouseY?: number
) => {
  const g = getSvgGroup();
  if (!g) return;

  const current = parseTransform(g);
  const newScale = Math.min(current.scale + 0.3, 3);

  if (mouseX !== undefined && mouseY !== undefined) {
    const svg = g.ownerSVGElement;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const svgX = mouseX - rect.left;
      const svgY = mouseY - rect.top;

      const beforeX = svgX / current.scale - current.translateX;
      const beforeY = svgY / current.scale - current.translateY;

      const afterX = svgX / newScale - current.translateX;
      const afterY = svgY / newScale - current.translateY;

      const newTranslateX = current.translateX + (afterX - beforeX);
      const newTranslateY = current.translateY + (afterY - beforeY);

      applyTransform(newScale, newTranslateX, newTranslateY);
    }
  } else {
    applyTransform(newScale, current.translateX, current.translateY);
  }

  setScale(newScale);
};

export const handleZoomOut = (
  setScale: Dispatch<SetStateAction<number>>,
  mouseX?: number,
  mouseY?: number
) => {
  const g = getSvgGroup();
  if (!g) return;

  const current = parseTransform(g);
  const newScale = Math.max(current.scale - 0.3, 0.6666666666666666);

  if (mouseX !== undefined && mouseY !== undefined && current.scale > 0.5) {
    const svg = g.ownerSVGElement;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const svgX = mouseX - rect.left;
      const svgY = mouseY - rect.top;

      const beforeX = svgX / current.scale - current.translateX;
      const beforeY = svgY / current.scale - current.translateY;

      const afterX = svgX / newScale - current.translateX;
      const afterY = svgY / newScale - current.translateY;

      const newTranslateX = current.translateX + (afterX - beforeX);
      const newTranslateY = current.translateY + (afterY - beforeY);

      applyTransform(newScale, newTranslateX, newTranslateY);
    }
  } else {
    applyTransform(newScale, current.translateX, current.translateY);
  }

  setScale(newScale);
};

export const handleReset = (
  setScale: Dispatch<SetStateAction<number>>,
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>
) => {
  const g = getSvgGroup();
  if (!g) return;

  applyTransform(0.6666666666666666, 0, 240);
  setScale(1);
  setPosition({ x: 0, y: 0 });
};

export const handleMouseDown = (
  e: React.MouseEvent,
  scale: number,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  setDragStart: Dispatch<SetStateAction<{ x: number; y: number }>>,
  position: { x: number; y: number }
) => {
  if (scale > 0.5) {
    setIsDragging(true);
    const g = getSvgGroup();
    if (g) {
      const current = parseTransform(g);
      setDragStart({
        x: e.clientX - current.translateX,
        y: e.clientY - current.translateY,
      });
    }
  }
};

export const handleMouseMove = (
  e: React.MouseEvent,
  isDragging: boolean,
  scale: number,
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>,
  dragStart: { x: number; y: number }
) => {
  if (isDragging && scale > 0.5) {
    const g = getSvgGroup();
    if (g) {
      const current = parseTransform(g);
      const newTranslateX = e.clientX - dragStart.x;
      const newTranslateY = e.clientY - dragStart.y;

      applyTransform(current.scale, newTranslateX, newTranslateY);
      setPosition({ x: newTranslateX, y: newTranslateY });
    }
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

  const g = getSvgGroup();
  if (!g) return;

  const current = parseTransform(g);
  const newScale = Math.max(
    0.6666666666666666,
    Math.min(current.scale + delta, 3)
  );

  const svg = g.ownerSVGElement;
  if (svg) {
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const beforeX = mouseX / current.scale - current.translateX;
    const beforeY = mouseY / current.scale - current.translateY;

    const afterX = mouseX / newScale - current.translateX;
    const afterY = mouseY / newScale - current.translateY;

    const newTranslateX = current.translateX + (afterX - beforeX);
    const newTranslateY = current.translateY + (afterY - beforeY);

    applyTransform(newScale, newTranslateX, newTranslateY);
  } else {
    applyTransform(newScale, current.translateX, current.translateY);
  }

  setScale(newScale);
};
