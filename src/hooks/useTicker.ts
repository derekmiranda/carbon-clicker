import { useCallback, useEffect, useRef, useState } from "react";

export default function useTicker(
  onTick: (delta: DOMHighResTimeStamp) => void,
  fps: number = 60
) {
  const [initialTime] = useState(performance.now());
  const pausedRef = useRef<boolean>(false);
  const rafRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(performance.now());
  const frameSecs = 1000 / fps;

  const animate = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (timestamp - lastTimeRef.current > frameSecs) {
        const delta = (timestamp - lastTimeRef.current) / 1000;
        onTick(delta);
        lastTimeRef.current = timestamp;
      }
      rafRef.current = requestAnimationFrame(animate);
    },
    [onTick, frameSecs]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]); // Make sure the effect runs only once

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
  };

  return {
    initialTime,
    lastTime: lastTimeRef.current,
    paused: pausedRef.current,
    togglePause,
  };
}

export function useTickThrottle(
  onTick: (delta: DOMHighResTimeStamp) => void,
  fps: number = 60
) {
  const lastTimeRef = useRef<number>(performance.now());
  const currTimeRef = useRef<number>(performance.now());
  const frameSecs = 1 / fps;

  const animate = useCallback(
    (delta: DOMHighResTimeStamp) => {
      const currentTime = currTimeRef.current + delta;
      currTimeRef.current = currentTime;
      if (currTimeRef.current - lastTimeRef.current > frameSecs) {
        onTick(currentTime - lastTimeRef.current);
        lastTimeRef.current = currentTime;
      }
    },
    [onTick, frameSecs]
  );

  return animate;
}
