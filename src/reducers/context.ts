import { Dispatch, createContext } from "react";
import { ClickerAction, ClickerInterface } from "./clickerReducer";
import { INITIAL_STATE } from "./clickerReducer";
import { AudioType, TickerType } from "../types";
import { NOOP } from "../constants";

export interface ClickerContextInterface {
  state: ClickerInterface;
  dispatch: Dispatch<ClickerAction>;
  setShowCredits: (val: boolean) => void;
  tooltipOpen: boolean;
  setTooltipOpen: (val: boolean) => void;
  ticker?: TickerType;
  audio?: AudioType;
}

export const ClickerContext = createContext<ClickerContextInterface>({
  state: INITIAL_STATE,
  dispatch: () => ({}),
  tooltipOpen: false,
  setShowCredits: NOOP,
  setTooltipOpen: NOOP,
});
