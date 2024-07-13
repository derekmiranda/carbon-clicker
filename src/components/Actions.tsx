import { useContext } from "react";
import useDispatchers from "../hooks/useDispatchers";
import Button from "./Button";
import { ClickerContext } from "../reducers/context";
import Logs from "./Logs";
import "./Buttons.css";
import { ButtonKey, GamePhase } from "../types";
import { ButtonInterface } from "../reducers/buttonReducer";
import useSelectedState from "../hooks/useSelectedState";
import ButtonsList from "./ButtonsList";

export default function Actions() {
  const { actionButtons } = useSelectedState();
  const {
    state: {
      buttons: { map },
      phase,
    },
  } = useContext(ClickerContext);
  const { clickButton } = useDispatchers();

  const destroyFossilFuelsBtn = map[
    ButtonKey.destroyFossilFuelIndustry
  ] as ButtonInterface;

  return (
    <div className="buttons-container buttons-container--actions">
      <h2>Actions</h2>
      <Logs />

      <div className="buttons-box">
        {destroyFossilFuelsBtn.unlocked && phase === GamePhase.TWO ? (
          <Button
            className="button--destroy-fossil-fuels"
            {...destroyFossilFuelsBtn}
            clickButton={clickButton}
          />
        ) : null}

        <ButtonsList buttonOrder={actionButtons} />
      </div>
    </div>
  );
}
