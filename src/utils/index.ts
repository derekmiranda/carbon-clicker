import { DISPLAY_NAMES, RESOURCE_EMOJIS, SECS_PER_DAY } from "../constants";
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
  options: {
    showPlus?: boolean;
    emojiOnly?: boolean;
    isProportional?: boolean;
  }
) {
  const {
    showPlus = false,
    emojiOnly = false,
    isProportional: _isProportional = false,
  } = options ?? {};
  const isProportional = _isProportional || resourceKey === "globalPpm";
  val = typeof val === "string" ? parseInt(val) : val;
  const sign = val > 0 && showPlus ? "+" : val < 0 ? "-" : "";

  val = Math.abs(isProportional ? val * 100 : val);

  const percent = isProportional ? "%" : "";
  if (resourceKey === "dollars") {
    return `${sign}${RESOURCE_EMOJIS[resourceKey]}${val}${percent}`;
  } else if (resourceKey === "collectiveDollars") {
    return `${sign}${RESOURCE_EMOJIS[resourceKey]}${val}${percent}${
      emojiOnly ? "" : " (collective)"
    }`;
  }
  return `${sign}${val}${percent} ${
    emojiOnly ? "" : DISPLAY_NAMES[resourceKey]
  } ${RESOURCE_EMOJIS[resourceKey] || ""}`.trim();
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

export function describeEffect(
  effect: GenericEffect,
  currentPhase: GamePhase,
  isButton: boolean = false
) {
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
        formatResource(resourceVal, resourceKey, {
          showPlus: true,
          emojiOnly: isButton,
          isProportional: !!proportionalDiffs?.[resourceKey as ResourceTypes],
        })
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
          `${formatResource(resourceVal, resourceKey, {
            showPlus: true,
            emojiOnly: isButton,
          })}/day`
      );
  }
}

export function describeEffects(
  effects: GenericEffect[],
  currentPhase: GamePhase,
  isButton: boolean = false
) {
  return effects
    .flatMap((effect) => describeEffect(effect, currentPhase, isButton))
    .join(", ");
}
