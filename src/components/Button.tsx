import classNames from "classnames";
import { ButtonInterface } from "../reducers/buttonReducer";
import {
  ButtonKey,
  GamePhase,
  ModalView,
  NON_DEDUCTABLE_RESOURCES,
  Resources,
  ResourceTypes,
} from "../types";
import "./Button.css";
import { ClickerContext } from "../reducers/context";
import { useContext, useEffect, useRef } from "react";
import { describeEffects, formatResource, getImgUrl } from "../utils";
import { AudioSprite } from "../hooks/useAudio";
import { isResourceMet } from "../reducers/lib";
import useSelectedState from "../hooks/useSelectedState";
import useDispatchers from "../hooks/useDispatchers";
import { EPILOGUE_BUTTON_LOGS } from "../constants";

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
      phase,
      buttons: { map },
    },
    audio,
    ticker,
    setShowCredits,
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
  const { addDelayedEffect } = ticker!;
  const { progressEndSequence, openModal } = useDispatchers();

  const mainCooldown = breakCooldown?.onCooldown
    ? breakCooldown
    : temporaryCooldown || cooldown;

  const isDestroyFossilFuelsButton = id === ButtonKey.destroyFossilFuelIndustry;
  const isBreakButton = id === ButtonKey.takeABreak;

  const handleClick = () => {
    if (id === ButtonKey.wallowInMisery) {
      playWallowSFX();
    } else if (id === ButtonKey.selfEducate) {
      playSelfEducateSFX();
    } else if (id === ButtonKey.takeABreak) {
      playSFX(AudioSprite.REST);
    } else if (id === ButtonKey.destroyFossilFuelIndustry) {
      playSFX(AudioSprite.EPILOGUE_1);
    } else if (oneTime) {
      playUpgradeSFX();
    } else {
      playClickSFX();
    }

    if (phase === GamePhase.ENDING) {
      if (id === ButtonKey.takeABreak) {
        addDelayedEffect(() => {
          progressEndSequence();
        }, cooldown!.baseCooldownSeconds);
      } else if (
        id === ButtonKey.bikeInsteadOfDrive ||
        id === ButtonKey.cookVegMeal ||
        id === ButtonKey.turnOffLights
      ) {
        openModal(ModalView.GENERIC, {
          content: EPILOGUE_BUTTON_LOGS[id],
          onClose: () => {
            switch (id) {
              case ButtonKey.bikeInsteadOfDrive:
              case ButtonKey.cookVegMeal:
                progressEndSequence();
                return undefined;
              case ButtonKey.turnOffLights:
                setShowCredits(true);
                playSFX(AudioSprite.EPILOGUE_4);
                return { disableDefaultSFX: true };
            }
          },
        });
      }
    }

    clickButton(id, id === ButtonKey.takeABreak ? 1 : moodPercent);
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
    effectDetails = describeEffects(effects, phase, true);
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
          <span className="button__detail button__detail--requirement">
            {Object.keys(cost).some((resourceKey) =>
              NON_DEDUCTABLE_RESOURCES.includes(resourceKey as ResourceTypes)
            )
              ? "Requires"
              : "Costs"}
            :{" "}
            {Object.entries(cost).map(([key, val], idx, entries) => (
              <span
                className={classNames({
                  "detail-part": true,
                  "detail-part--unmet":
                    typeof cost[key as keyof Resources] === "number" &&
                    !isResourceMet(key, cost, resources),
                })}
                key={idx}
              >{`${formatResource(val, key, {
                showPlus: false,
                emojiOnly: true,
              })}${idx < entries.length - 1 ? ", " : ""}`}</span>
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
