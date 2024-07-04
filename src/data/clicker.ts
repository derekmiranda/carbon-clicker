import { MAX_MOOD } from "../constants";
import { ClickerInterface } from "../reducers/clickerReducer";
import { ModalView } from "../types";
import { buttons } from "./buttons";

export const clicker: ClickerInterface = {
  modal: ModalView.INTRO,
  logs: [],
  storySeen: {},
  phase: 1,
  resources: {
    mood: 200,
    maxMood: MAX_MOOD,
    dollars: 0,
    co2Saved: 0,
    knowledge: 0,
    globalPpm: 425,

    // phase 2
    peoplePower: 0,
    trust: 0,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: 0.0067,
  },
  buttons,
  elapsedTime: 0,
};
