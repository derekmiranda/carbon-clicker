import { useContext, useMemo } from "react";
import { ClickerContext } from "../reducers/context";
import {
  getActionButtons,
  getPurchasedButtons,
  getUpgradeButtons,
} from "../utils";
import { ButtonKey } from "../types";

export default function useSelectedState() {
  const {
    state: { buttons },
  } = useContext(ClickerContext);

  const actionButtons = useMemo(() => getActionButtons(buttons), [buttons]);
  const upgradeButtons = useMemo(() => getUpgradeButtons(buttons), [buttons]);
  const purchasedButtons = useMemo(
    () => getPurchasedButtons(buttons),
    [buttons]
  );
  const purchasedIcons = useMemo(
    () =>
      purchasedButtons
        .map((buttonKey) => buttons.map[buttonKey as ButtonKey]?.icon)
        .filter(Boolean),
    [buttons, purchasedButtons]
  );

  return {
    actionButtons,
    upgradeButtons,
    purchasedButtons,
    purchasedIcons,
  };
}
