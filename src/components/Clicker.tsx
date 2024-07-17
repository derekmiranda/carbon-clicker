import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useCallback, useContext, useEffect, useState } from "react";
import Actions from "./Actions";
import Resources from "./Resources";
import { getImgUrl } from "../utils";
import { ModalView, TickerType } from "../types";
import Upgrades from "./Upgrades";
import { SHORTCUTS } from "../constants";

function Clicker() {
  const { state, ticker, setShowCredits } = useContext(ClickerContext);
  const { paused, setPaused, addDelayedEffect } = ticker as TickerType;
  const { clearGameData, openModal, closeModal, setMuted } = useDispatchers();
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

  const togglePause = useCallback(() => {
    if (paused) {
      closeModal();
    } else {
      openModal(ModalView.PAUSE);
    }
    setPaused(!paused);
  }, [paused, openModal, closeModal, setPaused]);

  const toggleMute = useCallback(() => {
    setMuted(!muted);
  }, [muted, setMuted]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        togglePause();
      }
      if (event.code === "KeyM") {
        toggleMute();
      }
    },
    [togglePause, toggleMute]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  return (
    <main className="game">
      <Resources />
      <Actions />
      <Upgrades />
      <div className="game-data-container">
        <button onClick={togglePause}>{paused ? "PAUSED" : "Pause"}</button>
        <button onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
        <button
          onClick={() => {
            openModal(ModalView.GENERIC, {
              content: SHORTCUTS,
            });
          }}
        >
          Shortcuts
        </button>
        <button
          onClick={() => {
            setShowCredits(true);
          }}
        >
          Credits
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
