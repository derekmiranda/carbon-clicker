import classNames from "classnames";

import useTicker from "../hooks/useTicker";
import { ButtonInterface } from "../reducers/buttonReducer";
import Modal from "./Modal";
import Logs from "./Logs";

import "./Clicker.css";
import { saveGameData } from "../storage";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { useContext } from "react";
import {
  EffectTypes,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";

interface ButtonProps extends ButtonInterface {
  clickButton: (buttonId: string) => void;
}

function Button({
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
                      `+${resourceVal} ${resourceKey}`
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

function formatNum(num: number) {
  return num.toFixed(1);
}

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { clickButton, tickClock, clearGameData } = useDispatchers();
  const { resources, resourceGrowthRates, buttons } = state;
  const { energy, maxEnergy, co2Saved, knowledge, globalPpm } = resources;

  useTicker((timeDelta) => {
    tickClock(timeDelta);
  });

  return (
    <>
      <h1>Carbon Clicker</h1>
      <Modal />
      <div>
        <p className="ppm-display">Global CO2: {formatNum(globalPpm)} PPM</p>
        {resourceGrowthRates.globalPpm ? (
          <p>
            CO2 Growth Rate: {formatNum(resourceGrowthRates.globalPpm * 30)}{" "}
            PPM/month
          </p>
        ) : null}
        <p>--</p>
        <p>
          Mood: {energy}/{maxEnergy}
        </p>
        <p>Knowledge: {knowledge}</p>
        <p>CO2 Saved: {formatNum(co2Saved)} kg</p>
        <div className="buttons-container">
          {buttons.order
            .filter((buttonKey) => buttons.map[buttonKey].unlocked)
            .map((buttonKey) => (
              <Button
                key={buttonKey}
                {...buttons.map[buttonKey]}
                clickButton={clickButton}
              />
            ))}
        </div>
        <Logs />
        <div className="game-data-container">
          <button
            onClick={() => {
              saveGameData(state);
            }}
          >
            Save
          </button>
          <button onClick={clearGameData}>Clear</button>
        </div>
      </div>
    </>
  );
}

export default Clicker;
