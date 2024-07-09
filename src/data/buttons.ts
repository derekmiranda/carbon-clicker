import {
  SELF_EDUCATE_THRESHOLDS,
  MAX_MOOD,
  SECS_PER_DAY,
  PHASE_1_KNOWLEDGE_GAIN,
} from "../constants";
import {
  ButtonInterface,
  INITIAL_STATE as INITIAL_BUTTON_STATE,
} from "../reducers/buttonReducer";
import { ButtonKey, EffectTypes, GamePhase, MapLikeInterface } from "../types";

export const buttons: MapLikeInterface<ButtonInterface, ButtonKey> = {
  map: {
    [ButtonKey.selfEducate]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.selfEducate,
      displayName: "Self-Educate",
      description: "Self-Educate",
      icon: "selfeducate.png",
      cooldown: {
        cooldownSeconds: 3 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            knowledge: PHASE_1_KNOWLEDGE_GAIN,
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
          [ButtonKey.turnOffLights]: 10,
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
      cost: {
        mood: 20,
      },
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
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: SELF_EDUCATE_THRESHOLDS.WALLOW,
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

    // Phase 2
    [ButtonKey.destroyFossilFuelIndustry]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.destroyFossilFuelIndustry,
      displayName: "Destroy the Fossil Fuel Industry",
      description: "Destroy the Fossil Fuel Industry",
      // icon: "destroyfossilfuels.png",
      unlocked: false,
      enabled: true,
      cooldown: {
        cooldownSeconds: 4 * SECS_PER_DAY,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      requirements: {
        buttonsUnlocked: [
          ButtonKey.formClimateCoalition /* ButtonKey.organizeCommunity, ButtonKey.volunteer */,
        ],
        resources: {
          knowledge: 500,
          peoplePower: 1000,
          trust: 100,
        },
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 50,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.9,
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
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: SELF_EDUCATE_THRESHOLDS.PHASE_TWO,
        },
        phase: GamePhase.TWO,
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

    [ButtonKey.attendRally]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.attendRally,
      displayName: "Attend a Rally",
      description: "Attend a Rally",
      icon: "rally.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: SELF_EDUCATE_THRESHOLDS.PHASE_TWO,
        },
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 5,
            peoplePower: 10,
          },
        },
      ],
    },

    [ButtonKey.joinClimateOrg]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.joinClimateOrg,
      displayName: "Join a Climate Organization",
      description: "Join a Climate Organization",
      // icon: "org.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.attendRally],
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            trust: 10,
            peoplePower: 30,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.02,
          },
        },
      ],
    },

    [ButtonKey.formClimateCoalition]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.formClimateCoalition,
      displayName: "Form a Climate Coalition",
      description: "Form a Climate Coalition",
      // icon: "coalition.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.joinClimateOrg],
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            trust: 30,
            peoplePower: 100,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.05,
          },
        },
      ],
    },

    [ButtonKey.talkToNeighbor]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.talkToNeighbor,
      displayName: "Talk to your Neighbor",
      description: "Talk to your Neighbor",
      // icon: "neighbor.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: 21,
        },
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            trust: 30,
            peoplePower: 100,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.05,
          },
        },
      ],
    },

    [ButtonKey.startMutualAidFund]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.startMutualAidFund,
      displayName: "Start a Mutual Aid Fund",
      description: "Start a Mutual Aid Fund",
      // icon: "mutualaidfund.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.talkToNeighbor],
        phase: GamePhase.TWO,
        resources: {
          collectiveDollars: 1000,
          peoplePower: 50,
          trust: 75,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 10,
            peoplePower: 20,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.01,
            // TODO: update collective $ rate
            collectiveDollars: 100,
          },
        },
      ],
    },

    [ButtonKey.organizeCommunity]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.organizeCommunity,
      displayName: "Organize your Community",
      description: "Organize your Community",
      // icon: "organizecommuntiy.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.startMutualAidFund],
        phase: GamePhase.TWO,
        resources: {
          peoplePower: 200,
          trust: 90,
        },
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 10,
            peoplePower: 50,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.03,
            // TODO: update collective $ rate
            collectiveDollars: 200,
          },
        },
      ],
    },

    [ButtonKey.vote]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.vote,
      displayName: "Vote",
      description: "Vote",
      // icon: "vote.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: 23,
        },
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 5,
            peoplePower: 5,
            knowledge: 5,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.03,
            // TODO: update collective $ rate
            collectiveDollars: 200,
          },
        },
      ],
    },

    [ButtonKey.cityCouncilMeeting]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.cityCouncilMeeting,
      displayName: "Go to a City Council Meeting",
      description: "Go to a City Council Meeting",
      // icon: "citycouncil.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.vote],
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 5,
            peoplePower: 10,
            knowledge: 10,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.02,
          },
        },
      ],
    },
  },

  order: [
    ButtonKey.destroyFossilFuelIndustry, // !! SHOWS UP AT TOP WHEN AVAILABLE !!

    ButtonKey.selfEducate,
    ButtonKey.turnOffLights,

    ButtonKey.bikeInsteadOfDrive,
    ButtonKey.driveEV,

    ButtonKey.cookVegMeal,
    ButtonKey.homegrownMeal,

    ButtonKey.job,
    ButtonKey.takeABreak,
    ButtonKey.wallowInMisery, // last action button

    // one time

    // phase 2

    ButtonKey.attendRally,
    ButtonKey.joinClimateOrg,
    ButtonKey.formClimateCoalition,

    ButtonKey.talkToNeighbor,
    ButtonKey.startMutualAidFund,
    ButtonKey.organizeCommunity,

    ButtonKey.vote,

    // phase 1
    ButtonKey.startYourOwnGarden,
    ButtonKey.makeHomeEnergyEfficient,
    ButtonKey.buySolarPanels,
    ButtonKey.buyEV,
  ],
};
