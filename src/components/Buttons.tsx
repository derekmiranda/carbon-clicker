import { useContext } from "react";
import useDispatchers from "../hooks/useDispatchers";
import Button from "./Button";
import { ClickerContext } from "../reducers/context";
import Logs from "./Logs";
import "./Buttons.css";
import { ButtonKey } from "../types";
import { ButtonInterface } from "../reducers/buttonReducer";
import useSelectedState from "../hooks/useSelectedState";

export interface ButtonsListProps {
  buttonOrder: string[];
}

function ButtonsList({ buttonOrder }: ButtonsListProps) {
  const { state } = useContext(ClickerContext);
  const { clickButton } = useDispatchers();
  const { buttons } = state;

  return (buttonOrder ?? buttons.order)
    .filter(Boolean)
    .map((buttonKey) => (
      <Button
        key={buttonKey}
        {...(buttons.map[buttonKey as ButtonKey] as ButtonInterface)}
        clickButton={clickButton}
      />
    ));
}

export default function Buttons() {
  const { actionButtons, upgradeButtons } = useSelectedState();
  const {
    state: {
      buttons: { map },
    },
  } = useContext(ClickerContext);
  const { clickButton } = useDispatchers();

  const destroyFossilFuelsBtn = map[
    ButtonKey.destroyFossilFuelIndustry
  ] as ButtonInterface;

  return (
    <div className="buttons-container">
      <h2>Actions</h2>
      <Logs />

      <div className="buttons-box">
        {destroyFossilFuelsBtn.unlocked ? (
          <Button
            className="button--destroy-fossil-fuels"
            {...destroyFossilFuelsBtn}
            clickButton={clickButton}
          />
        ) : null}

        <ButtonsList buttonOrder={actionButtons} />
        {upgradeButtons.length ? <h2>Upgrades</h2> : null}
        <ButtonsList buttonOrder={upgradeButtons} />
      </div>
    </div>
  );
}
