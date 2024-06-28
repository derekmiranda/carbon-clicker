import { Dispatch, createContext } from "react";
import { ClickerAction, ClickerInterface } from "./clickerReducer";
import { INITIAL_STATE } from "./clickerReducer";

export interface ClickerContextInterface {
  state: ClickerInterface;
  dispatch: Dispatch<ClickerAction>;
}

export const ClickerContext = createContext<ClickerContextInterface>({
  state: INITIAL_STATE,
  dispatch: () => ({}),
});
