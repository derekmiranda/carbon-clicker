import { useCallback, useReducer } from "react";

import clickerReducer, {
  ClickerAction,
  ClickerInterface,
} from "./clickerReducer";
import { SharedActionType } from "../types/actions";
import { EffectTypes } from "../types";

const INITIAL_STATE = {
  energy: 200,
  maxEnergy: 200,
  dollars: 10,
  co2Saved: 0,
  globalPpm: null,
  buttons: {
    turnOffLights: {
      id: "turnOffLights",
      displayName: "Turn Off Lights",
      description: "Turn Off Lights",
      unlocked: true,
      enabled: true,
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            co2Saved: 1,
          },
        },
      ],
    },
  },
};

export function useClickerReducer() {
  const [state, dispatch] = useReducer<
    React.Reducer<ClickerInterface, ClickerAction>
  >(clickerReducer, INITIAL_STATE);

  const clickButton = useCallback(
    (buttonId: string) => {
      dispatch({
        type: SharedActionType.CLICK_BUTTON,
        buttonId,
      });
    },
    [dispatch]
  );

  return { state, clickButton, dispatch };
}
