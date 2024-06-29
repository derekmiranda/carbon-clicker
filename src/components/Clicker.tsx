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
import { SECS_PER_DAY } from "../constants";

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

function formatNum(num: number, decimals: number = 1) {
  return num.toFixed(decimals);
}

function Clicker() {
  const { state } = useContext(ClickerContext);
  const { clickButton, tickClock, clearGameData } = useDispatchers();
  const { resources, resourceGrowthRates, buttons, elapsedTime } = state;
  const { mood, maxMood, co2Saved, knowledge, globalPpm, dollars } = resources;

  useTicker((timeDelta) => {
    tickClock(timeDelta);
  });

  return (
    <main className="game">
      <div className="resources-container">
        <h1>Carbon Clicker</h1>
        <p className="ppm-display">Global CO2: {formatNum(globalPpm)} PPM</p>
        {resourceGrowthRates.globalPpm ? (
          <p>
            CO2 Growth Rate: {formatNum(resourceGrowthRates.globalPpm * 30)}{" "}
            PPM/month
          </p>
        ) : null}
        <p>Month: {formatNum(elapsedTime / SECS_PER_DAY / 30, 0)}</p>
        <p>--</p>
        <p>
          Mood: {mood}/{maxMood}
        </p>
        <p>Knowledge: {knowledge}</p>
        <p>CO2 Saved: {formatNum(co2Saved)} kg</p>
        <p>${formatNum(dollars, 2)}</p>
      </div>
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
      <Modal />
    </main>
  );
}

export default Clicker;
