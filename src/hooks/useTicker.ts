import { useCallback, useEffect, useRef, useState } from "react";

export default function useTicker(
  onTick?: (delta: DOMHighResTimeStamp) => void
) {
  const [initialTime] = useState(performance.now());
  const pausedRef = useRef<boolean>(false);
  const rafRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(performance.now());

  const animate = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (onTick) {
        const delta = (timestamp - lastTimeRef.current) / 1000;
        onTick(delta);
      }
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(animate);
    },
    [onTick]
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
