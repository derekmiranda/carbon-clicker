import { Dispatch, createContext } from "react";
import { ClickerAction, ClickerInterface } from "./clickerReducer";
import { INITIAL_STATE } from "./clickerReducer";
import { AudioType, Log, TickerType } from "../types";

export interface ClickerContextInterface {
  state: ClickerInterface;
  dispatch: Dispatch<ClickerAction>;
  setShowCredits: (val: boolean) => void;
  ticker?: TickerType;
  audio?: AudioType;
  popupLogs: Record<string, Log>;
}

export const ClickerContext = createContext<ClickerContextInterface>({
  state: INITIAL_STATE,
  dispatch: () => ({}),
  setShowCredits: () => {},
  popupLogs: {},
});
