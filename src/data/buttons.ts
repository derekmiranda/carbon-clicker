import {
  END_PHASE_1_KNOWLEDGE_DROPPING,
  KNOWLEDGE_DROPPINGS,
  MAX_MOOD,
  SECS_PER_DAY,
} from "../constants";
import {
  ButtonInterface,
  INITIAL_STATE as INITIAL_BUTTON_STATE,
} from "../reducers/buttonReducer";
import { ButtonKey, EffectTypes, MapLikeInterface } from "../types";

export const buttons: MapLikeInterface<ButtonInterface, ButtonKey> = {
  map: {
    [ButtonKey.selfEducate]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.selfEducate,
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
    [ButtonKey.turnOffLights]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.turnOffLights,
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
    [ButtonKey.makeHomeEnergyEfficient]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.makeHomeEnergyEfficient,
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
    [ButtonKey.buySolarPanels]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.buySolarPanels,
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
        buttonsUnlocked: [ButtonKey.makeHomeEnergyEfficient],
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
    [ButtonKey.bikeInsteadOfDrive]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.bikeInsteadOfDrive,
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
    [ButtonKey.driveEV]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.driveEV,
      displayName: "Drive EV",
      description: "Drive EV",
      icon: "ev.png",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.buyEV],
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
    [ButtonKey.buyEV]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.buyEV,
      displayName: "Buy Electric Vehicle",
      description: "Buy Electric Vehicle",
      icon: "ev.png",
      oneTime: true,
      unlocked: false,
      enabled: false,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.bikeInsteadOfDrive]: 10,
        },
      },
      cost: {
        dollars: 10000,
      },
    },
    [ButtonKey.cookVegMeal]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.cookVegMeal,
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
    [ButtonKey.homegrownMeal]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.homegrownMeal,
      displayName: "Cook with Homegrown Produce",
      description: "Cook with Homegrown Produce",
      unlocked: false,
      enabled: true,
      icon: "homegrown.png",
      cooldown: {
        cooldownSeconds: 1 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.startYourOwnGarden],
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
    [ButtonKey.startYourOwnGarden]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.startYourOwnGarden,
      displayName: "Start your own Garden",
      description: "Start your own Garden",
      icon: "garden.png",
      unlocked: false,
      enabled: true,
      oneTime: true,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.cookVegMeal]: 10,
        },
      },
      cost: {
        dollars: 50,
      },
    },
    [ButtonKey.job]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.job,
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
    [ButtonKey.wallowInMisery]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.wallowInMisery,
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
    [ButtonKey.takeABreak]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.takeABreak,
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
          knowledge:
            KNOWLEDGE_DROPPINGS.findIndex(
              (message) => message === END_PHASE_1_KNOWLEDGE_DROPPING
            ) + 1,
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
    ButtonKey.selfEducate,
    ButtonKey.turnOffLights,
    ButtonKey.bikeInsteadOfDrive,
    ButtonKey.driveEV,
    ButtonKey.cookVegMeal,
    ButtonKey.homegrownMeal,
    ButtonKey.job,
    ButtonKey.takeABreak,
    ButtonKey.wallowInMisery,

    // one time
    ButtonKey.startYourOwnGarden,
    ButtonKey.makeHomeEnergyEfficient,
    ButtonKey.buySolarPanels,
    ButtonKey.buyEV,
  ],
};
