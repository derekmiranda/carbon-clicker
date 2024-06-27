import { Effect, Requirements } from "../types";
import { CooldownInterface } from "./cooldownReducer";

export enum ButtonActionType {
  ENABLE_BUTTON = "ENABLE_BUTTON",
  CHECK_REQUIREMENTS = "CHECK_REQUIREMENTS",
}

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
  state: ButtonInterface
  // action: ButtonAction
) {
  return state;
}
