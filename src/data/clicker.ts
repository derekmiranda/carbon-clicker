import {
  MAX_MOOD,
  SECS_PER_DAY,
  SELF_EDUCATE_THRESHOLDS,
  STARTING_PPM,
  STARTING_PPM_RATE,
} from "../constants";
import { ClickerInterface } from "../reducers/clickerReducer";
import { ButtonKey, GamePhase, ModalView } from "../types";
import { buttons, PHASE_TWO_SELF_EDUCATE_EFFECTS } from "./buttons";

export const defaultClicker: ClickerInterface = {
  modalQueue: [{ view: ModalView.INTRO }],
  logs: [],
  ppmEventIndex: -1,
  endgameSequenceIndex: -1,
  storySeen: {},
  phase: GamePhase.ONE,
  muted: false,
  resources: {
    mood: MAX_MOOD,
    maxMood: MAX_MOOD,
    dollars: 0,
    co2Saved: 0,
    knowledge: 0,
    globalPpm: STARTING_PPM,

    // phase 2
    peoplePower: 0,
    trust: 0,
    collectiveDollars: 0,
  }, // diff per second
  resourceGrowthRates: {
    globalPpm: STARTING_PPM_RATE,
    mood: 1 / SECS_PER_DAY,
  },
  buttons,
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
  hideButtonTooltip: false,
};

// test data for phase 2
export const phaseTwoClicker: ClickerInterface = {
  ...defaultClicker,
  modalQueue: [{ view: ModalView.END_PHASE_ONE }],
  ppmEventIndex: 3,
  phase: GamePhase.TWO,
  resources: {
    mood: MAX_MOOD,
    maxMood: MAX_MOOD,
    dollars: 1000,
    co2Saved: 1000,
    knowledge: 50,
    globalPpm: 427,

    // phase 2
    peoplePower: 0,
    trust: 0,
    collectiveDollars: 0,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: STARTING_PPM_RATE,
    mood: 1 / SECS_PER_DAY,
  },
  buttons: {
    ...defaultClicker.buttons,
    map: {
      ...defaultClicker.buttons.map,
      [ButtonKey.selfEducate]: {
        ...defaultClicker.buttons.map[ButtonKey.selfEducate]!,
        timesPressed: SELF_EDUCATE_THRESHOLDS.PHASE_TWO + 1,
        effects: PHASE_TWO_SELF_EDUCATE_EFFECTS,
      },
    },
  },
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};

export const pathwayClicker: ClickerInterface = {
  ...defaultClicker,
  modalQueue: [],
  ppmEventIndex: 5,
  phase: GamePhase.TWO,
  resources: {
    mood: MAX_MOOD,
    maxMood: MAX_MOOD,
    dollars: 1000,
    knowledge: 100,
    co2Saved: 5000,
    globalPpm: 428,

    // phase 2
    peoplePower: 500,
    trust: 90,
    collectiveDollars: 10000,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: STARTING_PPM_RATE,
    mood: 1 / SECS_PER_DAY,
  },
  buttons: {
    ...defaultClicker.buttons,
    map: {
      ...defaultClicker.buttons.map,
      [ButtonKey.selfEducate]: {
        ...defaultClicker.buttons.map[ButtonKey.selfEducate]!,
        timesPressed: SELF_EDUCATE_THRESHOLDS.PHASE_TWO + 4,
        effects: PHASE_TWO_SELF_EDUCATE_EFFECTS,
      },

      // !! button to click to trigger choosing pathway !!
      [ButtonKey.organizeCommunity]: {
        ...defaultClicker.buttons.map[ButtonKey.organizeCommunity]!,
        purchased: false,
        unlocked: true,
        enabled: true,
      },

      [ButtonKey.attendRally]: {
        ...defaultClicker.buttons.map[ButtonKey.attendRally]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.joinClimateOrg]: {
        ...defaultClicker.buttons.map[ButtonKey.joinClimateOrg]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.formClimateCoalition]: {
        ...defaultClicker.buttons.map[ButtonKey.formClimateCoalition]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },

      [ButtonKey.talkToNeighbor]: {
        ...defaultClicker.buttons.map[ButtonKey.talkToNeighbor]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.startMutualAidFund]: {
        ...defaultClicker.buttons.map[ButtonKey.startMutualAidFund]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },

      [ButtonKey.vote]: {
        ...defaultClicker.buttons.map[ButtonKey.vote]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.cityCouncilMeeting]: {
        ...defaultClicker.buttons.map[ButtonKey.cityCouncilMeeting]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.volunteer]: {
        ...defaultClicker.buttons.map[ButtonKey.volunteer]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
    },
  },
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};

// test data for ending
export const endgameClicker: ClickerInterface = {
  ...defaultClicker,
  modalQueue: [],
  ppmEventIndex: 5,
  phase: GamePhase.TWO,
  resources: {
    mood: MAX_MOOD,
    maxMood: MAX_MOOD,
    dollars: 1000,
    co2Saved: 5000,
    knowledge: 500,
    globalPpm: 428,

    // phase 2
    peoplePower: 999,
    trust: 100,
    collectiveDollars: 5000000,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: STARTING_PPM_RATE,
    mood: 1 / SECS_PER_DAY,
  },
  buttons: {
    ...defaultClicker.buttons,
    map: {
      ...defaultClicker.buttons.map,
      [ButtonKey.selfEducate]: {
        ...defaultClicker.buttons.map[ButtonKey.selfEducate]!,
        timesPressed: SELF_EDUCATE_THRESHOLDS.PHASE_TWO + 4,
        effects: PHASE_TWO_SELF_EDUCATE_EFFECTS,
      },

      // !! button to click to trigger choosing pathway !!
      [ButtonKey.organizeCommunity]: {
        ...defaultClicker.buttons.map[ButtonKey.organizeCommunity]!,
        purchased: false,
        unlocked: true,
        enabled: true,
      },

      [ButtonKey.attendRally]: {
        ...defaultClicker.buttons.map[ButtonKey.attendRally]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.joinClimateOrg]: {
        ...defaultClicker.buttons.map[ButtonKey.joinClimateOrg]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.formClimateCoalition]: {
        ...defaultClicker.buttons.map[ButtonKey.formClimateCoalition]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },

      [ButtonKey.talkToNeighbor]: {
        ...defaultClicker.buttons.map[ButtonKey.talkToNeighbor]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.startMutualAidFund]: {
        ...defaultClicker.buttons.map[ButtonKey.startMutualAidFund]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },

      [ButtonKey.vote]: {
        ...defaultClicker.buttons.map[ButtonKey.vote]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.cityCouncilMeeting]: {
        ...defaultClicker.buttons.map[ButtonKey.cityCouncilMeeting]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.volunteer]: {
        ...defaultClicker.buttons.map[ButtonKey.volunteer]!,
        purchased: true,
        unlocked: true,
        enabled: false,
      },
    },
  },
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};
