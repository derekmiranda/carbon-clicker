import classNames from "classnames";

import useTicker from "../hooks/useTicker";
import { useClicker } from "../reducers";
import { ButtonInterface } from "../reducers/buttonReducer";
import Modal from "./Modal";
import Logs from "./Logs";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";

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
  const clicker = useClicker();
  const { clickButton, tickClock, clearGameData } = useDispatchers();
  const { state, dispatch } = clicker;
  const { resources, buttons, logs } = state;
  const { energy, maxEnergy, co2Saved, knowledge } = resources;

  useTicker((timeDelta) => {
    tickClock(timeDelta);
  });

  return (
    <ClickerContext.Provider value={{ state, dispatch }}>
      <h1>Carbon Clicker</h1>
      <Modal />
      <div>
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
        <Logs logs={logs} />
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
    </ClickerContext.Provider>
  );
}

export default Clicker;
