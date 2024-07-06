import { useContext } from "react";
import "./Logs.css";
import { ClickerContext } from "../reducers/context";

export default function Logs() {
  const { state } = useContext(ClickerContext);
  const { logs } = state;
  return (
    <div>
      <h2>Logs</h2>
      <div className="logs-box">
        {logs
          .map((log, i) => (
            <p className="log" key={i}>
              {"> "}
              {log}
            </p>
          ))
          .reverse()}
      </div>
    </div>
  );
}
