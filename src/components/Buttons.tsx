import { useContext } from "react";
import useDispatchers from "../hooks/useDispatchers";
import Button from "./Button";
import { ClickerContext } from "../reducers/context";
import { getActionButtons, getUpgradeButtons } from "../utils";

export interface ButtonsListProps {
  buttonOrder: string[];
}

function ButtonsList({ buttonOrder }: ButtonsListProps) {
  const { state } = useContext(ClickerContext);
  const { clickButton } = useDispatchers();
  const { buttons } = state;

  return (buttonOrder ?? buttons.order).map((buttonKey) => (
    <Button
      key={buttonKey}
      {...buttons.map[buttonKey]}
      clickButton={clickButton}
    />
  ));
}

export default function Buttons() {
  const { state } = useContext(ClickerContext);
  const { buttons } = state;

  const actionButtons = getActionButtons(buttons);
  const upgradeButtons = getUpgradeButtons(buttons);

  return (
    <div className="buttons-container">
      <h2>Actions</h2>
      <ButtonsList buttonOrder={actionButtons} />
      {upgradeButtons.length ? <h2>Upgrades</h2> : null}
      <ButtonsList buttonOrder={upgradeButtons} />
    </div>
  );
}
