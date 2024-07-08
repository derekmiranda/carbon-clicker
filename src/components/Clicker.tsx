import useTicker, { useTickThrottle } from "../hooks/useTicker";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext, useEffect } from "react";
import Buttons from "./Buttons";
import Resources from "./Resources";
import { getImgUrl } from "../utils";

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { tickCooldown, tickResources, clearGameData } = useDispatchers();

  const throttleTickResources = useTickThrottle(tickResources, 1);

  useTicker((timeDelta) => {
    tickCooldown(timeDelta);
    throttleTickResources(timeDelta);
  }, 60);

  useEffect(() => {
    document.body.style.background = `center / contain no-repeat url(${getImgUrl(
      "bg-1.png"
    )}) fixed, linear-gradient(#262b44 0 50%, #3e2731 50% 100%)`;
    document.body.style.imageRendering = "pixelated";
  }, []);

  return (
    <main className="game">
      <Resources />
      <Buttons />
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
    </main>
  );
}

export default Clicker;
