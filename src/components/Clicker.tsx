import { useClickerReducer } from "../reducers";
import { ButtonInterface } from "../reducers/buttonReducer";

import "./Clicker.css";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
}

function Button({ id, displayName, clickButton }: ButtonProps) {
  const handleClick = () => {
    clickButton(id);
  };

  return <button onClick={handleClick}>{displayName}</button>;
}

function Clicker() {
  const { state, clickButton } = useClickerReducer();
  const { resources, buttons } = state;
  const { energy, maxEnergy, co2Saved } = resources;

  return (
    <>
      <h1>Carbon Clicker</h1>
      <div>
        <p>
          Mood: {energy}/{maxEnergy}
        </p>
        <p>CO2 Saved: {co2Saved} kg</p>
        {buttons.order.map((buttonKey) => (
          <Button {...buttons.map[buttonKey]} clickButton={clickButton} />
        ))}
      </div>
    </>
  );
}

export default Clicker;
