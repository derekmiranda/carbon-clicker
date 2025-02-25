import {
  EffectTypes,
  GamePhase,
  GenericEffect,
  ResourceTypes,
  UpdateResourcesEffect,
} from "../types";

export interface PpmEvent {
  eventType: string;
  ppm: number;
  text: string;
  effects: GenericEffect[];
  targetPhase?: GamePhase;
}

const ppmEvents: PpmEvent[] = [
  {
    eventType: "Heat wave",
    ppm: 425.5,
    text: "a record-breaking heat wave occurs, and many people die. extreme heat is the #1 weather-related threat to public health. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -100,
          peoplePower: -0.1,
        },
        proportionalDiffs: { [ResourceTypes.PEOPLE_POWER]: true },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Flood",
    ppm: 426,
    text: "a flood occurs. as climate change continues to worsen, flooding damage will cost the US trillions in repairs. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -50,
          dollars: -0.1,
          collectiveDollars: -0.1,
        },
        proportionalDiffs: {
          [ResourceTypes.DOLLARS]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Wildfire",
    ppm: 426.5,
    text: "a wildfire sweeps through the area. countless people lose their homes and the skies turn smoky and orange. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -50,
          peoplePower: -0.05,
          dollars: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.DOLLARS]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Hurricane",
    ppm: 427,
    text: "your area sees the worst hurricane on record. entire neighborhoods lose their homes, and in the aftermath, thousands go missing. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -100,
          peoplePower: -0.05,
          dollars: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.DOLLARS]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Fossil fuel marketing",
    ppm: 427.5,
    text: "fossil fuel corporations release an attack ad on your group. you know it's because they're afraid of you, but it tarnishes your reputation.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -20,
          trust: -10,
          peoplePower: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Landslide",
    ppm: 428,
    text: "you hear of a landslide happening far away. it is horrible and kills hundreds of people. even though it doesn't affect you personally, seeing the images on social media of the grieving families brings you down.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -70,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Coral bleach",
    ppm: 428.5,
    text: "a massive coral bleaching event occurs on the other side of the world. on a free day, you stare out at the ocean. you can sense that far away, something beautiful has died.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -50,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Fossil fuel marketing",
    ppm: 429,
    text: "fossil fuel corporations release an attack ad on your group. you know it's because they're afraid of you, but it tarnishes your reputation.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -20,
          trust: -10,
          peoplePower: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },
  {
    eventType: "Hurricane",
    ppm: 429.5,
    text: "another hurricane has battered islands in the caribbean. the devastation is awful. your group donates some funds to try and help -- solidarity, not charity.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -20,
          trust: 10,
          collectiveDollars: -0.02,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.DOLLARS]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Migrants",
    ppm: 430,
    text: "climate migrants from the hurricane arrive in your city. many of them decide to join your movement.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          peoplePower: -0.05,
          trust: 5,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },
  {
    eventType: "Heat wave",
    ppm: 430.5,
    text: "an even bigger heat wave occurs, and many people die. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -100,
          peoplePower: -0.15,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Fossil fuel marketing",
    ppm: 431,
    text: "fossil fuel corporations release an attack ad on your group. you know it's because they're afraid of you, but it tarnishes your reputation.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -20,
          trust: -10,
          peoplePower: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Food",
    ppm: 431.5,
    text: "cascading events result in a shock to the food supply. your group helps out the community, but it puts a strain on everyone's wallets.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          trust: 10,
          peoplePower: -0.1,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Flood",
    ppm: 432,
    text: "the coastlines surge with floodwaters. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -50,
          dollars: -0.15,
          collectiveDollars: -0.15,
        },
        proportionalDiffs: {
          [ResourceTypes.DOLLARS]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Wildfire",
    ppm: 432.5,
    text: "another wildfire, another week of terrible air quality. your mood plummets.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -80,
          peoplePower: -0.05,
          dollars: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.DOLLARS]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Fossil fuel marketing",
    ppm: 433,
    text: "fossil fuel corporations release an attack ad on your group. you know it's because they're afraid of you, but it tarnishes your reputation.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -20,
          trust: -10,
          peoplePower: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Drought",
    ppm: 433.5,
    text: "the ongoing drought means that for the first time ever, water prices have skyrocketed. your group helps out the community, but it puts a strain on everyone's wallets.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          trust: 10,
          collectiveDollars: -0.1,
        },
        proportionalDiffs: {
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Protests",
    ppm: 434,
    text: "climate protests in another part of the world are met with extreme violence. anger propels your group to deliver a scathing statement and deliver funds to the victims. the public responds with support.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          trust: 10,
          peoplePower: 0.05,
          collectiveDollars: 0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
          [ResourceTypes.PEOPLE_POWER]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Ice sheet",
    ppm: 434.5,
    text: "a significant ice sheet collapses. it's an irreversible event. the oceans seem to loom over you.",
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -50,
        },
      } as UpdateResourcesEffect,
    ],
  },

  {
    eventType: "Fossil fuel marketing",
    ppm: 435,
    text: "fossil fuel corporations release an attack ad on your group. you know it's because they're afraid of you, but it tarnishes your reputation.",
    targetPhase: GamePhase.TWO,
    effects: [
      {
        type: EffectTypes.UPDATE_RESOURCES,
        resourcesDiff: {
          mood: -20,
          trust: -10,
          peoplePower: -0.05,
          collectiveDollars: -0.05,
        },
        proportionalDiffs: {
          [ResourceTypes.PEOPLE_POWER]: true,
          [ResourceTypes.COLLECTIVE_DOLLARS]: true,
        },
      } as UpdateResourcesEffect,
    ],
  },
];

export default ppmEvents;
