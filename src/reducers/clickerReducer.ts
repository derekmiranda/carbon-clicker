import {
  EffectTypes,
  MapLikeInterface,
  ResourceTypes,
  Resources,
  UpdateResourcesEffect,
} from "../types";
import {
  ClickButtonAction,
  SharedAction,
  SharedActionType,
} from "../types/actions";
import { ButtonInterface } from "./buttonReducer";

export interface ClickerInterface {
  resources: Resources;
  buttons: MapLikeInterface<ButtonInterface>;
}

export type ClickerAction = SharedAction | Record<string, unknown>;

function updateResources(
  state: ClickerInterface,
  effect: UpdateResourcesEffect
) {
  const { resourcesDiff } = effect;

  const newResources = { ...state.resources };
  for (const item of Object.entries(resourcesDiff)) {
    const [key, diff] = item as [keyof Resources, number];

    if (key === ResourceTypes.ENERGY) {
      newResources.energy = Math.min(
        state.resources.energy + diff,
        state.resources.maxEnergy
      );
    } else {
      (newResources[key] as number) += diff;
    }
  }
  return {
    ...state,
    resources: newResources,
  };
}

export default function clickerReducer(
  state: ClickerInterface,
  action: ClickerAction
) {
  switch (action.type) {
    case SharedActionType.CLICK_BUTTON: {
      const { buttonId } = action as ClickButtonAction;
      const button = state.buttons.map[buttonId] as ButtonInterface;
      for (const effect of button.effects) {
        switch (effect.type) {
          case EffectTypes.UPDATE_RESOURCES: {
            const newState = updateResources(
              state,
              effect as UpdateResourcesEffect
            );

            return newState;
          }
        }
      }
    }
  }
  return state;
}
