import classNames from "classnames";

import useTicker from "../hooks/useTicker";
import { ButtonInterface } from "../reducers/buttonReducer";
import Modal from "./Modal";
import Logs from "./Logs";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext } from "react";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
}

function Button({ id, displayName, clickButton, cooldown }: ButtonProps) {
  const handleClick = () => {
    clickButton(id);
  };
  const opacity = cooldown?.onCooldown
    ? cooldown.elapsedCooldownSeconds / cooldown.cooldownSeconds
    : 1;

  return (
    <>
      <button
        className={classNames("button", {
          "button--cooling-down": cooldown?.onCooldown,
        })}
        style={{
          opacity,
          cursor: cooldown?.onCooldown ? "wait" : "default",
        }}
        disabled={cooldown?.onCooldown}
        onClick={handleClick}
      >
        {displayName}
      </button>
    </>
  );
}

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { clickButton, tickClock, clearGameData } = useDispatchers();
  const { resources, buttons } = state;
  const {
    energy,
    maxEnergy,
    co2Saved,
    knowledge,
    globalPpm,
    globalPpmPerMonth,
  } = resources;

  useTicker((timeDelta) => {
    tickClock(timeDelta);
  });

  return (
    <>
      <h1>Carbon Clicker</h1>
      <Modal />
      <div>
        <p className="ppm-display">Global CO2: {globalPpm} PPM</p>
        <p>CO2 Growth Rate: {globalPpmPerMonth} PPM/month</p>
        <p>--</p>
        <p>
          Mood: {energy}/{maxEnergy}
        </p>
        <p>Knowledge: {knowledge}</p>
        <p>CO2 Saved: {co2Saved} kg</p>
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
      </div>
    </>
  );
}

export default Clicker;
