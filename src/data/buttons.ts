import { INITIAL_STATE as INITIAL_BUTTON_STATE } from "../reducers/buttonReducer";
import { EffectTypes } from "../types";

export const buttons = {
  map: {
    turnOffLights: {
      ...INITIAL_BUTTON_STATE,
      id: "turnOffLights",
      displayName: "Turn Off Lights",
      description: "Turn Off Lights",
      cooldown: {
        cooldownSeconds: 5,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            co2Saved: 1,
          },
        },
      ],
    },
    selfEducate: {
      ...INITIAL_BUTTON_STATE,
      id: "selfEducate",
      displayName: "Self-Educate",
      description: "Self-Educate",
      cooldown: {
        cooldownSeconds: 1,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            knowledge: 1,
          },
        },
      ],
    },
    makeHomeEnergyEfficient: {
      ...INITIAL_BUTTON_STATE,
      id: "makeHomeEnergyEfficient",
      displayName: "Make Home Energy-Efficient",
      description: "Make Home Energy-Efficient",
      unlocked: false,
      requirements: {
        timesButtonsPressed: {
          turnOffLights: 1,
        },
      },
    },
  },
  order: ["turnOffLights", "selfEducate", "makeHomeEnergyEfficient"],
};
