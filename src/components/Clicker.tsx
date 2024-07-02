import useTicker from "../hooks/useTicker";
import Modal from "./Modal";
import Logs from "./Logs";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext } from "react";
import { SECS_PER_DAY } from "../constants";
import Button from "./Button";

function formatNum(num: number, decimals: number = 1) {
  return num.toFixed(decimals);
}

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { clickButton, tickClock, clearGameData } = useDispatchers();
  const { resources, resourceGrowthRates, buttons, elapsedTime } = state;
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
        <p>Month: {formatNum(elapsedTime / SECS_PER_DAY / 30, 0)}</p>
        <p>--</p>
        <p>
          Mood: {mood}/{maxMood}
        </p>
        <p>Knowledge: {knowledge}</p>
        <p>CO2 Saved: {formatNum(co2Saved)} kg</p>
        <p>${formatNum(dollars, 2)}</p>
      </div>
      <div className="buttons-container">
        {buttons.order
          .filter((buttonKey) => buttons.map[buttonKey].unlocked)
          .map((buttonKey) => (
            <Button
              key={buttonKey}
              {...buttons.map[buttonKey]}
              clickButton={clickButton}
            />
          ))}
      </div>
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
