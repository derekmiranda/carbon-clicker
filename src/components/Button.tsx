import classNames from "classnames";
import { ButtonInterface } from "../reducers/buttonReducer";
import {
  ButtonKey,
  EffectTypes,
  Resources,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";
import "./Button.css";
import { ClickerContext } from "../reducers/context";
import { useContext, useEffect, useRef } from "react";
import { formatResource, getImgUrl } from "../utils";
import {
  REAAAALLLYYY_TIRED_MOOD_PERCENT,
  TIRED_MOOD_PERCENT,
} from "../constants";
import { AudioSprite } from "../hooks/useAudio";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string, moodPercent: number) => void;
  className?: string;
}

function Icon({ url }: { url: string }) {
  return <img className="button__icon" src={getImgUrl(url)} />;
}

export default function Button({
  id,
  displayName,
  clickButton,
  enabled,
  cooldown,
  temporaryCooldown,
  effects,
  oneTime,
  purchased,
  cost,
  icon,
  className = "",
}: ButtonProps) {
  const {
    state: {
      resources,
      buttons: { map },
    },
    audio,
  } = useContext(ClickerContext);
  const { mood, maxMood } = resources;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { cooldown: breakCooldown } = map[
    ButtonKey.takeABreak
  ] as ButtonInterface;
  const {
    playClickSFX,
    playUpgradeSFX,
    playWallowSFX,
    playSelfEducateSFX,
    playSFX,
  } = audio!;

  const mainCooldown = breakCooldown?.onCooldown
    ? breakCooldown
    : temporaryCooldown || cooldown;

  const moodPercent = mood / maxMood;
  const isDestroyFossilFuelsButton = id === ButtonKey.destroyFossilFuelIndustry;
  const isBreakButton = id === ButtonKey.takeABreak;

  const handleClick = () => {
    clickButton(id, id === ButtonKey.takeABreak ? 1 : moodPercent);

    if (id === ButtonKey.wallowInMisery) {
      playWallowSFX();
    } else if (id === ButtonKey.selfEducate) {
      playSelfEducateSFX();
    } else if (id === ButtonKey.takeABreak) {
      playSFX(AudioSprite.REST);
    } else if (oneTime) {
      playUpgradeSFX();
    } else {
      playClickSFX();
    }
  };

  useEffect(() => {
    if (
      buttonRef.current &&
      mainCooldown?.onCooldown &&
      mainCooldown?.cooldownSeconds &&
      !oneTime
    ) {
      const button = buttonRef.current;
      button.style.backgroundPosition = `${
        80 -
        60 *
          (mainCooldown.elapsedCooldownSeconds / mainCooldown.cooldownSeconds)
      }%`;
    }
  }, [
    mainCooldown?.onCooldown,
    mainCooldown?.cooldownSeconds,
    mainCooldown?.elapsedCooldownSeconds,
    oneTime,
  ]);

  let effectDetails = effects
    .flatMap((effect) => {
      if (effect.type === EffectTypes.UPDATE_RESOURCES) {
        const { resourcesDiff } = effect as UpdateResourcesEffect;
        return Object.entries(resourcesDiff).map(([resourceKey, resourceVal]) =>
          formatResource(resourceVal, resourceKey, true)
        );
      } else if (effect.type === EffectTypes.UPDATE_RESOURCES_RATE) {
        const { resourcesRateDiff } = effect as UpdateResourcesRateEffect;
        return Object.entries(resourcesRateDiff).map(
          ([resourceKey, resourceVal]) =>
            `${formatResource(resourceVal, resourceKey, true)}/day`
        );
      }
    })
    .join(", ");

  if (isDestroyFossilFuelsButton) {
    effectDetails = "";
  } else if (isBreakButton) {
    effectDetails = "completely refill mood BUT pause all actions";
  }

  return (
    <>
      <button
        className={classNames(
          "button",
          {
            "button--cooling-down": mainCooldown?.onCooldown,
            "button--tired":
              !isBreakButton &&
              !oneTime &&
              REAAAALLLYYY_TIRED_MOOD_PERCENT < moodPercent &&
              moodPercent <= TIRED_MOOD_PERCENT,
            "button--real-tired":
              !isBreakButton &&
              !oneTime &&
              moodPercent <= REAAAALLLYYY_TIRED_MOOD_PERCENT,
            "button--take-break": isBreakButton,
          },
          className
        )}
        disabled={!enabled || mainCooldown?.onCooldown}
        onClick={handleClick}
        ref={buttonRef}
      >
        <span
          className={classNames("button__title", {
            "button__title--purchased": purchased,
          })}
        >
          {icon ? <Icon url={icon} /> : null}
          {displayName}
        </span>

        {cost && !purchased ? (
          <span className="button__detail">
            {cost.noDeduct ? "Requires" : "Costs"}:{" "}
            {Object.entries(cost)
              .filter(([key]) => key !== "noDeduct")
              .map(([key, val], idx) => (
                <span
                  className={classNames({
                    "detail-part": true,
                    "detail-part--unmet":
                      typeof cost[key as keyof Resources] === "number" &&
                      cost[key as keyof Resources]! >=
                        resources[key as keyof Resources]!,
                  })}
                  key={idx}
                >{`${idx > 0 ? "+" : ""}${formatResource(val, key)}`}</span>
              ))}
          </span>
        ) : null}

        {effects.length && !isDestroyFossilFuelsButton ? (
          <span className="button__detail">Effect: {effectDetails}</span>
        ) : null}
      </button>
    </>
  );
}
