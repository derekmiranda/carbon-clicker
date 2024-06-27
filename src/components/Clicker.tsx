import { useClickerReducer } from "../reducers/clickerReducer";

import "./Clicker.css";

function Clicker() {
  const { state, clickedButton } = useClickerReducer();
  const { mood, maxMood, co2Saved } = state;

  const turnOffLights = () => {
    clickedButton({
      co2Saved: 1,
      cost: {
        mood: 200,
      },
    });
  };

  return (
    <>
      <h1>Carbon Clicker</h1>
      <div>
        <p>
          Mood: {mood}/{maxMood}
        </p>
        <p>CO2 Saved: {co2Saved} kg</p>
        <button onClick={turnOffLights}>Turn off the lights</button>
      </div>
    </>
  );
}

export default Clicker;
