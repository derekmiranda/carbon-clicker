import {
  SELF_EDUCATE_THRESHOLDS,
  LOG_LIMIT,
  STARTING_PPM_RATE,
} from "../constants";
import { clicker } from "../data/clicker";
import { getLogsForClick } from "../data/logs";
import {
  ButtonKey,
  EffectTypes,
  GamePhase,
  MapLikeInterface,
  ModalView,
  Pathway,
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
import { CooldownInterface } from "./cooldownReducer";
import { checkReqsAndCosts } from "./lib";

export const INITIAL_STATE = clicker;

export interface ClickerInterface {
  resources: Resources;
  // difference per second
  resourceGrowthRates: Partial<Resources>;
  buttons: MapLikeInterface<ButtonInterface, ButtonKey>;
  phase: GamePhase;
  logs: (string | string[])[];
  endgameSelfEducateTimesPressed: number;
  // seconds
  elapsedTime: number;
  storySeen: Record<string, boolean>;
  modal?: ModalView | null;
  pathway?: Pathway;
}

export enum ClickerActionType {
  ADD_LOGS = "ADD_LOGS",
  SET_MODAL = "SET_MODAL",
  SET_STORY_SEEN = "SET_STORY_SEEN",
  LOAD_GAME_DATA = "LOAD_GAME_DATA",
  CLEAR_GAME_DATA = "CLEAR_GAME_DATA",
  SET_PHASE = "SET_PHASE",
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

export interface SetPhaseAction {
  type: ClickerActionType.SET_PHASE;
  phase: GamePhase;
}

export type ClickerAction =
  | AddLogsAction
  | SetModalAction
  | SetStorySeenAction
  | SetPhaseAction
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
    } else if (key === ResourceTypes.TRUST) {
      newResources.trust = Math.min(state.resources.trust + diff, 100);
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
      const button = state.buttons.map[
        buttonId as ButtonKey
      ] as ButtonInterface;

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

              if (key === "globalPpm") {
                newGrowthRates.globalPpm =
                  (newGrowthRates.globalPpm ?? STARTING_PPM_RATE) * (1 - diff);
              } else if (typeof newGrowthRates[key] === "number") {
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
      const buttonState = newState.buttons.map[buttonId as ButtonKey];
      newState.buttons = {
        ...newState.buttons,
        map: {
          ...newState.buttons.map,
          [buttonId]:
            buttonState &&
            buttonReducer(buttonState, {
              type: SharedActionType.CLICK_BUTTON,
            }),
        },
      };

      // check requirements and costs
      checkReqsAndCosts(newState, buttonId);

      // add logs happening on button clicks
      const logsToAdd = getLogsForClick(newState, action as ClickButtonAction);
      if (logsToAdd) {
        // TODO: make logs reducer, to DRY
        const newLogs = newState.logs.slice(-LOG_LIMIT + 1);
        newLogs.push(logsToAdd);
        newState.logs = newLogs;
      }

      // one-off: self-educate events
      // TODO: split off into self-educate-specific EffectType
      if (buttonId === ButtonKey.selfEducate) {
        const { timesPressed: timesSelfEducated } = newState.buttons.map[
          ButtonKey.selfEducate
        ] as ButtonInterface;

        if (timesSelfEducated === SELF_EDUCATE_THRESHOLDS.WALLOW) {
          newState.modal = ModalView.WALLOW;
          const selfEducateButton = newState.buttons.map[
            ButtonKey.selfEducate
          ] as ButtonInterface;
          const currCooldown = selfEducateButton.cooldown as CooldownInterface;

          // set temp cooldown
          newState.buttons.map[ButtonKey.selfEducate] = {
            ...selfEducateButton,
            cooldown: {
              ...currCooldown,
              onCooldown: false,
            },
            temporaryCooldown: {
              cooldownSeconds: currCooldown.cooldownSeconds * 3,
              elapsedCooldownSeconds: 0,
              onCooldown: true,
              temporary: true,
            },
          };

          // up knowledge by 5 total
          newState.resources.knowledge += 5 - 1;
        } else if (timesSelfEducated === SELF_EDUCATE_THRESHOLDS.PHASE_TWO) {
          const selfEducateButton = newState.buttons.map[
            ButtonKey.selfEducate
          ] as ButtonInterface;

          newState.modal = ModalView.END_PHASE_ONE;

          // up knowledge rate
          newState.buttons.map[ButtonKey.selfEducate] = {
            ...selfEducateButton,
            effects: [
              {
                type: EffectTypes.UPDATE_RESOURCES,
                resourcesDiff: {
                  knowledge: 3,
                },
              },
            ],
          };
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
        const buttonState = state.buttons.map[buttonKey as ButtonKey];
        if (!buttonState) return;

        newMap[buttonKey] = buttonReducer(buttonState, action);
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
    case ClickerActionType.SET_PHASE: {
      const { phase } = action as SetPhaseAction;
      return {
        ...state,
        phase,
      };
    }

    case ClickerActionType.ADD_LOGS: {
      const { logs } = action as AddLogsAction;
      const newLogs = state.logs.slice(-LOG_LIMIT + 1);
      newLogs.push(logs);

      return {
        ...state,
        logs: newLogs,
      };
    }

    case ClickerActionType.CLEAR_GAME_DATA: {
      return INITIAL_STATE;
    }
  }
  return state;
}
