import { EffectTypes, ResourceTypes, UpdateResourcesEffect } from "../types";
import {
  ClickButtonAction,
  SharedAction,
  SharedActionType,
} from "../types/actions";
import { ButtonInterface } from "./buttonReducer";

export interface ClickerInterface {
  energy: number;
  maxEnergy: number;
  dollars: number;
  co2Saved: number;
  globalPpm?: number | null;
  buttons: Record<string, ButtonInterface>;
}

export const INITIAL_STATE = {
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

export type ClickerAction = SharedAction | Record<string, unknown>;

function updateResources(
  state: ClickerInterface,
  effect: UpdateResourcesEffect
) {
  const { resourcesDiff } = effect;

  const newState = { ...state };
  for (const item of Object.entries(resourcesDiff)) {
    const [key, diff] = item as [keyof ClickerInterface, number];

    if (key === ResourceTypes.ENERGY) {
      newState.energy = Math.min(state.energy + diff, state.maxEnergy);
    } else {
      (newState[key] as number) += diff;
    }
  }
  return newState;
}

export default function clickerReducer(
  state: ClickerInterface,
  action: ClickerAction
) {
  switch (action.type) {
    case SharedActionType.CLICK_BUTTON: {
      const { buttonId } = action as ClickButtonAction;
      const button = state.buttons[buttonId];
      for (const effect of button.effects) {
        switch (effect.type) {
          case EffectTypes.UPDATE_RESOURCES:
            return updateResources(state, effect as UpdateResourcesEffect);
        }
      }
    }
  }
  return state;
}
