import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { ClickerContext } from "../reducers/context";

export default function ButtonTooltip() {
  const { tooltipOpen } = useContext(ClickerContext);
  return (
    <Tooltip
      anchorSelect='[data-show-tooltip="true"]'
      isOpen={tooltipOpen}
      float
    />
  );
}
