import { DISPLAY_NAMES, SECS_PER_DAY } from "../constants";
import { ButtonInterface } from "../reducers/buttonReducer";
import {
  ButtonKey,
  EffectTypes,
  GamePhase,
  GenericEffect,
  MapLikeInterface,
  PHASE_TWO_RESOURCES,
  ResourceTypes,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";

export function formatNum(num: number, decimals: number = 1) {
  return num.toFixed(decimals);
}

export function getActionButtons(
  buttons: MapLikeInterface<ButtonInterface, ButtonKey>
) {
  return buttons.order.filter(
    (buttonKey) =>
      !buttons.map[buttonKey as ButtonKey]?.oneTime &&
      buttons.map[buttonKey as ButtonKey]?.unlocked
  );
}

export function getUpgradeButtons(
  buttons: MapLikeInterface<ButtonInterface, ButtonKey>
) {
  return buttons.order.filter(
    (buttonKey) =>
      buttonKey !== ButtonKey.destroyFossilFuelIndustry &&
      buttons.map[buttonKey as ButtonKey]?.oneTime &&
      buttons.map[buttonKey as ButtonKey]?.unlocked &&
      !buttons.map[buttonKey as ButtonKey]?.purchased
  );
}

export function getPurchasedButtons(
  buttons: MapLikeInterface<ButtonInterface, ButtonKey>
) {
  return buttons.order.filter(
    (buttonKey) =>
      buttonKey !== ButtonKey.destroyFossilFuelIndustry &&
      buttons.map[buttonKey as ButtonKey]?.oneTime &&
      buttons.map[buttonKey as ButtonKey]?.unlocked &&
      buttons.map[buttonKey as ButtonKey]?.purchased
  );
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
  } else if (resourceKey === "collectiveDollars") {
    return `${sign}$${val} (collective)`;
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

export function describeEffect(effect: GenericEffect, currentPhase: GamePhase) {
  if (effect.type === EffectTypes.UPDATE_RESOURCES) {
    const { resourcesDiff, proportionalDiffs } =
      effect as UpdateResourcesEffect;
    return Object.entries(resourcesDiff)
      .filter(
        ([resourceKey]) =>
          currentPhase === GamePhase.TWO ||
          !PHASE_TWO_RESOURCES.includes(resourceKey as ResourceTypes)
      )
      .map(([resourceKey, resourceVal]) =>
        proportionalDiffs?.[resourceKey as ResourceTypes]
          ? `${resourceVal >= 0 ? "+" : ""}${resourceVal * 100}% ${
              DISPLAY_NAMES[resourceKey] || resourceKey
            }`
          : formatResource(resourceVal, resourceKey, true)
      );
  } else if (effect.type === EffectTypes.UPDATE_RESOURCES_RATE) {
    const { resourcesRateDiff } = effect as UpdateResourcesRateEffect;
    return Object.entries(resourcesRateDiff)
      .filter(
        ([resourceKey]) =>
          currentPhase === GamePhase.TWO ||
          !PHASE_TWO_RESOURCES.includes(resourceKey as ResourceTypes)
      )
      .map(
        ([resourceKey, resourceVal]) =>
          `${formatResource(resourceVal, resourceKey, true)}/day`
      );
  }
}

export function describeEffects(
  effects: GenericEffect[],
  currentPhase: GamePhase
) {
  return effects
    .flatMap((effect) => describeEffect(effect, currentPhase))
    .join(", ");
}
