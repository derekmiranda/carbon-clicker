import { useCallback, useContext } from "react";
import { ClickerContext } from "./reducers/context";
import { GamePhase } from "./types";

import "./Credits.css";
import useDispatchers from "./hooks/useDispatchers";

function Credits() {
  const { state, setShowCredits } = useContext(ClickerContext);
  const { phase } = state;
  const { clearGameData } = useDispatchers();

  const closeCredits = useCallback(
    () => setShowCredits(false),
    [setShowCredits]
  );

  return (
    <main>
      <h1>Carbon Clicker</h1>
      <h2>Developed by Derek Miranda and Jamie Liu</h2>
      <p>Programming, Art, Sound: Derek Miranda</p>
      <p>Writing: Jamie Liu</p>
      <p>
        Fonts:{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://fonts.google.com/specimen/Climate+Crisis"
        >
          Climate Crisis
        </a>
        ,{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://fonts.google.com/specimen/Space+Grotesk"
        >
          Space Grotesk
        </a>
      </p>
      {phase === GamePhase.ENDING ? (
        <>
          <h2>Thank you for playing!</h2>
          <button className="credits-button" onClick={clearGameData}>
            Play Again?
          </button>
        </>
      ) : null}
      <button className="credits-button" onClick={closeCredits}>
        Close
      </button>
    </main>
  );
}

export default Credits;
