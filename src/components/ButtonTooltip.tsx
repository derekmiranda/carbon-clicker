import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { ClickerContext } from "../reducers/context";

export default function ButtonTooltip() {
  const { tooltipOpen } = useContext(ClickerContext);
  return (
    <Tooltip
      anchorSelect='[data-is-button="true"]'
      isOpen={tooltipOpen}
      float
    />
  );
}
