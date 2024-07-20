import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { ClickerContext } from "../reducers/context";

export default function ButtonTooltip() {
  const {
    tooltipOpen,
    state: { hideButtonTooltip },
  } = useContext(ClickerContext);
  return (
    <Tooltip
      anchorSelect='[data-show-tooltip="true"]'
      isOpen={!hideButtonTooltip && tooltipOpen}
      float
    />
  );
}
