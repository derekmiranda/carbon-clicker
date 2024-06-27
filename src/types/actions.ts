export enum SharedActionType {
  CLICK_BUTTON = "CLICK_BUTTON",
  TICK_CLOCK = "TICK_CLOCK",
}

export type GenericAction = Record<string, unknown>;

export interface ClickButtonAction {
  type: SharedActionType.CLICK_BUTTON;
  buttonId: string;
}

export interface TickClockAction {
  type: SharedActionType.TICK_CLOCK;
  // in seconds
  timeDelta: number;
}

export type SharedAction = ClickButtonAction | TickClockAction | GenericAction;
