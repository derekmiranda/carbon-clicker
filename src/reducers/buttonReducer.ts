import { Effect, Requirements, Resources } from "../types";
import { SharedAction, SharedActionType } from "../types/actions";
import cooldownReducer, {
  CooldownActionType,
  CooldownInterface,
} from "./cooldownReducer";

export enum ButtonActionType {
  ENABLE_BUTTON = "ENABLE_BUTTON",
  CHECK_REQUIREMENTS = "CHECK_REQUIREMENTS",
}

export interface CheckRequirementsAction {
  type: ButtonActionType.CHECK_REQUIREMENTS;
  updatedResources: Resources;
  updatedButtonPresses: Record<string, number>;
}

export type ButtonAction = CheckRequirementsAction | SharedAction;

export interface ButtonInterface {
  id: string;
  displayName: string;
  description: string;
  unlocked: boolean;
  enabled: boolean;
  timesPressed: number;
  effects: Effect[];
  requirements?: Requirements | null;
  cost?: Requirements | null;
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
      const { cooldown, timesPressed } = state;
      if (cooldown) {
        return {
          ...state,
          timesPressed: timesPressed + 1,
          cooldown: cooldownReducer(cooldown, {
            type: CooldownActionType.START_COOLDOWN,
          }),
        };
      }
      return state;
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
  }
  return state;
}

function checkRequirements(state: ButtonInterface, action: ButtonAction) {
  const { requirements } = state;
  const { updatedResources, updatedButtonPresses } =
    action as CheckRequirementsAction;

  if (requirements?.resources) {
    const { resources } = requirements;
    const resourcesMet = Object.keys(resources).every((resourceKey) => {
      const reqResource = resources[resourceKey as keyof Partial<Resources>];
      const updatedResource = updatedResources[resourceKey as keyof Resources];
      return (
        !reqResource ||
        (typeof updatedResource === "number" && reqResource <= updatedResource)
      );
    });

    if (!resourcesMet) return false;
  }

  if (requirements?.timesButtonsPressed) {
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
