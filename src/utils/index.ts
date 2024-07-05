import { DISPLAY_NAMES, SECS_PER_DAY } from "../constants";
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

export function getCurrentDay(elapsedTime: number) {
  return Math.floor(elapsedTime / SECS_PER_DAY) % 30;
}

export function getCurrentMonth(elapsedTime: number) {
  return Math.floor(elapsedTime / SECS_PER_DAY / 30) % 12;
}

export function getCurrentYear(elapsedTime: number) {
  return 2024 + elapsedTime / SECS_PER_DAY / 365;
}

export function formatResource(val: string | number, resourceKey: string) {
  if (resourceKey === "dollars") {
    return `$${val}`;
  }
  return `${val} ${DISPLAY_NAMES[resourceKey] || resourceKey}`;
}
