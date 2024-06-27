import { Resources } from ".";

export enum SharedActionType {
  CLICK_BUTTON = "CLICK_BUTTON",
  TICK_RESOURCES = "TICK_RESOURCES",
}

export type GenericAction = Record<string, unknown>;

export interface ClickButtonAction {
  type: SharedActionType.CLICK_BUTTON;
  buttonId: string;
}

export interface TickResourcesAction {
  type: SharedActionType.TICK_RESOURCES;
  resourcesDiff: Resources;
}

export type SharedAction =
  | ClickButtonAction
  | TickResourcesAction
  | GenericAction;
