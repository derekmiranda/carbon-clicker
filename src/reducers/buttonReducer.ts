import {
  ButtonKeyMap,
  ButtonKey,
  Cost,
  Effect,
  Requirements,
  Resources,
  GamePhase,
  Pathway,
} from "../types";
import { SharedAction, SharedActionType } from "../types/actions";
import cooldownReducer, {
  CooldownActionType,
  CooldownInterface,
} from "./cooldownReducer";

export enum ButtonActionType {
  ENABLE_BUTTON = "ENABLE_BUTTON",
  CHECK_REQUIREMENTS = "CHECK_REQUIREMENTS",
  CHECK_COST = "CHECK_COST",
}

export interface CheckRequirementsAction {
  type: ButtonActionType.CHECK_REQUIREMENTS;
  updatedResources: Resources;
  phase: GamePhase;
  updatedButtonPresses?: ButtonKeyMap<number>;
  pathway?: Pathway;
  buttonsUnlocked?: string[];
  bonusesUnlocked?: string[];
}

export interface CheckCostAction {
  type: ButtonActionType.CHECK_COST;
  updatedResources: Resources;
}

export type ButtonAction =
  | CheckRequirementsAction
  | CheckCostAction
  | SharedAction;

export interface ButtonInterface {
  id: ButtonKey;
  displayName: string;
  description: string;
  unlocked: boolean;
  enabled: boolean;
  timesPressed: number;
  effects: Effect[];
  // image path
  icon?: string;
  purchased?: boolean;
  oneTime?: boolean;
  tooltip?: string;
  requirements?: Requirements | null;
  cost?: Cost | null;
  cooldown?: CooldownInterface | null;
  temporaryCooldown?: CooldownInterface | null;
}

export const INITIAL_STATE: ButtonInterface = {
  id: ButtonKey.null,
  displayName: "displayName",
  description: "description",
  unlocked: true,
  enabled: true,
  timesPressed: 0,
  requirements: null, // or Requirements object
  cost: null, // or Cost object
  cooldown: null, // or Cooldown reducer
  effects: [],
};

export default function buttonReducer(
  state: ButtonInterface,
  action: ButtonAction
) {
  switch (action.type) {
    case SharedActionType.CLICK_BUTTON: {
      const { cooldown, oneTime, timesPressed } = state;
      const newState = { ...state, timesPressed: timesPressed + 1 };

      if (oneTime) {
        Object.assign(newState, {
          enabled: false,
          purchased: true,
        });
      } else if (cooldown) {
        Object.assign(newState, {
          cooldown: cooldownReducer(cooldown, {
            type: CooldownActionType.START_COOLDOWN,
            moodPercent: action.moodPercent,
          }),
        });
      }

      return newState;
    }

    case SharedActionType.TICK_COOLDOWN: {
      const { cooldown, temporaryCooldown } = state;

      if (temporaryCooldown) {
        return {
          ...state,
          temporaryCooldown: cooldownReducer(temporaryCooldown, action),
        };
      } else if (cooldown) {
        return {
          ...state,
          cooldown: cooldownReducer(cooldown, action),
        };
      }
      return state;
    }

    case ButtonActionType.CHECK_REQUIREMENTS: {
      const { unlocked, requirements } = state;
      if (unlocked || !requirements) return state;

      const requirementsMet = checkRequirements(
        state,
        action as CheckRequirementsAction
      );
      return {
        ...state,
        unlocked: requirementsMet,
      };
    }

    case ButtonActionType.CHECK_COST: {
      const { cost, oneTime, purchased } = state;
      if (!cost || (oneTime && purchased)) return state;

      const { updatedResources } = action as CheckCostAction;
      const costsMet = checkResourcesMet(cost, updatedResources);
      return {
        ...state,
        enabled: costsMet,
      };
    }
  }
  return state;
}

function checkResourcesMet(
  neededResources: Partial<Resources>,
  currResources: Resources
) {
  return Object.keys(neededResources).every((resourceKey) => {
    if (resourceKey === "noDeduct") return true;

    const reqResource =
      neededResources[resourceKey as keyof Partial<Resources>];
    const currResource = currResources[resourceKey as keyof Resources];
    return !reqResource || reqResource <= currResource;
  });
}

function checkRequirements(
  state: ButtonInterface,
  action: CheckRequirementsAction
) {
  const { requirements } = state;

  if (requirements?.resources) {
    const { updatedResources } = action;
    const { resources } = requirements;
    const resourcesMet = checkResourcesMet(resources, updatedResources);

    if (!resourcesMet) return false;
  }

  if (requirements?.buttonsUnlocked && action.buttonsUnlocked) {
    const { buttonsUnlocked } = action;

    const allButtonsMet = requirements.buttonsUnlocked.every((buttonKey) =>
      buttonsUnlocked.includes(buttonKey)
    );

    if (!allButtonsMet) return false;
  }

  if (requirements?.timesButtonsPressed && action.updatedButtonPresses) {
    const { updatedButtonPresses } = action;
    const { timesButtonsPressed } = requirements;
    const buttonPressesMet = Object.keys(timesButtonsPressed).every(
      (buttonKey) => {
        const reqButtonPress = timesButtonsPressed[buttonKey as ButtonKey];
        const updatedButtonPress = updatedButtonPresses[buttonKey as ButtonKey];
        return (
          !reqButtonPress ||
          (typeof updatedButtonPress === "number" &&
            reqButtonPress <= updatedButtonPress)
        );
      }
    );

    if (!buttonPressesMet) return false;
  }

  if (requirements?.phase) {
    const { phase } = action;
    if (phase !== requirements.phase) return false;
  }

  if (requirements?.pathway) {
    const { pathway } = action;
    if (pathway !== requirements.pathway) return false;
  }

  return true;
}
