import { useCallback, useEffect, useRef, useState } from "react";

import Clicker from "./components/Clicker";
import { useClicker } from "./reducers";
import { ClickerContext } from "./reducers/context";
import Modal from "./components/Modal";
import useTicker, { useTickThrottle } from "./hooks/useTicker";
import { SharedActionType } from "./types/actions";
import useAudio from "./hooks/useAudio";

import "./App.css";
import Credits from "./Credits";
import { Log } from "./types";

// find logs that just appeared
function findLogDiff(newLogs: Log[], oldLogs: Log[]) {
  // logs not capped
  if (oldLogs.length !== newLogs.length) {
    return newLogs.slice(oldLogs.length, newLogs.length);
  }

  // logs capped
  const lastIdx = oldLogs.length - 1;
  const newLastIdx = newLogs.indexOf(oldLogs[lastIdx]);
  const idxDelta = lastIdx - newLastIdx;
  return newLogs.slice(-idxDelta);
}

function App() {
  const clicker = useClicker();
  const { state, dispatch } = clicker;
  const appRef = useRef<HTMLElement>(document.getElementById("root"));
  const [showCredits, setShowCredits] = useState(false);
  const { logs } = state;
  const logsRef = useRef<typeof logs>(logs);

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
  const { addDelayedEffect } = ticker;

  const _setShowCredits = useCallback(
    (val: boolean) => {
      ticker.setPaused(val);
      setShowCredits(val);
    },
    [ticker, setShowCredits]
  );

  const audio = useAudio(state);

  const [popupLogs, setPopupLogs] = useState<Record<string, Log>>({});
  useEffect(() => {
    const logDiff = findLogDiff(logs, logsRef.current).filter(
      (log) => log.incitingButton
    );

    if (logDiff.length) {
      setPopupLogs((popupLogs) => {
        const logsToRender = logDiff.filter(
          (log) => !popupLogs[`${log.incitingButton}:${log.message}`]
        );

        if (!logsToRender.length) {
          return popupLogs;
        }

        const objAddition = logsToRender.reduce<Record<string, Log>>(
          (accum, log) => {
            accum[`${log.incitingButton}:${log.message}`] = log;
            return accum;
          },
          {}
        );
        return {
          ...popupLogs,
          ...objAddition,
        };
      });

      // queue deletion
      addDelayedEffect(() => {
        setPopupLogs((logs) => {
          const newObj = { ...logs };
          for (const log of logDiff) {
            delete newObj[`${log.incitingButton}:${log.message}`];
          }
          return newObj;
        });
      }, 2);
    }
  }, [addDelayedEffect, logs]);

  // update logs ref
  useEffect(() => {
    logsRef.current = [...logs];
  }, [logs]);

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
        </>
      )}
    </ClickerContext.Provider>
  );
}

export default App;
