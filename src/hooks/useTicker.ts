import { useCallback, useEffect, useRef, useState } from "react";

export interface DelayedEffectArgs {
  delay: number;
  fn: () => void;
}
export interface DelayedEffect extends DelayedEffectArgs {
  elapsedTime: number;
}

export default function useTicker(
  onTick: (delta: DOMHighResTimeStamp) => void,
  fps: number = 60
) {
  const [initialTime] = useState(performance.now());
  const [paused, setPaused] = useState(false);
  const delayedEffectsRef = useRef<DelayedEffect[]>([]);
  const rafRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(performance.now());
  const frameSecs = 1000 / fps;

  useEffect(() => {
    function handleVisibilityChange() {
      if (!document.hidden) {
        lastTimeRef.current = performance.now();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const animate = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (paused) return;

      if (timestamp - lastTimeRef.current > frameSecs) {
        const delta = (timestamp - lastTimeRef.current) / 1000;
        onTick(delta);
        if (delayedEffectsRef.current.length) {
          delayedEffectsRef.current.forEach((effect) => {
            const { elapsedTime, fn, delay } = effect;
            const newTime = elapsedTime + delta;
            effect.elapsedTime = newTime;

            if (newTime >= delay) {
              fn();
            }
          });

          // take out stale effects
          delayedEffectsRef.current = delayedEffectsRef.current.filter(
            (effect) => effect.elapsedTime < effect.delay
          );
        }
        lastTimeRef.current = timestamp;
      }
      rafRef.current = requestAnimationFrame(animate);
    },
    [onTick, frameSecs, paused]
  );

  useEffect(() => {
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]); // Make sure the effect runs only once

  const togglePause = () => {
    setPaused((val) => !val);
  };

  const addDelayedEffect = useCallback((fn: () => void, delay: number) => {
    if (delayedEffectsRef.current.some((effect) => effect.fn === fn)) return;
    delayedEffectsRef.current.push({ fn, delay, elapsedTime: 0 });
  }, []);

  return {
    initialTime,
    lastTime: lastTimeRef.current,
    paused,
    setPaused,
    togglePause,
    addDelayedEffect,
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
