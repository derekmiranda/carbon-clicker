import { useEffect, useRef, useState } from "react";
import { Log } from "../types";

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

export default function usePopupLogs({
  logs,
  addDelayedEffect,
}: {
  logs: Log[];
  addDelayedEffect: (fn: () => void, delay: number) => void;
}) {
  const logsRef = useRef<Log[]>(logs);
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
      }, 3);
    }
  }, [addDelayedEffect, logs]);

  // update logs ref
  useEffect(() => {
    logsRef.current = [...logs];
  }, [logs]);

  return popupLogs;
}
