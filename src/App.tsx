import { useCallback, useRef } from "react";

import Clicker from "./components/Clicker";
import { useClicker } from "./reducers";
import { ClickerContext } from "./reducers/context";
import Modal from "./components/Modal";
import useTicker, { useTickThrottle } from "./hooks/useTicker";
import { SharedActionType } from "./types/actions";

import "./App.css";

function App() {
  const clicker = useClicker();
  const { state, dispatch } = clicker;
  const appRef = useRef<HTMLElement>(document.getElementById("root"));

  const tickResources = useCallback(
    (timeDelta: number) =>
      dispatch({
        type: SharedActionType.TICK_RESOURCES,
        timeDelta,
      }),
    [dispatch]
  );

  const tickCooldown = useCallback(
    (timeDelta: number) =>
      dispatch({
        type: SharedActionType.TICK_COOLDOWN,
        timeDelta,
      }),
    [dispatch]
  );

  const throttleTickCooldown = useTickThrottle(tickCooldown, 60);
  const throttleTickResources = useTickThrottle(tickResources, 1);

  const ticker = useTicker((timeDelta) => {
    throttleTickCooldown(timeDelta);
    throttleTickResources(timeDelta);
  }, 120);

  return (
    <ClickerContext.Provider value={{ state, dispatch, ticker }}>
      <Clicker />
      <Modal appElement={appRef.current!} />
    </ClickerContext.Provider>
  );
}

export default App;
