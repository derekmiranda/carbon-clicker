import classNames from "classnames";
import { ButtonInterface } from "../reducers/buttonReducer";
import {
  EffectTypes,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";
import "./Button.css";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
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
}: ButtonProps) {
  const handleClick = () => {
    clickButton(id);
  };
  const opacity = cooldown?.onCooldown
    ? cooldown.elapsedCooldownSeconds / cooldown.cooldownSeconds
    : undefined;

  return (
    <>
      <button
        className={classNames("button", {
          "button--cooling-down": cooldown?.onCooldown,
        })}
        style={{
          opacity,
          cursor: cooldown?.onCooldown ? "wait" : "default",
        }}
        disabled={!enabled || cooldown?.onCooldown}
        onClick={handleClick}
      >
        {displayName}
        {cost ? (
          <span>
            Cost:{" "}
            {Object.entries(cost)
              .map(([key, val]) => `${val} ${key}`)
              .join(", ")}
          </span>
        ) : null}
        {effects.length ? (
          <span>
            Effect:{" "}
            {effects.map((effect) => {
              if (effect.type === EffectTypes.UPDATE_RESOURCES) {
                const { resourcesDiff } = effect as UpdateResourcesEffect;
                return Object.entries(resourcesDiff)
                  .map(
                    ([resourceKey, resourceVal]) =>
                      `${
                        resourceVal < 0 ? "" : "+"
                      }${resourceVal} ${resourceKey}`
                  )
                  .join(", ");
              } else if (effect.type === EffectTypes.UPDATE_RESOURCES_RATE) {
                const { resourcesRateDiff } =
                  effect as UpdateResourcesRateEffect;
                return Object.entries(resourcesRateDiff)
                  .map(
                    ([resourceKey, resourceVal]) =>
                      `+${resourceVal} ${resourceKey}/sec`
                  )
                  .join(", ");
              }
            })}
          </span>
        ) : null}
        {oneTime ? (
          <span>{purchased ? "Purchased" : "One Time Purchase"}</span>
        ) : null}
      </button>
    </>
  );
}
