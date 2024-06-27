import useTicker from "../hooks/useTicker";
import { useClickerReducer } from "../reducers";
import { ButtonInterface } from "../reducers/buttonReducer";

import "./Clicker.css";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
}

function Button({ id, displayName, clickButton, cooldown }: ButtonProps) {
  const handleClick = () => {
    clickButton(id);
  };
  const readiness =
    cooldown && cooldown.elapsedCooldownSeconds / cooldown.cooldownSeconds;

  return (
    <>
      <button
        style={{
          opacity: readiness ? Math.max(0.2, readiness) : 1,
          cursor: cooldown?.onCooldown ? "wait" : "default",
        }}
        disabled={cooldown?.onCooldown}
        onClick={handleClick}
      >
        {displayName}
      </button>
    </>
  );
}

function Clicker() {
  const { state, clickButton, tickClock } = useClickerReducer();
  const { resources, buttons } = state;
  const { energy, maxEnergy, co2Saved, knowledge } = resources;

  useTicker((timeDelta) => {
    tickClock(timeDelta);
  });

  return (
    <>
      <h1>Carbon Clicker</h1>
      <div>
        <p>
          Mood: {energy}/{maxEnergy}
        </p>
        <p>Knowledge: {knowledge}</p>
        <p>CO2 Saved: {co2Saved} kg</p>
        {buttons.order
          .filter((buttonKey) => buttons.map[buttonKey].unlocked)
          .map((buttonKey) => (
            <Button
              key={buttonKey}
              {...buttons.map[buttonKey]}
              clickButton={clickButton}
            />
          ))}
      </div>
    </>
  );
}

export default Clicker;
