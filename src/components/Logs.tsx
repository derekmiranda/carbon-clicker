import { useEffect, useRef } from "react";
import "./Logs.css";
import useSelectedState from "../hooks/useSelectedState";

export default function Logs() {
  const boxRef = useRef<HTMLDivElement>(null);

  const { cappedLogs } = useSelectedState();

  // scroll back to top when logs change
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo(0, 0);
    }
  }, [cappedLogs]);

  return (
    <div className="logs-box" ref={boxRef}>
      {cappedLogs
        .map((log, i) => (
          <p
            className="log"
            key={
              i === cappedLogs.length - 1
                ? Array.isArray(log)
                  ? log[0]
                  : log
                : cappedLogs.length - i
            }
          >
            {Array.isArray(log)
              ? log.map((subLog, j) => <span key={j}>{`> ${subLog}`}</span>)
              : `> ${log}`}
          </p>
        ))
        .reverse()}
    </div>
  );
}
