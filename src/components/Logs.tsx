import { useContext, useEffect, useRef } from "react";
import "./Logs.css";
import { ClickerContext } from "../reducers/context";

export default function Logs() {
  const { state } = useContext(ClickerContext);
  const boxRef = useRef<HTMLDivElement>(null);

  const { logs } = state;

  // scroll back to top when logs change
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo(0, 0);
    }
  }, [logs]);

  return (
    <div className="logs-box" ref={boxRef}>
      {logs
        .map((log, i) => (
          <p className="log" key={i}>
            {"> "}
            {log}
          </p>
        ))
        .reverse()}
    </div>
  );
}
