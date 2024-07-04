import { ButtonInterface } from "../reducers/buttonReducer";
import { MapLikeInterface } from "../types";

export function formatNum(num: number, decimals: number = 1) {
  return num.toFixed(decimals);
}

export function getActionButtons(buttons: MapLikeInterface<ButtonInterface>) {
  return buttons.order
    .filter((buttonKey) => !buttons.map[buttonKey].oneTime)
    .filter((buttonKey) => buttons.map[buttonKey].unlocked);
}

export function getUpgradeButtons(buttons: MapLikeInterface<ButtonInterface>) {
  return buttons.order
    .filter((buttonKey) => buttons.map[buttonKey].oneTime)
    .filter((buttonKey) => buttons.map[buttonKey].unlocked);
}
