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
                ? Array.isArray(log.message)
                  ? log.message[0]
                  : log.message
                : cappedLogs.length - i
            }
          >
            {Array.isArray(log.message)
              ? log.message.map((subLog, j) => (
                  <span key={j}>{`> ${subLog}`}</span>
                ))
              : `> ${log.message}`}
          </p>
        ))
        .reverse()}
    </div>
  );
}
