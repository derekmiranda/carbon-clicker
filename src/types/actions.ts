export enum SharedActionType {
  CLICK_BUTTON = "CLICK_BUTTON",
  TICK_RESOURCES = "TICK_RESOURCES",
  TICK_COOLDOWN = "TICK_COOLDOWN",
}

export type GenericAction = Record<string, unknown>;

export interface ClickButtonAction {
  type: SharedActionType.CLICK_BUTTON;
  buttonId: string;
}

export interface TickResourcesAction {
  type: SharedActionType.TICK_RESOURCES;
  // in seconds
  timeDelta: number;
}

export interface TickCooldownAction {
  type: SharedActionType.TICK_COOLDOWN;
  // in seconds
  timeDelta: number;
}

export type SharedAction =
  | ClickButtonAction
  | TickResourcesAction
  | TickCooldownAction
  | GenericAction;
