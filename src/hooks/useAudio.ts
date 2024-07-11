import { Howl } from "howler";
import { useContext, useEffect, useMemo } from "react";
import { ClickerContext } from "../reducers/context";

export const DEFAULT_VOLUME = 0.4;

export default function useAudio() {
  const {
    state: { muted },
  } = useContext(ClickerContext);

  const sound = useMemo(
    () =>
      new Howl({
        src: [`${import.meta.env.BASE_URL}clicker-sprites.mp3`],
      }),
    []
  );

  useEffect(() => {
    Howler.volume(muted ? 0 : DEFAULT_VOLUME);
  }, [muted]);

  useEffect(() => {
    sound.play();
  }, [sound]);
}
