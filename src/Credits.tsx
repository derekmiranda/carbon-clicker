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
      <p>
        Programming, Art, Sound, Project Management:{" "}
        <strong>Derek Miranda</strong> (he/they)
      </p>
      <p>
        {" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://www.derekmiranda.com"
        >
          Website
        </a>{" "}
        |{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://instagram.com/derek.miranda.tunes/"
        >
          Instagram
        </a>{" "}
        |{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://soundcloud.com/derekmirandatunes/"
        >
          Music
        </a>{" "}
        |{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://instagram.com/derek.miranda.art/"
        >
          Art
        </a>{" "}
      </p>
      <p>
        Story, Writing: <strong>Jamie Liu</strong> (she/they)
      </p>
      <p>
        {" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://jialuostory.wordpress.com/"
        >
          Wordpress
        </a>{" "}
      </p>
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
      <p>
        Shoutout to the numerous climate organizations fighting the good fight,
        such as{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://sunrisenyc.org/"
        >
          Sunrise NYC
        </a>
      </p>
      <p>
        Created for{" "}
        <a
          className="credits-link"
          target="_blank"
          href="https://itch.io/jam/climate-jam-2024"
        >
          Climate Jam 2024
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
