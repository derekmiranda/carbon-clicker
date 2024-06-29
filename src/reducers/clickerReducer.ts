import { clicker } from "../data/clicker";
import {
  EffectTypes,
  MapLikeInterface,
  ModalView,
  ResourceTypes,
  Resources,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";
import {
  ClickButtonAction,
  SharedAction,
  SharedActionType,
  TickClockAction,
} from "../types/actions";
import buttonReducer, {
  ButtonActionType,
  ButtonInterface,
} from "./buttonReducer";

export const INITIAL_STATE = clicker;

export interface ClickerInterface {
  resources: Resources;
  // difference per second
  resourceGrowthRates: Partial<Resources>;
  buttons: MapLikeInterface<ButtonInterface>;
  logs: string[];
  storySeen: Record<string, boolean>;
  modal?: ModalView | null;
}

export enum ClickerActionType {
  ADD_LOGS = "ADD_LOGS",
  SET_MODAL = "SET_MODAL",
  SET_STORY_SEEN = "SET_STORY_SEEN",
  LOAD_GAME_DATA = "LOAD_GAME_DATA",
  CLEAR_GAME_DATA = "CLEAR_GAME_DATA",
}

export interface AddLogsAction {
  type: ClickerActionType.ADD_LOGS;
  logs: string[];
}

export interface SetModalAction {
  type: ClickerActionType.SET_MODAL;
  modal: ModalView | null;
}

export interface SetStorySeenAction {
  type: ClickerActionType.SET_STORY_SEEN;
  storyId: string;
}

export interface SaveGameDataAction {
  type: ClickerActionType.SET_STORY_SEEN;
  storyId: string;
}

export type ClickerAction =
  | AddLogsAction
  | SetModalAction
  | SetStorySeenAction
  | SharedAction
  | Record<string, unknown>;

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

      if (!button.enabled) return state;

      const updatedButtonPresses = newState.buttons.order.reduce<
        Record<string, number>
      >((accum, buttonKey) => {
        accum[buttonKey] = newState.buttons.map[buttonKey].timesPressed;
        return accum;
      }, {});

      // process button effects
      for (const effect of button.effects) {
        switch (effect.type) {
          case EffectTypes.UPDATE_RESOURCES: {
            const newResources = updateResources(
              state,
              effect as UpdateResourcesEffect
            );

            newState.resources = newResources;

            break;
          }

          case EffectTypes.UPDATE_RESOURCES_RATE: {
            const { resourcesRateDiff } = effect as UpdateResourcesRateEffect;
            const newGrowthRates = { ...state.resourceGrowthRates };

            for (const item of Object.entries(resourcesRateDiff)) {
              const [key, diff] = item as [keyof Resources, number];

              if (typeof newGrowthRates[key] === "number") {
                (newGrowthRates[key] as number) += diff;
              } else {
                newGrowthRates[key] = diff;
              }
            }

            newState.resourceGrowthRates = newGrowthRates;
            break;
          }
        }
      }

      // deduct costs, if any
      if (button.cost) {
        Object.entries(button.cost).forEach(([resourceKey, resourceCost]) => {
          const key = resourceKey as keyof Resources;
          newState.resources[key] -= resourceCost;
        });
      }

      // click button
      newState.buttons.map[buttonId] = buttonReducer(
        newState.buttons.map[buttonId],
        {
          type: SharedActionType.CLICK_BUTTON,
        }
      );

      // check requirements and costs
      newState.buttons.order.forEach((buttonKey) => {
        const newButton = buttonReducer(newState.buttons.map[buttonKey], {
          type: ButtonActionType.CHECK_REQUIREMENTS,
          updatedResources: newState.resources,
          updatedButtonPresses,
          buttonsUnlocked: newState.buttons.order
            .reduce<string[]>((accum, buttonKey) => {
              const button = newState.buttons.map[buttonKey];
              return button.unlocked && (!button.oneTime || button.purchased)
                ? accum.concat(buttonKey)
                : accum;
            }, [])
            .concat(button.oneTime ? buttonId : []),
          bonusesUnlocked: [],
        });
        newState.buttons.map[buttonKey] = buttonReducer(newButton, {
          type: ButtonActionType.CHECK_COST,
          updatedResources: newState.resources,
        });
      });

      return newState;
    }

    // TODO: check requirements at much slower rate
    case SharedActionType.TICK_CLOCK: {
      // handle cooldowns
      const newMap: Record<string, ButtonInterface> = {};
      state.buttons.order.forEach((buttonKey) => {
        newMap[buttonKey] = buttonReducer(state.buttons.map[buttonKey], action);
      });

      // process growth rates
      const { timeDelta } = action as TickClockAction;
      const newResources = { ...state.resources };
      Object.entries(state.resourceGrowthRates).forEach(([key, diff]) => {
        newResources[key as keyof Resources] += diff * timeDelta;
      });

      return {
        ...state,
        resources: newResources,
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

    case ClickerActionType.SET_STORY_SEEN: {
      const { storyId } = action as SetStorySeenAction;
      return {
        ...state,
        storySeen: {
          ...state.storySeen,
          [storyId]: true,
        },
      };
    }

    case ClickerActionType.ADD_LOGS: {
      const { logs } = action as AddLogsAction;
      return {
        ...state,
        logs: state.logs.concat(logs),
      };
    }

    case ClickerActionType.CLEAR_GAME_DATA: {
      return INITIAL_STATE;
    }
  }
  return state;
}
