export interface CooldownInterface {
  cooldownSeconds: number;
  elapsedCooldownSeconds: number;
  onCooldown: boolean;
}

export enum CooldownActionType {
  START_COOLDOWN = "START_COOLDOWN",
  END_COOLDOWN = "END_COOLDOWN",
  TICK_COOLDOWN = "TICK_COOLDOWN",
}

export interface StartCooldownAction {
  type: CooldownActionType.START_COOLDOWN;
}

export interface EndCooldownAction {
  type: CooldownActionType.END_COOLDOWN;
}

export interface TickCooldownAction {
  type: CooldownActionType.TICK_COOLDOWN;
  elapsedSeconds: number;
}

export type CooldownActions =
  | StartCooldownAction
  | EndCooldownAction
  | TickCooldownAction;

export default function cooldownReducer(
  state: CooldownInterface,
  action: CooldownActions
) {
  switch (action.type) {
    case CooldownActionType.START_COOLDOWN: {
      return {
        ...state,
        onCooldown: true,
        elapsedCooldownSeconds: 0,
      };
    }

    case CooldownActionType.END_COOLDOWN: {
      return {
        ...state,
        onCooldown: false,
        elapsedCooldownSeconds: 0,
      };
    }

    case CooldownActionType.TICK_COOLDOWN: {
      const { cooldownSeconds, elapsedCooldownSeconds: currSecs } = state;
      const { elapsedSeconds } = action;
      return {
        ...state,
        onCooldown: false,
        elapsedCooldownSeconds: Math.min(
          currSecs + elapsedSeconds,
          cooldownSeconds
        ),
      };
    }
  }
}
