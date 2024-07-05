import {
  END_PHASE_1_KNOWLEDGE_DROPPING,
  KNOWLEDGE_DROPPINGS,
} from "../constants";
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
  TickResourcesAction,
  TickCooldownAction,
} from "../types/actions";
import buttonReducer, { ButtonInterface } from "./buttonReducer";
import { checkReqsAndCosts } from "./lib";

export const INITIAL_STATE = clicker;

export interface ClickerInterface {
  resources: Resources;
  // difference per second
  resourceGrowthRates: Partial<Resources>;
  buttons: MapLikeInterface<ButtonInterface>;
  phase: number;
  logs: string[];
  // seconds
  elapsedTime: number;
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

    if (key === ResourceTypes.MOOD) {
      newResources.mood = Math.min(
        state.resources.mood + diff,
        state.resources.maxMood
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
        const newResources: Resources = { ...newState.resources };
        Object.entries(button.cost).forEach(([resourceKey, resourceCost]) => {
          const key = resourceKey as keyof Resources;
          newResources[key] -= resourceCost;
        });
        newState.resources = newResources;
      }

      // click button
      newState.buttons = {
        ...newState.buttons,
        map: {
          ...newState.buttons.map,
          [buttonId]: buttonReducer(newState.buttons.map[buttonId], {
            type: SharedActionType.CLICK_BUTTON,
          }),
        },
      };

      // check requirements and costs
      checkReqsAndCosts(newState, buttonId);

      // add knowledge logs
      if (buttonId === "selfEducate") {
        const newKnowledgeDropping =
          KNOWLEDGE_DROPPINGS[newState.resources.knowledge - 1];
        newState.logs = newKnowledgeDropping
          ? state.logs.concat(
              Array.isArray(newKnowledgeDropping)
                ? newKnowledgeDropping.slice().reverse()
                : newKnowledgeDropping
            )
          : newState.logs;

        if (newKnowledgeDropping === END_PHASE_1_KNOWLEDGE_DROPPING) {
          newState.modal = ModalView.END_PROTOTYPE;
        }
      }

      return newState;
    }

    case SharedActionType.TICK_RESOURCES: {
      // handle cooldowns
      const newState = { ...state };

      // process growth rates
      const { timeDelta } = action as TickResourcesAction;
      const newResources = { ...state.resources };
      Object.entries(state.resourceGrowthRates).forEach(([key, diff]) => {
        newResources[key as keyof Resources] += diff * timeDelta;
      });

      newState.resources = newResources;
      newState.elapsedTime = state.elapsedTime + timeDelta;

      // check requirements and costs
      checkReqsAndCosts(newState);

      return newState;
    }

    case SharedActionType.TICK_COOLDOWN: {
      // handle cooldowns
      const newState = { ...state };
      const { timeDelta } = action as TickCooldownAction;
      const newMap: Record<string, ButtonInterface> = {};
      state.buttons.order.forEach((buttonKey) => {
        newMap[buttonKey] = buttonReducer(state.buttons.map[buttonKey], action);
      });

      newState.buttons = {
        ...state.buttons,
        map: newMap,
      };
      newState.elapsedTime = state.elapsedTime + timeDelta;

      return newState;
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
