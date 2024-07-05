import {
  SharedAction,
  SharedActionType,
  TickCooldownAction,
} from "../types/actions";

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

export type CooldownActions =
  | StartCooldownAction
  | EndCooldownAction
  | SharedAction;

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

    case SharedActionType.TICK_COOLDOWN: {
      const {
        onCooldown,
        cooldownSeconds,
        elapsedCooldownSeconds: currSecs,
      } = state;

      if (!onCooldown) {
        return state;
      }

      const { timeDelta } = action as TickCooldownAction;
      const newTime = currSecs + timeDelta;

      return {
        ...state,
        onCooldown: newTime < cooldownSeconds,
        elapsedCooldownSeconds: Math.min(currSecs + timeDelta, cooldownSeconds),
      };
    }
  }
}
