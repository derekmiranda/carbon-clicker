import classNames from "classnames";
import { ButtonInterface } from "../reducers/buttonReducer";
import {
  ButtonKey,
  EffectTypes,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";
import "./Button.css";
import { ClickerContext } from "../reducers/context";
import { useContext, useEffect, useRef } from "react";
import { formatResource, getImgUrl } from "../utils";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
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
}: ButtonProps) {
  const {
    state: {
      buttons: { map },
    },
  } = useContext(ClickerContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { cooldown: breakCooldown } = map[
    ButtonKey.takeABreak
  ] as ButtonInterface;

  const mainCooldown = breakCooldown?.onCooldown
    ? breakCooldown
    : temporaryCooldown || cooldown;

  const handleClick = () => {
    clickButton(id);
  };

  useEffect(() => {
    if (
      buttonRef.current &&
      mainCooldown?.onCooldown &&
      mainCooldown?.cooldownSeconds
    ) {
      const button = buttonRef.current;
      button.style.animation = "";
      setTimeout(() => {
        button.style.animation = `wipe ${mainCooldown?.cooldownSeconds}s linear`;
      }, 0);
    }
  }, [mainCooldown?.onCooldown, mainCooldown?.cooldownSeconds]);

  const effectDetails = effects.map((effect) => {
    if (effect.type === EffectTypes.UPDATE_RESOURCES) {
      const { resourcesDiff } = effect as UpdateResourcesEffect;
      return Object.entries(resourcesDiff)
        .map(([resourceKey, resourceVal]) =>
          formatResource(resourceVal, resourceKey, true)
        )
        .join(", ");
    } else if (effect.type === EffectTypes.UPDATE_RESOURCES_RATE) {
      const { resourcesRateDiff } = effect as UpdateResourcesRateEffect;
      return Object.entries(resourcesRateDiff)
        .map(
          ([resourceKey, resourceVal]) =>
            `${formatResource(resourceVal, resourceKey, true)}/day`
        )
        .join(", ");
    }
  });

  if (id === ButtonKey.takeABreak) {
    effectDetails.push(", pause all actions");
  }

  return (
    <>
      <button
        className={classNames("button", {
          "button--cooling-down": mainCooldown?.onCooldown,
        })}
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
            Cost:{" "}
            {Object.entries(cost)
              .map(([key, val]) => formatResource(val, key))
              .join(", ")}
          </span>
        ) : null}
        {effects.length ? (
          <span className="button__detail">Effect: {effectDetails}</span>
        ) : null}
        {oneTime ? (
          <span className="button__detail">
            {purchased ? "Purchased!" : "One Time Purchase"}
          </span>
        ) : null}
      </button>
    </>
  );
}
