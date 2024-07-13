import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext, useEffect, useState } from "react";
import Actions from "./Actions";
import Resources from "./Resources";
import { getImgUrl } from "../utils";
import { ModalView, TickerType } from "../types";
import Upgrades from "./Upgrades";

function Clicker() {
  const { state, ticker } = useContext(ClickerContext);
  const { paused, setPaused, addDelayedEffect } = ticker as TickerType;
  const { clearGameData, openModal, setMuted } = useDispatchers();
  const {
    resources: { peoplePower },
    muted,
  } = state;
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    const imgUrl =
      peoplePower >= 500
        ? "bg-3.png"
        : peoplePower >= 50
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
            setShowSaveSuccess(true);
            addDelayedEffect(() => {
              setShowSaveSuccess(false);
            }, 2);
          }}
        >
          Save
        </button>
        <button onClick={clearGameData}>Clear</button>
        {showSaveSuccess ? <p className="save-message">Game Saved!</p> : null}
      </div>
    </main>
  );
}

export default Clicker;
