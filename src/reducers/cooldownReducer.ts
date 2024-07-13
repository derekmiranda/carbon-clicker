import {
  REAAAALLLYYY_TIRED_MOOD_PERCENT,
  TIRED_MOOD_PERCENT,
} from "../constants";
import {
  SharedAction,
  SharedActionType,
  TickCooldownAction,
} from "../types/actions";

export interface CooldownInterface {
  baseCooldownSeconds: number;
  cooldownSeconds: number;
  elapsedCooldownSeconds: number;
  onCooldown: boolean;
  temporary?: boolean;
}

export enum CooldownActionType {
  START_COOLDOWN = "START_COOLDOWN",
  END_COOLDOWN = "END_COOLDOWN",
  TICK_COOLDOWN = "TICK_COOLDOWN",
}

export interface StartCooldownAction {
  type: CooldownActionType.START_COOLDOWN;
  moodPercent: number;
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
  if (!state) return state;

  switch (action.type) {
    case CooldownActionType.START_COOLDOWN: {
      const { moodPercent } = action as StartCooldownAction;
      const cooldownModifier =
        moodPercent < REAAAALLLYYY_TIRED_MOOD_PERCENT
          ? 2
          : moodPercent < TIRED_MOOD_PERCENT
          ? 1.5
          : 1;
      return {
        ...state,
        onCooldown: true,
        cooldownSeconds: state.baseCooldownSeconds * cooldownModifier,
        elapsedCooldownSeconds: 0,
      };
    }

    case CooldownActionType.END_COOLDOWN: {
      return state.temporary
        ? null
        : {
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
      const coolingDown = newTime < cooldownSeconds;

      return state.temporary && !coolingDown
        ? null
        : {
            ...state,
            onCooldown: coolingDown,
            elapsedCooldownSeconds: Math.min(
              currSecs + timeDelta,
              cooldownSeconds
            ),
          };
    }
  }
}
