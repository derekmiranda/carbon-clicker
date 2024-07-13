import { ClickerContext } from "../reducers/context";
import { useContext } from "react";
import { formatNum, getImgUrl } from "../utils";
import "./Resources.css";
import { GamePhase } from "../types";
import useSelectedState from "../hooks/useSelectedState";
import classNames from "classnames";
import { SECS_PER_DAY, STARTING_PPM } from "../constants";

function Resources() {
  const { state } = useContext(ClickerContext);
  const { resources, resourceGrowthRates, phase } = state;
  const {
    mood,
    maxMood,
    co2Saved,
    knowledge,
    globalPpm,
    dollars,
    collectiveDollars,
    peoplePower,
    trust,
  } = resources;
  const isPastPhaseTwo = phase !== GamePhase.ONE;
  const { purchasedIcons, currentTimes, isEnergized, isTired, isRealTired } =
    useSelectedState();
  const { day, month, year } = currentTimes;
  const moodClassName = classNames({
    "great-mood": isEnergized,
    "tired-mood": isTired,
    "real-tired-mood": isRealTired,
  });
  const titleStyle = {
    fontVariationSettings: `"YEAR" ${1979 + 10 * (globalPpm - STARTING_PPM)}`,
  };

  return (
    <div className="resources-container">
      <h1 style={titleStyle}>Carbon Clicker</h1>
      <div className="resources-grid">
        <p className="time-display">
          Day: {day}, Month: {month}, Year: {year}
        </p>
        <p className="ppm-display ppm-color">Global CO2: </p>
        <p className="ppm-color">{formatNum(globalPpm)} PPM </p>
        <p className="ppm-color">
          {resourceGrowthRates.globalPpm
            ? `+${formatNum(resourceGrowthRates.globalPpm * 30, 3)}/mo.`
            : ""}{" "}
          <a
            target="_blank"
            href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
          >
            (?)
          </a>
        </p>

        <p className={moodClassName}>Mood:</p>
        <p className={moodClassName}>
          {formatNum(mood, 0)}/{maxMood}
        </p>
        <p className={moodClassName}>
          {resourceGrowthRates.mood
            ? `+${formatNum(resourceGrowthRates.mood * SECS_PER_DAY, 0)}/day`
            : ""}{" "}
        </p>

        <p className="knowledge-color">Knowledge:</p>
        <p className="knowledge-color">{knowledge}</p>
        <p className="knowledge-color"></p>

        <p>CO2 Saved:</p>
        <p> {formatNum(co2Saved)} kg</p>
        <p className="resource">
          {resourceGrowthRates.co2Saved
            ? `${resourceGrowthRates.co2Saved < 0 ? "-" : "+"}${formatNum(
                resourceGrowthRates.co2Saved * 30
              )}/mo.`
            : ""}
        </p>

        <p>Dollars {isPastPhaseTwo ? "(Individual)" : ""}:</p>
        <p> ${formatNum(dollars, 2)}</p>
        <p className="resource">
          {resourceGrowthRates.dollars
            ? `${resourceGrowthRates.dollars < 0 ? "-" : "+"}${formatNum(
                resourceGrowthRates.dollars * 30
              )}/mo.`
            : ""}
        </p>

        {isPastPhaseTwo ? (
          <>
            <p>Dollars (Collective):</p>
            <p>${formatNum(collectiveDollars, 2)}</p>
            <p className="resource">
              {resourceGrowthRates.collectiveDollars
                ? `${
                    resourceGrowthRates.collectiveDollars < 0 ? "-" : "+"
                  }${formatNum(resourceGrowthRates.collectiveDollars * 30)}/mo.`
                : ""}
            </p>

            <p className="people-power-color">People Power:</p>
            <p className="people-power-color">{formatNum(peoplePower, 0)}</p>
            <p className="people-power-color">
              {resourceGrowthRates.peoplePower
                ? `${
                    resourceGrowthRates.peoplePower < 0 ? "-" : "+"
                  }${formatNum(resourceGrowthRates.peoplePower * 30)}/mo.`
                : ""}
            </p>

            <p className="trust-color">Trust:</p>
            <p className="trust-color">{formatNum(trust, 0)}%</p>
            <p className="trust-color">
              {resourceGrowthRates.trust
                ? `${resourceGrowthRates.trust < 0 ? "-" : "+"}${formatNum(
                    resourceGrowthRates.trust * 30
                  )}/mo.`
                : ""}
            </p>
          </>
        ) : null}
      </div>
      {purchasedIcons.length ? (
        <div className="icons-box">
          {purchasedIcons.map((icon: string) => (
            <img key={icon} src={getImgUrl(icon)} />
          ))}
        </div>
      ) : null}

      {isTired ? (
        <p className="mood-message tired-mood">
          your mood's starting to drop. actions may take longer than usual
        </p>
      ) : null}
      {isRealTired ? (
        <p className="mood-message real-tired-mood">
          your mood's at an all-time low. it's a struggle to do anything right
          now
        </p>
      ) : null}
    </div>
  );
}

export default Resources;
