import { useCallback, useReducer } from "react";

import clickerReducer, {
  ClickerAction,
  ClickerActionType,
  ClickerInterface,
  INITIAL_STATE,
} from "./clickerReducer";
import { SharedActionType } from "../types/actions";
import { ModalView } from "../types";

export function useClickerReducer() {
  const [state, dispatch] = useReducer<
    React.Reducer<ClickerInterface, ClickerAction>
  >(clickerReducer, INITIAL_STATE);

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

  const openIntroModal = useCallback(
    () =>
      dispatch({ type: ClickerActionType.SET_MODAL, modal: ModalView.INTRO }),
    [dispatch]
  );

  const closeModal = useCallback(
    () => dispatch({ type: ClickerActionType.SET_MODAL, modal: null }),
    [dispatch]
  );

  return {
    state,
    clickButton,
    tickClock,
    openIntroModal,
    closeModal,
    dispatch,
  };
}
