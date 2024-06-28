import { useContext, useCallback } from "react";
import { ClickerContext } from "../reducers/context";
import { SharedActionType } from "../types/actions";
import { clearGameData } from "../storage";
import { ClickerActionType } from "../reducers/clickerReducer";
import { ModalView } from "../types";
import { StoryId } from "../types/storyId";

export default function useDispatchers() {
  const { dispatch } = useContext(ClickerContext);

  const clickButton = useCallback(
    (buttonId: string) =>
      dispatch({
        type: SharedActionType.CLICK_BUTTON,
        buttonId,
      }),
    [dispatch]
  );

  const tickClock = useCallback(
    (timeDelta: number) =>
      dispatch({
        type: SharedActionType.TICK_CLOCK,
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
    () => dispatch({ type: ClickerActionType.SET_MODAL, modal: null }),
    [dispatch]
  );

  const clearGameDataCB = useCallback(() => {
    clearGameData();
    dispatch({ type: ClickerActionType.CLEAR_GAME_DATA });
  }, [dispatch]);

  const setStorySeen = useCallback(
    (storyId: StoryId) =>
      dispatch({ type: ClickerActionType.SET_STORY_SEEN, storyId }),
    [dispatch]
  );

  const addLogs = useCallback(
    (logs: string[]) => dispatch({ type: ClickerActionType.ADD_LOGS, logs }),
    [dispatch]
  );

  return {
    clickButton,
    tickClock,
    openModal,
    closeModal,
    clearGameData: clearGameDataCB,
    setStorySeen,
    addLogs,
  };
}
