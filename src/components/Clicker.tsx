import useTicker from "../hooks/useTicker";
import Modal from "./Modal";
import Logs from "./Logs";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext } from "react";
import Buttons from "./Buttons";
import Resources from "./Resources";

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { tickCooldown, clearGameData } = useDispatchers();

  useTicker((timeDelta) => {
    tickCooldown(timeDelta);
  }, 60);

  return (
    <main className="game">
      <Resources />
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
