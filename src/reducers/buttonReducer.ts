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
}

export type ButtonAction = CheckRequirementsAction | SharedAction;

export interface ButtonInterface {
  id: string;
  displayName: string;
  description: string;
  unlocked: boolean;
  enabled: boolean;
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
      const { cooldown } = state;
      if (cooldown) {
        return {
          ...state,
          cooldown: cooldownReducer(cooldown, {
            type: CooldownActionType.START_COOLDOWN,
          }),
        };
      }
      return state;
    }

    case ButtonActionType.CHECK_REQUIREMENTS: {
      const { unlocked, requirements } = state;
      const { updatedResources } = action as CheckRequirementsAction;
      if (unlocked || !requirements) return state;

      const requirementsMet = Object.keys(requirements.resources).every(
        (resourceKey) => {
          const reqResource =
            requirements.resources[resourceKey as keyof Partial<Resources>];
          const updatedResource =
            updatedResources[resourceKey as keyof Resources];
          return (
            !reqResource ||
            (typeof updatedResource === "number" &&
              reqResource <= updatedResource)
          );
        }
      );

      return {
        ...state,
        unlocked: requirementsMet,
      };
    }
  }
  return state;
}
