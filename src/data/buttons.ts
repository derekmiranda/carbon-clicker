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
import {
  ButtonKey,
  EffectTypes,
  GamePhase,
  GenericEffect,
  MapLikeInterface,
  Pathway,
  UpdateResourcesEffect,
} from "../types";

export const buttons: MapLikeInterface<ButtonInterface, ButtonKey> = {
  map: {
    [ButtonKey.selfEducate]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.selfEducate,
      displayName: "Self-Educate",
      description: "Self-Educate",
      icon: "selfeducate.png",
      cooldown: {
        baseCooldownSeconds: 3 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        baseCooldownSeconds: 1 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        dollars: 1000,
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
        baseCooldownSeconds: 1 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        baseCooldownSeconds: 1 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        dollars: 2000,
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
        baseCooldownSeconds: 1 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        baseCooldownSeconds: 1 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        mood: 30,
      },
      cooldown: {
        baseCooldownSeconds: 2 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
        baseCooldownSeconds: 1 * SECS_PER_DAY,
        cooldownSeconds: 1,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      cost: { mood: 1 },
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: SELF_EDUCATE_THRESHOLDS.WALLOW,
        },
      },
    },

    [ButtonKey.directAction]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.directAction,
      displayName: "Direct Action",
      description: "Direct Action",
      unlocked: false,
      enabled: true,
      // icon: "directaction.png",
      cooldown: {
        baseCooldownSeconds: 4 * SECS_PER_DAY,
        cooldownSeconds: 1,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      cost: {
        collectiveDollars: 100,
        mood: 10,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.attendRally],
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            peoplePower: 10,
            trust: 5,
          },
        },
      ],
    },

    [ButtonKey.communityCare]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.communityCare,
      displayName: "Community Care",
      description: "Community Care",
      unlocked: false,
      enabled: true,
      // icon: "communitycare.png",
      cooldown: {
        baseCooldownSeconds: 4 * SECS_PER_DAY,
        cooldownSeconds: 1,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      cost: {
        collectiveDollars: 100,
        mood: 5,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.talkToNeighbor],
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            collectiveDollars: 200, // TODO: scale up amount
            peoplePower: 5,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.01,
          },
        },
      ],
    },

    [ButtonKey.politicalAction]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.politicalAction,
      displayName: "Political Action",
      description: "Political Action",
      unlocked: false,
      enabled: true,
      // icon: "politicalaction.png",
      cooldown: {
        baseCooldownSeconds: 4 * SECS_PER_DAY,
        cooldownSeconds: 1,
        elapsedCooldownSeconds: 0,
        onCooldown: false,
      },
      cost: {
        collectiveDollars: 200,
        mood: 10,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.vote],
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            peoplePower: 5,
            knowledge: 5,
            trust: -5,
          },
        },
        {
          type: EffectTypes.UPDATE_RESOURCES_RATE,
          resourcesRateDiff: {
            globalPpm: -0.03,
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
      enabled: false,
      oneTime: true,
      cost: {
        knowledge: 250,
        peoplePower: 1000,
        trust: 100,
        noDeduct: true,
      },
      requirements: {
        buttonsUnlocked: [
          ButtonKey.formClimateCoalition,
          ButtonKey.organizeCommunity,
          ButtonKey.volunteer,
        ],
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
        baseCooldownSeconds: 4 * SECS_PER_DAY,
        cooldownSeconds: 1,
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
      icon: "org.png",
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
      icon: "coalition.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      cost: {
        peoplePower: 100,
        trust: 50,
        noDeduct: true,
      },
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
      icon: "neighbor.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: SELF_EDUCATE_THRESHOLDS.NEIGHBOR,
        },
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 10,
            peoplePower: 5,
          },
        },
      ],
    },

    [ButtonKey.startMutualAidFund]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.startMutualAidFund,
      displayName: "Start a Mutual Aid Fund",
      description: "Start a Mutual Aid Fund",
      icon: "mutualaidfund.png",
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
      icon: "organizecommunity.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      cost: {
        peoplePower: 200,
        trust: 90,
        noDeduct: true,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.startMutualAidFund],
        phase: GamePhase.TWO,
        resources: {
          peoplePower: 100,
          trust: 50,
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
      icon: "vote.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        timesButtonsPressed: {
          [ButtonKey.selfEducate]: SELF_EDUCATE_THRESHOLDS.VOTE,
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
      icon: "city-council-meeting.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      cost: {
        noDeduct: true,
        knowledge: 70,
      },
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

    [ButtonKey.volunteer]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.volunteer,
      displayName: "Volunteer",
      description: "Volunteer",
      icon: "volunteer.png",
      oneTime: true,
      unlocked: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.cityCouncilMeeting],
        resources: {
          collectiveDollars: 2000,
          knowledge: 100,
        },
        phase: GamePhase.TWO,
      },
      effects: [
        {
          type: EffectTypes.UPDATE_RESOURCES,
          resourcesDiff: {
            mood: 5,
            peoplePower: 20,
            knowledge: 30,
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

    // revolution
    [ButtonKey.blowUpPipeline]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.blowUpPipeline,
      displayName: "Blow Up a Pipeline",
      description: "Blow Up a Pipeline",
      // icon: "blowup.png",
      oneTime: true,
      unlocked: false,
      enabled: false,
      cost: {
        collectiveDollars: 50000,
      },
      requirements: {
        phase: GamePhase.TWO,
        pathway: Pathway.REVOLUTION,
      },
    },

    [ButtonKey.intimidateBank]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.intimidateBank,
      displayName: "Intimidate a bank to divest from fossil fuels",
      description: "Intimidate a bank to divest from fossil fuels",
      // icon: "intimidate.png",
      oneTime: true,
      unlocked: false,
      enabled: false,
      cost: {
        collectiveDollars: 100000,
      },
      requirements: {
        resources: {
          peoplePower: 100000,
          trust: 75,
        },
        phase: GamePhase.TWO,
        pathway: Pathway.REVOLUTION,
      },
    },

    [ButtonKey.takeOver]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.takeOver,
      displayName: "Take Over a City Government",
      description: "Take Over a City Government",
      // icon: "takeover.png",
      oneTime: true,
      unlocked: false,
      enabled: false,
      cost: {
        collectiveDollars: 500000,
      },
      requirements: {
        buttonsUnlocked: [ButtonKey.blowUpPipeline],
        phase: GamePhase.TWO,
        pathway: Pathway.REVOLUTION,
      },
    },

    // cooperation
    [ButtonKey.fillCityCouncil]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.fillCityCouncil,
      displayName: "Fill City Council with Climate Justice Champions",
      description: "Fill City Council with Climate Justice Champions",
      // icon: "citycouncil.png",
      oneTime: true,
      unlocked: false,
      // enabled: false,
      enabled: true,
      requirements: {
        phase: GamePhase.TWO,
        pathway: Pathway.COOPERATION,
      },
    },

    [ButtonKey.passBills]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.passBills,
      displayName: "Pass a Package of Climate Action Bills",
      description: "Pass a Package of Climate Action Bills",
      // icon: "passbills.png",
      oneTime: true,
      unlocked: false,
      // enabled: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.fillCityCouncil],
        phase: GamePhase.TWO,
        pathway: Pathway.COOPERATION,
      },
    },

    [ButtonKey.speakAtCOP]: {
      ...INITIAL_BUTTON_STATE,
      id: ButtonKey.speakAtCOP,
      displayName: "Speak at Conference of Parties (COP)",
      description: "Speak at Conference of Parties (COP)",
      // icon: "speakatcop.png",
      oneTime: true,
      unlocked: false,
      // enabled: false,
      enabled: true,
      requirements: {
        buttonsUnlocked: [ButtonKey.passBills],
        phase: GamePhase.TWO,
        pathway: Pathway.COOPERATION,
      },
    },
  },

  order: [
    ButtonKey.destroyFossilFuelIndustry, // !! SHOWS UP AT TOP WHEN AVAILABLE !!

    // phase 2-specific
    ButtonKey.selfEducate,
    ButtonKey.directAction,
    ButtonKey.communityCare,
    ButtonKey.politicalAction,

    // phase 1-specific
    ButtonKey.turnOffLights,

    ButtonKey.bikeInsteadOfDrive,
    ButtonKey.driveEV,

    ButtonKey.cookVegMeal,
    ButtonKey.homegrownMeal,

    ButtonKey.job,
    ButtonKey.takeABreak,
    ButtonKey.wallowInMisery, // last action button

    // one time

    // revolution
    ButtonKey.blowUpPipeline,
    ButtonKey.intimidateBank,
    ButtonKey.takeOver,

    // cooperation
    ButtonKey.fillCityCouncil,
    ButtonKey.passBills,
    ButtonKey.speakAtCOP,

    // phase 2
    ButtonKey.attendRally,
    ButtonKey.joinClimateOrg,
    ButtonKey.formClimateCoalition,

    ButtonKey.talkToNeighbor,
    ButtonKey.startMutualAidFund,
    ButtonKey.organizeCommunity,

    ButtonKey.vote,
    ButtonKey.cityCouncilMeeting,
    ButtonKey.volunteer,

    // phase 1
    ButtonKey.startYourOwnGarden,
    ButtonKey.makeHomeEnergyEfficient,
    ButtonKey.buySolarPanels,
    ButtonKey.buyEV,
  ],
};

export const PHASE_TWO_SELF_EDUCATE_EFFECTS: GenericEffect[] = [
  {
    type: EffectTypes.UPDATE_RESOURCES,
    resourcesDiff: {
      knowledge: 3,
    },
  } as UpdateResourcesEffect,
];
