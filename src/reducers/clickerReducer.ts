import {
  SELF_EDUCATE_THRESHOLDS,
  LOG_LIMIT,
  CHOOSE_PATHWAY,
  MAX_MOOD,
} from "../constants";
import { PHASE_TWO_SELF_EDUCATE_EFFECTS } from "../data/buttons";
import { phaseTwoClicker } from "../data/clicker";
import { getLogsForClick } from "../data/logs";
import ppmEvents from "../data/ppmEvents";
import {
  ButtonKey,
  GamePhase,
  MapLikeInterface,
  ModalView,
  ModalViewProps,
  Pathway,
  Resources,
  ResourceTypes,
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
import { checkReqsAndCosts, processEffects } from "./lib";

export const INITIAL_STATE = phaseTwoClicker;

interface ModalData {
  view: ModalView;
  props?: ModalViewProps;
}

export interface ClickerInterface {
  resources: Resources;
  // difference per second
  resourceGrowthRates: Partial<Resources>;
  buttons: MapLikeInterface<ButtonInterface, ButtonKey>;
  phase: GamePhase;
  logs: (string | string[])[];
  // self-educate counter after picking pathway
  endgameSelfEducateTimesPressed: number;
  // keep track of next PPM event
  ppmEventIndex: number;
  // seconds
  elapsedTime: number;
  storySeen: Record<string, boolean>;
  modalQueue: ModalData[];
  muted: boolean;
  pathway?: Pathway;
}

export enum ClickerActionType {
  ADD_LOGS = "ADD_LOGS",
  SET_MODAL = "SET_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SET_STORY_SEEN = "SET_STORY_SEEN",
  LOAD_GAME_DATA = "LOAD_GAME_DATA",
  CLEAR_GAME_DATA = "CLEAR_GAME_DATA",
  SET_PHASE = "SET_PHASE",
  SET_PATHWAY = "SET_PATHWAY",
  SET_MUTED = "SET_MUTED",
}

export interface AddLogsAction {
  type: ClickerActionType.ADD_LOGS;
  logs: string[];
}

export interface SetModalAction {
  type: ClickerActionType.SET_MODAL;
  modal: ModalView;
  props?: ModalViewProps;
}

export interface CloseModalAction {
  type: ClickerActionType.CLOSE_MODAL;
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

export interface SetPathwayAction {
  type: ClickerActionType.SET_PATHWAY;
  pathway: Pathway;
}

export interface SetMutedAction {
  type: ClickerActionType.SET_MUTED;
  muted: boolean;
}

export type ClickerAction =
  | AddLogsAction
  | SetModalAction
  | SetMutedAction
  | SetStorySeenAction
  | SetPhaseAction
  | SetPathwayAction
  | SharedAction
  | Record<string, unknown>;

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

      processEffects(newState, button.effects);

      // deduct costs, if any
      if (button.cost && !button.cost.noDeduct) {
        const newResources: Resources = { ...newState.resources };
        Object.entries(button.cost).forEach(([resourceKey, resourceCost]) => {
          if (resourceKey === "noDeduct") return;

          const key = resourceKey as keyof Resources;
          if (resourceKey === ResourceTypes.COLLECTIVE_DOLLARS) {
            const collectiveDollarDiff =
              newResources[ResourceTypes.COLLECTIVE_DOLLARS] - resourceCost;
            // deduct from collective first
            newResources[ResourceTypes.COLLECTIVE_DOLLARS] = Math.max(
              collectiveDollarDiff,
              0
            );
            // then individual
            if (collectiveDollarDiff < 0) {
              newResources[ResourceTypes.DOLLARS] += collectiveDollarDiff;
            }
            return;
          }

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
          [buttonId]: buttonState && buttonReducer(buttonState, action),
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
          newState.modalQueue = newState.modalQueue.concat({
            view: ModalView.WALLOW,
          });
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
              baseCooldownSeconds: currCooldown.cooldownSeconds * 3,
              elapsedCooldownSeconds: 0,
              onCooldown: true,
              temporary: true,
            },
          };

          // up knowledge by 5 total
          newState.resources.knowledge += 5 - 1;
        } else if (timesSelfEducated === SELF_EDUCATE_THRESHOLDS.PHASE_TWO) {
          newState.modalQueue = newState.modalQueue.concat({
            view: ModalView.END_PHASE_ONE,
          });

          // up knowledge rate
          newState.buttons.map[ButtonKey.selfEducate] = {
            ...(newState.buttons.map[ButtonKey.selfEducate] as ButtonInterface),
            effects: PHASE_TWO_SELF_EDUCATE_EFFECTS,
          };
        } else if (timesSelfEducated === SELF_EDUCATE_THRESHOLDS.LEARNING) {
          newState.modalQueue = newState.modalQueue.concat({
            view: ModalView.LEARNING,
          });
        }
      }

      // check for pathway time
      if (
        !newState.pathway &&
        newState.buttons.map[ButtonKey.formClimateCoalition]?.purchased &&
        newState.buttons.map[ButtonKey.organizeCommunity]?.purchased &&
        newState.buttons.map[ButtonKey.volunteer]?.purchased
      ) {
        newState.modalQueue = newState.modalQueue.concat({
          view: ModalView.CHOOSE_PATHWAY,
          props: { content: CHOOSE_PATHWAY },
        });
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
        if (key === ResourceTypes.MOOD) {
          newResources.mood = Math.min(
            newResources.mood + diff * timeDelta,
            MAX_MOOD
          );
          return;
        } else if (key === ResourceTypes.TRUST) {
          newResources.trust = Math.min(
            newResources.trust + diff * timeDelta,
            100
          );
          return;
        }

        newResources[key as keyof Resources] += diff * timeDelta;
      });

      newState.resources = newResources;
      newState.elapsedTime = state.elapsedTime + timeDelta;

      // check requirements and costs
      checkReqsAndCosts(newState);

      // check for PPM events
      const nextPpmEvent = ppmEvents[state.ppmEventIndex + 1];
      if (nextPpmEvent && newState.resources.globalPpm >= nextPpmEvent.ppm) {
        newState.modalQueue = newState.modalQueue.concat({
          view: ModalView.PPM_EVENT,
          props: { content: nextPpmEvent.text },
        });
        newState.ppmEventIndex = state.ppmEventIndex + 1;

        processEffects(newState, nextPpmEvent.effects);
      }
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
      const { modalQueue } = state;
      const { modal, props } = action as SetModalAction;

      return {
        ...state,
        modalQueue: modalQueue
          .concat({ view: modal, props })
          .filter(
            (m1, i) => modalQueue.findIndex((m2) => m1.view === m2.view) !== i
          ),
      };
    }

    case ClickerActionType.CLOSE_MODAL: {
      return {
        ...state,
        // remove first
        modalQueue: state.modalQueue.filter((_, i) => i > 0),
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

    case ClickerActionType.SET_PATHWAY: {
      const { pathway } = action as SetPathwayAction;
      return {
        ...state,
        pathway,
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

    case ClickerActionType.SET_MUTED: {
      return {
        ...state,
        muted: action.muted as boolean,
      };
    }

    case ClickerActionType.CLEAR_GAME_DATA: {
      return INITIAL_STATE;
    }
  }
  return state;
}
