import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext, useEffect } from "react";
import Buttons from "./Buttons";
import Resources from "./Resources";
import { getImgUrl } from "../utils";
import { ModalView, TickerType } from "../types";
import useAudio from "../hooks/useAudio";

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
    )}) fixed, linear-gradient(#181425 0 50%, #262b44 50% 100%) fixed`;
    document.body.style.imageRendering = "pixelated";
  }, [peoplePower]);

  useAudio();

  return (
    <main className="game">
      <Resources />
      <Buttons />
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
