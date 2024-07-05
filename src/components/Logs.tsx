import { useContext } from "react";
import "./Logs.css";
import { ClickerContext } from "../reducers/context";
import {
  formatNum,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "../utils";

export default function Logs() {
  const { state } = useContext(ClickerContext);
  const { elapsedTime, logs } = state;

  const day = formatNum(getCurrentDay(elapsedTime), 0);
  const month = formatNum(getCurrentMonth(elapsedTime), 0);
  const year = formatNum(getCurrentYear(elapsedTime), 0);
  return (
    <div>
      <h2>Logs</h2>
      <p className="time-display">
        Day: {day}, Month: {month}, Year: {year}
      </p>
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
