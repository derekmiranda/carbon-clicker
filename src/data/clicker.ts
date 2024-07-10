import {
  MAX_MOOD,
  SELF_EDUCATE_THRESHOLDS,
  STARTING_PPM,
  STARTING_PPM_RATE,
} from "../constants";
import { ButtonInterface } from "../reducers/buttonReducer";
import { ClickerInterface } from "../reducers/clickerReducer";
import { ButtonKey, GamePhase, ModalView } from "../types";
import { buttons, PHASE_TWO_SELF_EDUCATE_EFFECTS } from "./buttons";

export const clicker: ClickerInterface = {
  modalQueue: [{ view: ModalView.INTRO }],
  logs: [],
  ppmEventIndex: -1,
  storySeen: {},
  phase: GamePhase.ONE,
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
  },
  buttons,
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};

// test data for phase 2
export const phaseTwoClicker: ClickerInterface = {
  modalQueue: [{ view: ModalView.END_PHASE_ONE }],
  logs: [],
  ppmEventIndex: 3,
  storySeen: {},
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
  },
  buttons: {
    ...clicker.buttons,
    map: {
      ...clicker.buttons.map,
      [ButtonKey.selfEducate]: {
        ...(clicker.buttons.map[ButtonKey.selfEducate] as ButtonInterface),
        timesPressed: SELF_EDUCATE_THRESHOLDS.PHASE_TWO + 1,
        effects: PHASE_TWO_SELF_EDUCATE_EFFECTS,
      },
    },
  },
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};

// test data for pathway
export const pathwayClicker: ClickerInterface = {
  modalQueue: [],
  logs: [],
  ppmEventIndex: 5,
  storySeen: {},
  phase: GamePhase.TWO,
  resources: {
    mood: MAX_MOOD,
    maxMood: MAX_MOOD,
    dollars: 1000,
    co2Saved: 5000,
    knowledge: 70,
    globalPpm: 428,

    // phase 2
    peoplePower: 300,
    trust: 90,
    collectiveDollars: 10000,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: STARTING_PPM_RATE,
  },
  buttons: {
    ...clicker.buttons,
    map: {
      ...clicker.buttons.map,
      [ButtonKey.selfEducate]: {
        ...(clicker.buttons.map[ButtonKey.selfEducate] as ButtonInterface),
        timesPressed: SELF_EDUCATE_THRESHOLDS.PHASE_TWO + 4,
        effects: PHASE_TWO_SELF_EDUCATE_EFFECTS,
      },
      [ButtonKey.formClimateCoalition]: {
        ...(clicker.buttons.map[
          ButtonKey.formClimateCoalition
        ] as ButtonInterface),
        purchased: true,
        unlocked: true,
        enabled: false,
      },
      [ButtonKey.organizeCommunity]: {
        ...(clicker.buttons.map[
          ButtonKey.organizeCommunity
        ] as ButtonInterface),
        purchased: false,
        unlocked: true,
        enabled: true,
      },
      [ButtonKey.volunteer]: {
        ...(clicker.buttons.map[ButtonKey.volunteer] as ButtonInterface),
        purchased: true,
        unlocked: true,
        enabled: false,
      },
    },
  },
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};
