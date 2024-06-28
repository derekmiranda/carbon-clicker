import {
  EffectTypes,
  MapLikeInterface,
  ModalView,
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
  modal?: ModalView | null;
}

export enum ClickerActionType {
  SET_MODAL = "SET_MODAL",
}

export interface SetModalAction {
  type: ClickerActionType.SET_MODAL;
  modal: ModalView | null;
}

export type ClickerAction =
  | SetModalAction
  | SharedAction
  | Record<string, unknown>;

export const INITIAL_STATE: ClickerInterface = {
  modal: null,
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

    case ClickerActionType.SET_MODAL: {
      const { modal } = action as SetModalAction;
      return {
        ...state,
        modal,
      };
    }
  }
  return state;
}
