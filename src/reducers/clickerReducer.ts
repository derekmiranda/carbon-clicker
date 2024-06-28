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
  INITIAL_STATE as INITIAL_BUTTON_STATE,
} from "./buttonReducer";

export interface ClickerInterface {
  resources: Resources;
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

export const INITIAL_STATE: ClickerInterface = {
  modal: ModalView.INTRO,
  logs: [],
  storySeen: {},
  resources: {
    energy: 200,
    maxEnergy: 200,
    dollars: 10,
    co2Saved: 0,
    knowledge: 0,
    globalPpm: 425,
    // ppm growth per month
    globalPpmPerMonth: 0.2,
  },
  buttons: {
    map: {
      turnOffLights: {
        ...INITIAL_BUTTON_STATE,
        id: "turnOffLights",
        displayName: "Turn Off Lights",
        description: "Turn Off Lights",
        cooldown: {
          cooldownSeconds: 5,
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
        ...INITIAL_BUTTON_STATE,
        id: "selfEducate",
        displayName: "Self-Educate",
        description: "Self-Educate",
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
      makeHomeEnergyEfficient: {
        ...INITIAL_BUTTON_STATE,
        id: "makeHomeEnergyEfficient",
        displayName: "Make Home Energy-Efficient",
        description: "Make Home Energy-Efficient",
        unlocked: false,
        requirements: {
          timesButtonsPressed: {
            turnOffLights: 1,
          },
        },
      },
    },
    order: ["turnOffLights", "selfEducate", "makeHomeEnergyEfficient"],
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

            const { buttons: newButtons } = newState;

            const updatedButtonPresses = newButtons.order.reduce<
              Record<string, number>
            >((accum, buttonKey) => {
              accum[buttonKey] = newButtons.map[buttonKey].timesPressed;
              return accum;
            }, {});

            newState.buttons.order.forEach((buttonKey) => {
              newState.buttons.map[buttonKey] = buttonReducer(
                newState.buttons.map[buttonKey],
                {
                  type: ButtonActionType.CHECK_REQUIREMENTS,
                  updatedResources: newResources,
                  updatedButtonPresses,
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
