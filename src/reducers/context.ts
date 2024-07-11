import { Dispatch, createContext } from "react";
import { ClickerAction, ClickerInterface } from "./clickerReducer";
import { INITIAL_STATE } from "./clickerReducer";
import { AudioType, TickerType } from "../types";

export interface ClickerContextInterface {
  state: ClickerInterface;
  dispatch: Dispatch<ClickerAction>;
  ticker?: TickerType;
  audio?: AudioType;
}

export const ClickerContext = createContext<ClickerContextInterface>({
  state: INITIAL_STATE,
  dispatch: () => ({}),
});
