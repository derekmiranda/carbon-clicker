import { MAX_MOOD, STARTING_PPM, STARTING_PPM_RATE } from "../constants";
import { ClickerInterface } from "../reducers/clickerReducer";
import { GamePhase, ModalView } from "../types";
import { buttons } from "./buttons";

export const clicker: ClickerInterface = {
  modalQueue: [ModalView.INTRO],
  logs: [],
  storySeen: {},
  phase: GamePhase.ONE,
  resources: {
    mood: 200,
    maxMood: MAX_MOOD,
    dollars: 0,
    co2Saved: 0,
    knowledge: 0,
    globalPpm: STARTING_PPM,

    // phase 2
    peoplePower: 0,
    trust: 0,
    collectiveDollars: 0,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: STARTING_PPM_RATE,
  },
  buttons,
  elapsedTime: 0,
  endgameSelfEducateTimesPressed: 0,
};
