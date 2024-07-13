import { useContext, useCallback } from "react";
import { ClickerContext } from "../reducers/context";
import { SharedActionType } from "../types/actions";
import { clearGameData } from "../storage";
import { ClickerActionType } from "../reducers/clickerReducer";
import { GamePhase, ModalView, Pathway } from "../types";
import { StoryId } from "../types/storyId";

export default function useDispatchers() {
  const { dispatch } = useContext(ClickerContext);

  const clickButton = useCallback(
    (buttonId: string, moodPercent: number) =>
      dispatch({
        type: SharedActionType.CLICK_BUTTON,
        buttonId,
        moodPercent,
      }),
    [dispatch]
  );

  const tickResources = useCallback(
    (timeDelta: number) =>
      dispatch({
        type: SharedActionType.TICK_RESOURCES,
        timeDelta,
      }),
    [dispatch]
  );

  const tickCooldown = useCallback(
    (timeDelta: number) =>
      dispatch({
        type: SharedActionType.TICK_COOLDOWN,
        timeDelta,
      }),
    [dispatch]
  );

  const openModal = useCallback(
    (modal: ModalView) =>
      dispatch({ type: ClickerActionType.SET_MODAL, modal }),
    [dispatch]
  );

  const closeModal = useCallback(
    () => dispatch({ type: ClickerActionType.CLOSE_MODAL }),
    [dispatch]
  );

  const clearGameDataCB = useCallback(() => {
    if (
      !window.confirm(
        "this will clear your game progress. are you forsure sure you wanna do that?"
      )
    )
      return;

    clearGameData();
    dispatch({ type: ClickerActionType.CLEAR_GAME_DATA });
  }, [dispatch]);

  const setMuted = useCallback(
    (muted: boolean) => dispatch({ type: ClickerActionType.SET_MUTED, muted }),
    [dispatch]
  );

  const setStorySeen = useCallback(
    (storyId: StoryId) =>
      dispatch({ type: ClickerActionType.SET_STORY_SEEN, storyId }),
    [dispatch]
  );

  const setPhase = useCallback(
    (phase: GamePhase) =>
      dispatch({ type: ClickerActionType.SET_PHASE, phase }),
    [dispatch]
  );

  const setPathway = useCallback(
    (pathway: Pathway) =>
      dispatch({ type: ClickerActionType.SET_PATHWAY, pathway }),
    [dispatch]
  );

  const addLogs = useCallback(
    (logs: string[]) => dispatch({ type: ClickerActionType.ADD_LOGS, logs }),
    [dispatch]
  );

  const progressEndSequence = useCallback(
    () => dispatch({ type: ClickerActionType.PROGRESS_END_SEQUENCE }),
    [dispatch]
  );

  return {
    clickButton,
    tickResources,
    tickCooldown,
    openModal,
    closeModal,
    clearGameData: clearGameDataCB,
    setMuted,
    setStorySeen,
    setPhase,
    setPathway,
    addLogs,
    progressEndSequence,
  };
}
