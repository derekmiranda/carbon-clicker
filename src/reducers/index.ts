import { useCallback, useReducer } from "react";

import clickerReducer, {
  ClickerAction,
  ClickerInterface,
} from "./clickerReducer";
import { SharedActionType } from "../types/actions";
import { EffectTypes } from "../types";

const INITIAL_STATE: ClickerInterface = {
  resources: {
    energy: 200,
    maxEnergy: 200,
    dollars: 10,
    co2Saved: 0,
    knowledge: 0,
    globalPpm: null,
  },
  buttons: {
    map: {
      turnOffLights: {
        id: "turnOffLights",
        displayName: "Turn Off Lights",
        description: "Turn Off Lights",
        unlocked: true,
        enabled: true,
        cooldown: {
          cooldownSeconds: 1,
          elapsedCooldownSeconds: 0,
          onCooldown: false,
        },
        effects: [
          {
            type: EffectTypes.UPDATE_RESOURCES,
            resourcesDiff: {
              co2Saved: 1,
            },
          },
        ],
      },
      selfEducate: {
        id: "selfEducate",
        displayName: "Self-Educate",
        description: "Self-Educate",
        unlocked: true,
        enabled: true,
        cooldown: {
          cooldownSeconds: 1,
          elapsedCooldownSeconds: 0,
          onCooldown: false,
        },
        effects: [
          {
            type: EffectTypes.UPDATE_RESOURCES,
            resourcesDiff: {
              knowledge: 1,
            },
          },
        ],
      },
    },
    order: ["turnOffLights", "selfEducate"],
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

  const tickClock = useCallback(
    (timeDelta: number) => {
      dispatch({
        type: SharedActionType.TICK_CLOCK,
        timeDelta,
      });
    },
    [dispatch]
  );

  return { state, clickButton, tickClock, dispatch };
}
