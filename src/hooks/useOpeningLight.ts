"use client";

import { useEffect, useRef, useState } from "react";

type OpeningState = {
  isLit: boolean;
  leftLampLit: boolean;
  rightLampLit: boolean;
  hasStarted: boolean;
  ignite: () => void;
};

export function useOpeningLight(): OpeningState {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const [leftLampLit, setLeftLampLit] = useState(false);
  const [rightLampLit, setRightLampLit] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const ignite = () => {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);

    timeoutsRef.current.push(
      window.setTimeout(() => {
        setLeftLampLit(true);
      }, 620),
    );

    timeoutsRef.current.push(
      window.setTimeout(() => {
        setRightLampLit(true);
        setIsLit(true);
      }, 1180),
    );
  };

  return {
    isLit,
    leftLampLit,
    rightLampLit,
    hasStarted,
    ignite,
  };
}
