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
import buttonReducer, {
  ButtonActionType,
  ButtonInterface,
} from "./buttonReducer";

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
  return newResources;
}

export default function clickerReducer(
  state: ClickerInterface,
  action: ClickerAction
) {
  switch (action.type) {
    case SharedActionType.CLICK_BUTTON: {
      const newState = { ...state };
      const { buttonId } = action as ClickButtonAction;
      const button = state.buttons.map[buttonId] as ButtonInterface;

      // process button effects
      for (const effect of button.effects) {
        switch (effect.type) {
          case EffectTypes.UPDATE_RESOURCES: {
            const newResources = updateResources(
              state,
              effect as UpdateResourcesEffect
            );
            newState.resources = newResources;

            newState.buttons.order.forEach((buttonKey) => {
              newState.buttons.map[buttonKey] = buttonReducer(
                newState.buttons.map[buttonKey],
                {
                  type: ButtonActionType.CHECK_REQUIREMENTS,
                  updatedResources: newResources,
                }
              );
            });
          }
        }
      }

      // click button
      newState.buttons.map[buttonId] = buttonReducer(
        newState.buttons.map[buttonId],
        {
          type: SharedActionType.CLICK_BUTTON,
        }
      );

      return newState;
    }

    case SharedActionType.TICK_CLOCK: {
      const newMap: Record<string, ButtonInterface> = {};
      state.buttons.order.forEach((buttonKey) => {
        newMap[buttonKey] = buttonReducer(state.buttons.map[buttonKey], action);
      });

      return {
        ...state,
        buttons: {
          ...state.buttons,
          map: newMap,
        },
      };
    }
  }
  return state;
}
