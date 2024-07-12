import classNames from "classnames";
import { ButtonInterface } from "../reducers/buttonReducer";
import { ButtonKey, Resources } from "../types";
import "./Button.css";
import { ClickerContext } from "../reducers/context";
import { useContext, useEffect, useRef } from "react";
import { describeEffects, formatResource, getImgUrl } from "../utils";
import { AudioSprite } from "../hooks/useAudio";
import { isResourceMet } from "../reducers/lib";
import useSelectedState from "../hooks/useSelectedState";

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
  const { moodPercent, isTired, isRealTired } = useSelectedState();
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
      mainCooldown?.cooldownSeconds
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
  ]);

  let effectDetails;
  if (isDestroyFossilFuelsButton) {
    effectDetails = "";
  } else if (isBreakButton) {
    effectDetails = "completely refill mood BUT pause all actions";
  } else {
    effectDetails = describeEffects(effects);
  }

  return (
    <>
      <button
        className={classNames(
          "button",
          {
            "button--cooling-down": mainCooldown?.onCooldown,
            "button--tired": !isBreakButton && !oneTime && isTired,
            "button--real-tired": !isBreakButton && !oneTime && isRealTired,
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
                      !isResourceMet(key, cost, resources),
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
