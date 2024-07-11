import { Howl } from "howler";
import { useEffect } from "react";

export const DEFAULT_VOLUME = 0.4;

export default function useAudio() {
  Howler.volume(DEFAULT_VOLUME);

  useEffect(() => {
    const sound = new Howl({
      src: [`${import.meta.env.BASE_URL}clicker-sprites.mp3`],
    });

    sound.play();
  }, []);
}
