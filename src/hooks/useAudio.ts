import { Howl } from "howler";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ClickerContext } from "../reducers/context";

export const DEFAULT_VOLUME = 0.4;
export enum AudioSprite {
  CLICK_0 = "CLICK_0",
  CLICK_1 = "CLICK_1",
  CLICK_2 = "CLICK_2",
  CLICK_3 = "CLICK_3",
  CLICK_4 = "CLICK_4",
  CLICK_5 = "CLICK_5",
  CLICK_6 = "CLICK_6",
  CLICK_7 = "CLICK_7",
  GET_UPGRADE = "GET_UPGRADE",
  EVENT = "EVENT",
  WALLOW = "WALLOW",
}

export default function useAudio() {
  const {
    state: { muted },
  } = useContext(ClickerContext);
  const [nextClick, setNextClick] = useState(0);

  const sound = useMemo(
    () =>
      new Howl({
        src: [`${import.meta.env.BASE_URL}clicker-sprites.mp3`],
        sprite: {
          [AudioSprite.CLICK_0]: [0, 2000],
          [AudioSprite.CLICK_1]: [2000, 2000],
          [AudioSprite.CLICK_2]: [4000, 2000],
          [AudioSprite.CLICK_3]: [6000, 2000],
          [AudioSprite.CLICK_4]: [8000, 2000],
          [AudioSprite.CLICK_5]: [10000, 2000],
          [AudioSprite.CLICK_6]: [12000, 2000],
          [AudioSprite.CLICK_7]: [14000, 2000],
          [AudioSprite.GET_UPGRADE]: [16000, 2000],
          [AudioSprite.EVENT]: [18000, 2000],
          [AudioSprite.WALLOW]: [20000, 4000],
        },
      }),
    []
  );

  useEffect(() => {
    Howler.volume(muted ? 0 : DEFAULT_VOLUME);
  }, [muted]);

  const playSFX = useCallback(
    (sprite: AudioSprite | string) => sound.play(sprite),
    [sound]
  );

  const playClickSFX = useCallback(() => {
    playSFX(`CLICK_${nextClick}`);
    setNextClick((nextClick + 1) % 8);
  }, [playSFX, nextClick]);

  const playEventSFX = useCallback(() => playSFX(AudioSprite.EVENT), [playSFX]);

  const playUpgradeSFX = useCallback(
    () => playSFX(AudioSprite.GET_UPGRADE),
    [playSFX]
  );

  const playWallowSFX = useCallback(
    () => playSFX(AudioSprite.WALLOW),
    [playSFX]
  );

  return {
    playSFX,
    playClickSFX,
    playEventSFX,
    playUpgradeSFX,
    playWallowSFX,
  };
}
