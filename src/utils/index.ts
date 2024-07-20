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
  options?: {
    showPlus?: boolean;
    emojiOnly?: boolean;
    isProportional?: boolean;
    fullDescription?: boolean;
    hidePrefix?: boolean;
  }
) {
  const {
    showPlus = false,
    emojiOnly = false,
    isProportional: _isProportional = false,
    fullDescription = false,
    hidePrefix = false,
  } = options ?? {};
  const isProportional = _isProportional || resourceKey === "globalPpm";
  val = typeof val === "string" ? parseInt(val) : val;
  const sign = val > 0 && showPlus ? "+" : val < 0 ? "-" : "";
  const effectVerb = val > 0 ? "gives " : val < 0 ? "takes " : "";
  const prefix = hidePrefix ? "" : fullDescription ? effectVerb : sign;

  val = Math.abs(isProportional ? val * 100 : val);

  const percent = isProportional ? "%" : "";
  if (resourceKey === "dollars" || resourceKey === "collectiveDollars") {
    let baseStr = isProportional
      ? `${prefix}${val}${percent} of ${RESOURCE_EMOJIS[resourceKey]}`
      : `${prefix}${RESOURCE_EMOJIS[resourceKey]}${val}`;
    if (resourceKey === "collectiveDollars" && !emojiOnly) {
      baseStr += " (collective)";
    }
    return baseStr;
  }
  return `${prefix}${val}${percent} ${
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
  isButton: boolean = false,
  fullDescription: boolean = false
) {
  if (effect.type === EffectTypes.UPDATE_RESOURCES) {
    const { resourcesDiff, proportionalDiffs } =
      effect as UpdateResourcesEffect;
    return (
      Object.entries(resourcesDiff)
        .filter(
          ([resourceKey]) =>
            currentPhase === GamePhase.TWO ||
            !PHASE_TWO_RESOURCES.includes(resourceKey as ResourceTypes)
        )
        // sort in descending order
        .sort((effectA, effectB) => effectB[1] - effectA[1])
        .map(([resourceKey, resourceVal], idx, entries) =>
          formatResource(resourceVal, resourceKey, {
            showPlus: true,
            emojiOnly: isButton,
            isProportional: !!proportionalDiffs?.[resourceKey as ResourceTypes],
            fullDescription,
            hidePrefix:
              idx > 0 || (entries[idx - 1]?.[1] > 0 && resourceVal < 0),
          })
        )
    );
  } else if (effect.type === EffectTypes.UPDATE_RESOURCES_RATE) {
    const { resourcesRateDiff } = effect as UpdateResourcesRateEffect;
    return (
      Object.entries(resourcesRateDiff)
        .filter(
          ([resourceKey]) =>
            currentPhase === GamePhase.TWO ||
            !PHASE_TWO_RESOURCES.includes(resourceKey as ResourceTypes)
        )
        // sort in descending order
        .sort((effectA, effectB) => effectB[1] - effectA[1])
        .map(
          ([resourceKey, resourceVal]) =>
            `${formatResource(resourceVal, resourceKey, {
              showPlus: true,
              emojiOnly: isButton,
              fullDescription,
            })}/day`
        )
    );
  }
  return "";
}

export function describeEffects(
  effects: GenericEffect[],
  currentPhase: GamePhase,
  isButton: boolean = false,
  fullDescription: boolean = false
) {
  return effects
    .flatMap((effect) =>
      describeEffect(effect, currentPhase, isButton, fullDescription)
    )
    .join(", ");
}

function formatListString(items: string[]) {
  let result = "";
  items.forEach((item, idx) => {
    result += item;
    if (items.length > 2 && idx < items.length - 1) result += ", ";
    // if penultimate, add "and"
    if (idx === items.length - 2) result += " and ";
  });
  return result;
}

export function fullyDescribeButton(button: ButtonInterface, phase: GamePhase) {
  const lines: string[] = [];

  if (button.id === ButtonKey.destroyFossilFuelIndustry) {
    return "???";
  }

  if (button.effects.length) {
    const updateResourceEffectDescriptions = button.effects
      .filter((effect) => effect.type === EffectTypes.UPDATE_RESOURCES)
      .flatMap((effect) => {
        return describeEffect(effect, phase, false, true);
      })
      .filter(Boolean);

    if (updateResourceEffectDescriptions.length) {
      lines.push(formatListString(updateResourceEffectDescriptions));
    }

    const updateResourceRateEffectDescriptions = button.effects
      .filter((effect) => effect.type === EffectTypes.UPDATE_RESOURCES_RATE)
      .flatMap((effect) => {
        return describeEffect(effect, phase, false, true);
      })
      .filter(Boolean);

    if (updateResourceRateEffectDescriptions.length) {
      lines.push(formatListString(updateResourceRateEffectDescriptions));
    }

    if (button.cost) {
      const costs = Object.entries(button.cost).map(([key, val]) =>
        formatResource(val, key, { showPlus: false })
      );
      if (costs.length) {
        lines.push(`costs ${formatListString(costs)}`);
      }
    }

    return lines.join("<br>");
  }
}
