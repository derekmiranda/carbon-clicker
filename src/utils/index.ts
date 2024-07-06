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
    .filter((buttonKey) => buttons.map[buttonKey].unlocked)
    .sort((keyA, keyB) => {
      const buttonA = buttons.map[keyA];
      const buttonB = buttons.map[keyB];
      return (buttonA.purchased ? 1 : 0) - (buttonB.purchased ? 1 : 0);
    });
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

export function formatResource(
  val: string | number,
  resourceKey: string,
  showPlus: boolean = false
) {
  val = typeof val === "string" ? parseInt(val) : val;
  const sign = val > 0 && showPlus ? "+" : "";
  if (resourceKey === "dollars") {
    return `${sign}$${val}`;
  }
  return `${sign}${val} ${DISPLAY_NAMES[resourceKey] || resourceKey}`;
}

export function getImgUrl(imgPath: string) {
  return `${import.meta.env.BASE_URL}${imgPath}`;
}

export function getCurrentTimes(elapsedTime: number) {
  const day = formatNum(getCurrentDay(elapsedTime), 0);
  const month = formatNum(getCurrentMonth(elapsedTime), 0);
  const year = formatNum(getCurrentYear(elapsedTime), 0);

  return {
    day,
    month,
    year,
  };
}
