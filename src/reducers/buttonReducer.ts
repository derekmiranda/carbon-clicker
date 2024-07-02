import { Cost, Effect, Requirements, Resources } from "../types";
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
  updatedButtonPresses: Record<string, number>;
  buttonsUnlocked: string[];
  bonusesUnlocked: string[];
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
  id: string;
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
}

export const INITIAL_STATE: ButtonInterface = {
  id: "id",
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

      if (cooldown) {
        Object.assign(newState, {
          cooldown: cooldownReducer(cooldown, {
            type: CooldownActionType.START_COOLDOWN,
          }),
        });
      }

      if (oneTime) {
        Object.assign(newState, {
          enabled: false,
          purchased: true,
        });
      }

      return newState;
    }

    case SharedActionType.TICK_CLOCK: {
      const { cooldown } = state;
      if (cooldown) {
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

      const requirementsMet = checkRequirements(state, action);
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
    const reqResource =
      neededResources[resourceKey as keyof Partial<Resources>];
    const currResource = currResources[resourceKey as keyof Resources];
    return !reqResource || reqResource <= currResource;
  });
}

function checkRequirements(state: ButtonInterface, action: ButtonAction) {
  const { requirements } = state;

  if (requirements?.resources) {
    const { updatedResources } = action as CheckRequirementsAction;
    const { resources } = requirements;
    const resourcesMet = checkResourcesMet(resources, updatedResources);

    if (!resourcesMet) return false;
  }

  if (requirements?.buttonsUnlocked) {
    const { buttonsUnlocked } = action as CheckRequirementsAction;
    const allButtonsMet = requirements.buttonsUnlocked.every((buttonKey) =>
      buttonsUnlocked.includes(buttonKey)
    );

    if (!allButtonsMet) return false;
  }

  if (requirements?.timesButtonsPressed) {
    const { updatedButtonPresses } = action as CheckRequirementsAction;
    const { timesButtonsPressed } = requirements;
    const buttonPressesMet = Object.keys(timesButtonsPressed).every(
      (buttonKey) => {
        const reqButtonPress = timesButtonsPressed[buttonKey];
        const updatedButtonPress = updatedButtonPresses[buttonKey];
        return (
          !reqButtonPress ||
          (typeof updatedButtonPress === "number" &&
            reqButtonPress <= updatedButtonPress)
        );
      }
    );

    if (!buttonPressesMet) return false;
  }

  return true;
}
