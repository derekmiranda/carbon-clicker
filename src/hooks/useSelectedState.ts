import { useContext, useMemo } from "react";
import { ClickerContext } from "../reducers/context";
import {
  getActionButtons,
  getCurrentTimes,
  getPurchasedButtons,
  getUpgradeButtons,
} from "../utils";
import { ButtonKey } from "../types";
import {
  LOG_LIMIT,
  REAAAALLLYYY_TIRED_MOOD_PERCENT,
  TIRED_MOOD_PERCENT,
} from "../constants";

export default function useSelectedState() {
  const {
    state: { buttons, logs, elapsedTime, resources },
  } = useContext(ClickerContext);
  const { mood, maxMood } = resources;

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
  const currentTimes = getCurrentTimes(elapsedTime);
  const moodPercent = mood / maxMood;
  const isEnergized = TIRED_MOOD_PERCENT < moodPercent;
  const isTired =
    REAAAALLLYYY_TIRED_MOOD_PERCENT < moodPercent &&
    moodPercent <= TIRED_MOOD_PERCENT;
  const isRealTired = moodPercent <= REAAAALLLYYY_TIRED_MOOD_PERCENT;

  return {
    actionButtons,
    upgradeButtons,
    purchasedButtons,
    purchasedIcons,
    cappedLogs,
    currentTimes,
    moodPercent,
    isEnergized,
    isTired,
    isRealTired,
  };
}
