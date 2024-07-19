import { useCallback, useRef, useState } from "react";

import Clicker from "./components/Clicker";
import { useClicker } from "./reducers";
import { ClickerContext } from "./reducers/context";
import Modal from "./components/Modal";
import useTicker, { useTickThrottle } from "./hooks/useTicker";
import { SharedActionType } from "./types/actions";
import useAudio from "./hooks/useAudio";

import "./App.css";
import Credits from "./Credits";
import PopupLogs from "./components/PopupLogs";
import usePopupLogs from "./hooks/usePopupLogs";

function App() {
  const clicker = useClicker();
  const { state, dispatch } = clicker;
  const appRef = useRef<HTMLElement>(document.getElementById("root"));
  const [showCredits, setShowCredits] = useState(false);
  const { logs } = state;

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

  const throttleTickCooldown = useTickThrottle(tickCooldown, 200);
  const throttleTickResources = useTickThrottle(tickResources, 1);

  const ticker = useTicker((timeDelta) => {
    throttleTickCooldown(timeDelta);
    throttleTickResources(timeDelta);
  }, 120);

  const _setShowCredits = useCallback(
    (val: boolean) => {
      ticker.setPaused(val);
      setShowCredits(val);
    },
    [ticker, setShowCredits]
  );

  const audio = useAudio(state);
  const popupLogs = usePopupLogs({
    logs,
    addDelayedEffect: ticker.addDelayedEffect,
  });

  return (
    <ClickerContext.Provider
      value={{
        state,
        dispatch,
        ticker,
        audio,
        setShowCredits: _setShowCredits,
        popupLogs,
      }}
    >
      {showCredits ? (
        <Credits />
      ) : (
        <>
          <Clicker />
          <Modal appElement={appRef.current!} />
          <PopupLogs />
        </>
      )}
    </ClickerContext.Provider>
  );
}

export default App;
