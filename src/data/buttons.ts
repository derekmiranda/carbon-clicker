import { MAX_MOOD, SECS_PER_DAY } from "../constants";
import {
  ButtonInterface,
  INITIAL_STATE as INITIAL_BUTTON_STATE,
} from "../reducers/buttonReducer";
import { EffectTypes, MapLikeInterface } from "../types";

export const buttons: MapLikeInterface<ButtonInterface> = {
  map: {
    selfEducate: {
      ...INITIAL_BUTTON_STATE,
      id: "selfEducate",
      displayName: "Self-Educate",
      description: "Self-Educate",
      icon: "/selfeducate.png",
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
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
    turnOffLights: {
      ...INITIAL_BUTTON_STATE,
      id: "turnOffLights",
      displayName: "Turn Off Lights",
      description: "Turn Off Lights",
      icon: "/turnofflights.png",
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
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
    makeHomeEnergyEfficient: {
      ...INITIAL_BUTTON_STATE,
      id: "makeHomeEnergyEfficient",
      displayName: "Make Home Energy-Efficient",
      description: "Make Home Energy-Efficient",
      icon: "/home.png",
      unlocked: false,
      enabled: false,
      oneTime: true,
      cost: {
        dollars: 500,
      },
      requirements: {
        timesButtonsPressed: {
          turnOffLights: 10,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            co2Saved: 2,
            dollars: 0.333,
          },
        },
      ],
    },
    buySolarPanels: {
      ...INITIAL_BUTTON_STATE,
      id: "buySolarPanels",
      displayName: "Buy Solar Panels",
      description: "Buy Solar Panels",
      unlocked: false,
      enabled: false,
      oneTime: true,
      cost: {
        dollars: 5000,
      },
      requirements: {
        buttonsUnlocked: ["makeHomeEnergyEfficient"],
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            co2Saved: 0.5,
            dollars: 3.33,
          },
        },
      ],
    },
    bikeInsteadOfDrive: {
      ...INITIAL_BUTTON_STATE,
      id: "bikeInsteadOfDrive",
      displayName: "Bike Instead of Drive",
      description: "Bike Instead of Drive",
      icon: "/bike.png",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        resources: {
          knowledge: 1,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            co2Saved: 2,
            mood: 2,
          },
        },
      ],
    },
    cookVegMeal: {
      ...INITIAL_BUTTON_STATE,
      id: "cookVegMeal",
      displayName: "Cook a Vegeterian Meal",
      description: "Cook a Vegeterian Meal",
      icon: "/vegmeal.png",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        resources: {
          knowledge: 2,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            co2Saved: 3,
            mood: 4,
          },
        },
      ],
    },
    job: {
      ...INITIAL_BUTTON_STATE,
      id: "job",
      displayName: "Job",
      description: "Job",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 2 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        resources: {
          knowledge: 3,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            dollars: 100,
            mood: -10,
          },
        },
      ],
    },
    wallowInMisery: {
      ...INITIAL_BUTTON_STATE,
      id: "wallowInMisery",
      displayName: "Wallow in Misery",
      description: "Wallow in Misery",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        resources: {
          knowledge: 12,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: -1,
          },
        },
      ],
    },
    takeABreak: {
      ...INITIAL_BUTTON_STATE,
      id: "takeABreak",
      displayName: "Take a Break",
      description: "Take a Break",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 4 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        resources: {
          knowledge: 13,
        },
        // TODO: phase 2
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: MAX_MOOD,
          },
        },
      ],
    },
  },
  order: [
    "selfEducate",
    "turnOffLights",
    "bikeInsteadOfDrive",
    "cookVegMeal",
    "job",
    "takeABreak",
    "wallowInMisery",
    "makeHomeEnergyEfficient",
    "buySolarPanels",
  ],
};
