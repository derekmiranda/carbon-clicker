import { ClickerContext } from "../reducers/context";
import { useContext } from "react";
import { formatNum, getImgUrl } from "../utils";
import "./Resources.css";
import { GamePhase } from "../types";
import useSelectedState from "../hooks/useSelectedState";
import classNames from "classnames";
import {
  REAAAALLLYYY_TIRED_MOOD_PERCENT,
  TIRED_MOOD_PERCENT,
} from "../constants";

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
  const isPhaseTwo = phase === GamePhase.TWO;
  const { purchasedIcons, currentTimes } = useSelectedState();
  const { day, month, year } = currentTimes;
  const parsedYear = parseInt(year);
  const moodPercent = mood / maxMood;
  const moodClassName = classNames({
    "great-mood": TIRED_MOOD_PERCENT <= moodPercent,
    "tired-mood":
      REAAAALLLYYY_TIRED_MOOD_PERCENT <= moodPercent &&
      moodPercent < TIRED_MOOD_PERCENT,
    "real-tired-mood": moodPercent < REAAAALLLYYY_TIRED_MOOD_PERCENT,
  });

  return (
    <div className="resources-container">
      <h1
        className={classNames({
          "year-2030": 2030 <= parsedYear && parsedYear < 2040,
          "year-2040": 2040 <= parsedYear,
        })}
      >
        Carbon Clicker
      </h1>
      <div className="resources-grid">
        <p className="time-display">
          Day: {day}, Month: {month}, Year: {year}
        </p>
        <p className="ppm-display">Global CO2: </p>
        <p className="resource ppm">{formatNum(globalPpm)} PPM </p>
        <p className="resource ppm">
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
          {mood}/{maxMood}
        </p>
        <p className="resource"></p>

        <p>Knowledge:</p>
        <p> {knowledge}</p>
        <p className="resource"></p>

        <p>CO2 Saved:</p>
        <p> {formatNum(co2Saved)} kg</p>
        <p className="resource">
          {resourceGrowthRates.co2Saved
            ? `${resourceGrowthRates.co2Saved < 0 ? "-" : "+"}${formatNum(
                resourceGrowthRates.co2Saved * 30
              )}/mo.`
            : ""}
        </p>

        <p>Dollars {isPhaseTwo ? "(Individual)" : ""}:</p>
        <p> ${formatNum(dollars, 2)}</p>
        <p className="resource">
          {resourceGrowthRates.dollars
            ? `${resourceGrowthRates.dollars < 0 ? "-" : "+"}${formatNum(
                resourceGrowthRates.dollars * 30
              )}/mo.`
            : ""}
        </p>

        {isPhaseTwo ? (
          <>
            <p>People Power:</p>
            <p>{formatNum(peoplePower, 0)}</p>
            <p className="resource">
              {resourceGrowthRates.peoplePower
                ? `${
                    resourceGrowthRates.peoplePower < 0 ? "-" : "+"
                  }${formatNum(resourceGrowthRates.peoplePower * 30)}/mo.`
                : ""}
            </p>

            <p>Trust:</p>
            <p>{formatNum(trust, 0)}%</p>
            <p className="resource">
              {resourceGrowthRates.trust
                ? `${resourceGrowthRates.trust < 0 ? "-" : "+"}${formatNum(
                    resourceGrowthRates.trust * 30
                  )}/mo.`
                : ""}
            </p>

            <p>Dollars (Collective):</p>
            <p>${formatNum(collectiveDollars, 2)}</p>
            <p className="resource">
              {resourceGrowthRates.collectiveDollars
                ? `${
                    resourceGrowthRates.collectiveDollars < 0 ? "-" : "+"
                  }${formatNum(resourceGrowthRates.collectiveDollars * 30)}/mo.`
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
    </div>
  );
}

export default Resources;
