import { useCallback, useContext } from "react";
import { ClickerContext } from "../reducers/context";

export default function useTooltipListeners() {
  const { setTooltipOpen } = useContext(ClickerContext);

  const handleMouseOver = useCallback(() => {
    setTooltipOpen(true);
  }, [setTooltipOpen]);
  const handleMouseLeave = useCallback(() => {
    setTooltipOpen(false);
  }, [setTooltipOpen]);

  return {
    handleMouseOver,
    handleMouseLeave,
  };
}
