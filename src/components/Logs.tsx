import { useContext } from "react";
import "./Logs.css";
import { ClickerContext } from "../reducers/context";

export default function Logs() {
  const {
    state: { logs },
  } = useContext(ClickerContext);
  return (
    <div>
      <h2>Logs</h2>
      <div className="logs-box">
        {logs
          .map((log, i) => (
            <p key={i}>
              {"> "}
              {log}
            </p>
          ))
          .reverse()}
      </div>
    </div>
  );
}
