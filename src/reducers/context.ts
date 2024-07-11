import { Dispatch, createContext } from "react";
import { ClickerAction, ClickerInterface } from "./clickerReducer";
import { INITIAL_STATE } from "./clickerReducer";
import { TickerType } from "../types";

export interface ClickerContextInterface {
  state: ClickerInterface;
  dispatch: Dispatch<ClickerAction>;
  ticker?: TickerType;
}

export const ClickerContext = createContext<ClickerContextInterface>({
  state: INITIAL_STATE,
  dispatch: () => ({}),
});
