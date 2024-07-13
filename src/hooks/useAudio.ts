import { Howl } from "howler";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ClickerInterface } from "../reducers/clickerReducer";

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
  SELF_EDUCATE = "SELF_EDUCATE",
  REST = "REST",
  EPILOGUE_1 = "EPILOGUE_1",
  EPILOGUE_2 = "EPILOGUE_2",
  EPILOGUE_3 = "EPILOGUE_3",
  EPILOGUE_4 = "EPILOGUE_4",
}

export default function useAudio(state: ClickerInterface) {
  const { muted } = state;
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
          [AudioSprite.REST]: [24000, 4000],
          [AudioSprite.SELF_EDUCATE]: [28000, 2000],
          [AudioSprite.EPILOGUE_1]: [32000, 2000],
          [AudioSprite.EPILOGUE_2]: [34000, 2000],
          [AudioSprite.EPILOGUE_3]: [36000, 4000],
          [AudioSprite.EPILOGUE_4]: [40000, 6000],
        },
      }),
    []
  );

  useEffect(() => {
    Howler.volume(muted ? 0 : DEFAULT_VOLUME);
  }, [muted]);

  const playSFX = useCallback(
    (sprite: AudioSprite | string) => {
      if (muted) return;
      sound.play(sprite);
    },
    [muted, sound]
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

  const playSelfEducateSFX = useCallback(
    () => playSFX(AudioSprite.SELF_EDUCATE),
    [playSFX]
  );

  return {
    playSFX,
    playClickSFX,
    playEventSFX,
    playUpgradeSFX,
    playWallowSFX,
    playSelfEducateSFX,
  };
}
