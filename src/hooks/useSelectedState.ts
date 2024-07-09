import { useContext, useMemo } from "react";
import { ClickerContext } from "../reducers/context";
import {
  getActionButtons,
  getCurrentTimes,
  getPurchasedButtons,
  getUpgradeButtons,
} from "../utils";
import { ButtonKey } from "../types";
import { LOG_LIMIT } from "../constants";

export default function useSelectedState() {
  const {
    state: { buttons, logs, elapsedTime },
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
        .filter(Boolean) as string[],
    [buttons, purchasedButtons]
  );
  const cappedLogs = useMemo(() => logs.slice(-LOG_LIMIT), [logs]);
  const currentTimes = useMemo(
    () => getCurrentTimes(elapsedTime),
    [elapsedTime]
  );

  return {
    actionButtons,
    upgradeButtons,
    purchasedButtons,
    purchasedIcons,
    cappedLogs,
    currentTimes,
  };
}
