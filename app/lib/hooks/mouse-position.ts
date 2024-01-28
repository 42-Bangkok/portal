"use client";

import React from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0
  });
  React.useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

export const useMouseWindowisLeft = () => {
  const [isLeft, setIsLeft] = React.useState(false);
  const coords = useMousePosition();

  React.useEffect(() => {
    if (coords.x < window.innerWidth / 2) {
      setIsLeft(true);
    } else {
      setIsLeft(false);
    }
  }, [coords]);
  return isLeft;
};
