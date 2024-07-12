import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext, useEffect } from "react";
import Actions from "./Actions";
import Resources from "./Resources";
import { getImgUrl } from "../utils";
import { ModalView, TickerType } from "../types";
import Upgrades from "./Upgrades";

function Clicker() {
  const { state, ticker } = useContext(ClickerContext);
  const { paused, setPaused } = ticker as TickerType;
  const { clearGameData, openModal, setMuted } = useDispatchers();
  const {
    resources: { peoplePower },
    muted,
  } = state;

  useEffect(() => {
    const imgUrl =
      peoplePower >= 100
        ? "bg-3.png"
        : peoplePower >= 10
        ? "bg-2.png"
        : "bg-1.png";
    document.body.style.background = `center / contain no-repeat url(${getImgUrl(
      imgUrl
    )}) fixed, linear-gradient(var(--bg-color) 0 50%, var(--bg-color-2) 50% 100%) fixed`;
    document.body.style.imageRendering = "pixelated";
  }, [peoplePower]);

  return (
    <main className="game">
      <Resources />
      <Actions />
      <Upgrades />
      <div className="game-data-container">
        <button
          onClick={() => {
            openModal(ModalView.PAUSE);
            setPaused(true);
          }}
        >
          {paused ? "PAUSED" : "Pause"}
        </button>
        <button
          onClick={() => {
            setMuted(!muted);
          }}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        {"|"}
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
