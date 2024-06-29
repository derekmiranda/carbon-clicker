import { ClickerInterface } from "../reducers/clickerReducer";
import { ModalView } from "../types";
import { buttons } from "./buttons";

export const clicker: ClickerInterface = {
  modal: ModalView.INTRO,
  logs: [],
  storySeen: {},
  resources: {
    energy: 200,
    maxEnergy: 200,
    dollars: 100000,
    co2Saved: 0,
    knowledge: 0,
    globalPpm: 425,
  },
  // diff per second
  resourceGrowthRates: {
    globalPpm: 0.0067,
  },
  buttons,
};
