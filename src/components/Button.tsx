import classNames from "classnames";
import { ButtonInterface } from "../reducers/buttonReducer";
import {
  EffectTypes,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";
import "./Button.css";
import { DISPLAY_NAMES } from "../constants";
import { CooldownInterface } from "../reducers/cooldownReducer";
import { ClickerContext } from "../reducers/context";
import { useContext } from "react";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
}

function Icon({ url }: { url: string }) {
  const imgUrl = `${import.meta.env.BASE_URL}${url}`;
  return <img className="button__icon" src={imgUrl} />;
}

function getButtonStyles(cooldown: CooldownInterface) {
  const progress = cooldown?.onCooldown
    ? cooldown.elapsedCooldownSeconds / cooldown.cooldownSeconds
    : undefined;
  const percent = progress && `${progress * 100}%`;

  return percent
    ? {
        background: `linear-gradient(45deg, transparent ${percent}, var(--accent-color) 0)`,
      }
    : undefined;
}

export default function Button({
  id,
  displayName,
  clickButton,
  enabled,
  cooldown,
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
  const { cooldown: breakCooldown } = map.takeABreak;

  const mainCooldown = breakCooldown?.onCooldown ? breakCooldown : cooldown;

  const handleClick = () => {
    clickButton(id);
  };

  return (
    <>
      <button
        className={classNames("button", {
          "button--cooling-down": mainCooldown?.onCooldown,
        })}
        style={mainCooldown ? getButtonStyles(mainCooldown) : undefined}
        disabled={!enabled || mainCooldown?.onCooldown}
        onClick={handleClick}
      >
        <span className="button__title">
          {icon ? <Icon url={icon} /> : null}
          {displayName}
        </span>
        {cost ? (
          <span className="button__detail">
            Cost:{" "}
            {Object.entries(cost)
              .map(([key, val]) => `${val} ${key}`)
              .join(", ")}
          </span>
        ) : null}
        {effects.length ? (
          <span className="button__detail">
            Effect:{" "}
            {effects.map((effect) => {
              if (effect.type === EffectTypes.UPDATE_RESOURCES) {
                const { resourcesDiff } = effect as UpdateResourcesEffect;
                return Object.entries(resourcesDiff)
                  .map(
                    ([resourceKey, resourceVal]) =>
                      `${resourceVal < 0 ? "" : "+"}${resourceVal} ${
                        DISPLAY_NAMES[resourceKey] || resourceKey
                      }`
                  )
                  .join(", ");
              } else if (effect.type === EffectTypes.UPDATE_RESOURCES_RATE) {
                const { resourcesRateDiff } =
                  effect as UpdateResourcesRateEffect;
                return Object.entries(resourcesRateDiff)
                  .map(
                    ([resourceKey, resourceVal]) =>
                      `+${resourceVal} ${
                        DISPLAY_NAMES[resourceKey] || resourceKey
                      }/day`
                  )
                  .join(", ");
              }
            })}
          </span>
        ) : null}
        {oneTime ? (
          <span className="button__detail">
            {purchased ? "Purchased" : "One Time Purchase"}
          </span>
        ) : null}
      </button>
    </>
  );
}
