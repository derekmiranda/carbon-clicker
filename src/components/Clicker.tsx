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
  const {
    resources: { peoplePower },
  } = state;

  const throttleTickResources = useTickThrottle(tickResources, 1);

  useTicker((timeDelta) => {
    tickCooldown(timeDelta);
    throttleTickResources(timeDelta);
  }, 60);

  useEffect(() => {
    const imgUrl =
      peoplePower >= 100
        ? "bg-3.png"
        : peoplePower >= 10
        ? "bg-2.png"
        : "bg-1.png";
    document.body.style.background = `center / contain no-repeat url(${getImgUrl(
      imgUrl
    )}) fixed, linear-gradient(#181425 0 50%, #262b44 50% 100%) fixed`;
    document.body.style.imageRendering = "pixelated";
  }, [peoplePower]);

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
