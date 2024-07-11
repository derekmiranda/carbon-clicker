import { Howl } from "howler";
import { useEffect } from "react";

export default function useAudio() {
  useEffect(() => {
    const sound = new Howl({
      src: [`${import.meta.env.BASE_URL}clicker-sprites.mp3`],
    });

    sound.play();
  }, []);
}
