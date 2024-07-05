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
      icon: "selfeducate.png",
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
      icon: "turnofflights.png",
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
      icon: "home.png",
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
      icon: "solarpanel.png",
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
      icon: "bike.png",
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
    driveEV: {
      ...INITIAL_BUTTON_STATE,
      id: "driveEV",
      displayName: "Drive EV",
      description: "Drive EV",
      unlocked: false,
      enabled: false,
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        buttonsUnlocked: ["buyEV"],
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            co2Saved: 10,
          },
        },
      ],
    },
    buyEV: {
      ...INITIAL_BUTTON_STATE,
      id: "buyEV",
      displayName: "Buy Electric Vehicle",
      description: "Buy Electric Vehicle",
      oneTime: true,
      unlocked: false,
      enabled: false,
      requirements: {
        timesButtonsPressed: {
          bikeInsteadOfDrive: 10,
        },
      },
      cost: {
        dollars: 10000,
      },
    },
    cookVegMeal: {
      ...INITIAL_BUTTON_STATE,
      id: "cookVegMeal",
      displayName: "Cook a Vegetarian Meal",
      description: "Cook a Vegetarian Meal",
      icon: "vegmeal.png",
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
    homegrownMeal: {
      ...INITIAL_BUTTON_STATE,
      id: "homegrownMeal",
      displayName: "Cook with Homegrown Produce",
      description: "Cook with Homegrown Produce",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        buttonsUnlocked: ["startYourOwnGarden"],
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            co2Saved: 6,
            mood: 4,
          },
        },
      ],
    },
    startYourOwnGarden: {
      ...INITIAL_BUTTON_STATE,
      id: "startYourOwnGarden",
      displayName: "Start your own Garden",
      description: "Start your own Garden",
      unlocked: false,
      enabled: true,
      oneTime: true,
      requirements: {
        timesButtonsPressed: {
          cookVegMeal: 10,
        },
      },
      cost: {
        dollars: 50,
      },
    },
    job: {
      ...INITIAL_BUTTON_STATE,
      id: "job",
      displayName: "Job",
      description: "Job",
      icon: "job.png",
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
      icon: "wallow.png",
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
      icon: "takebreak.png",
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
        // TODO: only enable in phase 2
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
    "driveEV",
    "cookVegMeal",
    "job",
    "takeABreak",
    "wallowInMisery",

    // one time
    "startYourOwnGarden",
    "buyEV",
    "makeHomeEnergyEfficient",
    "buySolarPanels",
  ],
};
