import { useContext } from "react";
import useDispatchers from "../hooks/useDispatchers";
import Button from "./Button";
import { ClickerContext } from "../reducers/context";
import { ButtonKey } from "../types";
import { ButtonInterface } from "../reducers/buttonReducer";

export interface ButtonsListProps {
  buttonOrder: string[];
}

export default function ButtonsList({ buttonOrder }: ButtonsListProps) {
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
