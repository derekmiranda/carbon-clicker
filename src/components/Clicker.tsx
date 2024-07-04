import useTicker from "../hooks/useTicker";
import Modal from "./Modal";
import Logs from "./Logs";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext } from "react";
import Buttons from "./Buttons";
import {
  formatNum,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "../utils";

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { tickClock, clearGameData } = useDispatchers();
  const { resources, resourceGrowthRates, elapsedTime } = state;
  const { mood, maxMood, co2Saved, knowledge, globalPpm, dollars } = resources;

  useTicker((timeDelta) => {
    tickClock(timeDelta);
  });

  return (
    <main className="game">
      <div className="resources-container">
        <h1>Carbon Clicker</h1>
        <p className="ppm-display">
          Global CO2: {formatNum(globalPpm)} PPM{" "}
          <a
            target="_blank"
            href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
          >
            info
          </a>
        </p>
        {resourceGrowthRates.globalPpm ? (
          <p>
            CO2 Growth Rate: {formatNum(resourceGrowthRates.globalPpm * 30)}{" "}
            PPM/month
          </p>
        ) : null}
        <p>Day: {formatNum(getCurrentDay(elapsedTime), 0)}</p>
        <p>Month: {formatNum(getCurrentMonth(elapsedTime), 0)}</p>
        <p>Year: {formatNum(getCurrentYear(elapsedTime), 0)}</p>
        <p>--</p>
        <p>
          Mood: {mood}/{maxMood}
        </p>
        <p>Knowledge: {knowledge}</p>
        <p>CO2 Saved: {formatNum(co2Saved)} kg</p>
        <p>${formatNum(dollars, 2)}</p>
      </div>
      <Buttons />
      <Logs />
      <div className="game-data-container">
        <button
          onClick={() => {
            saveGameData(state);
          }}
        >
          Save
        </button>
        <button onClick={clearGameData}>Clear</button>
      </div>
      <Modal />
    </main>
  );
}

export default Clicker;
