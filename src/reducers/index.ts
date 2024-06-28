import { useReducer } from "react";

import clickerReducer, {
  ClickerAction,
  ClickerInterface,
  INITIAL_STATE,
} from "./clickerReducer";
import { loadGameData } from "../storage";

export function useClicker() {
  const [state, dispatch] = useReducer<
    React.Reducer<ClickerInterface, ClickerAction>
  >(clickerReducer, loadGameData() || INITIAL_STATE);

  return {
    state,
    dispatch,
  };
}
