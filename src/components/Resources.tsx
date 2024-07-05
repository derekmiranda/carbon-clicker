import { ClickerContext } from "../reducers/context";
import { useContext } from "react";
import { formatNum } from "../utils";
import "./Resources.css";
import { GamePhase } from "../types";

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

  return (
    <div className="resources-container">
      <h1>Carbon Clicker</h1>
      <div className="resources-grid">
        <p className="ppm-display">Global CO2: </p>
        <p className="resource ppm">{formatNum(globalPpm)} PPM </p>
        <p className="resource ppm">
          {resourceGrowthRates.globalPpm
            ? `+${formatNum(resourceGrowthRates.globalPpm * 30)}/mo.`
            : ""}{" "}
          <a
            target="_blank"
            href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
          >
            (?)
          </a>
        </p>

        <p>Mood:</p>
        <p>
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
            <p> ${formatNum(peoplePower, 0)}</p>
            <p className="resource">
              {resourceGrowthRates.peoplePower
                ? `${
                    resourceGrowthRates.peoplePower < 0 ? "-" : "+"
                  }${formatNum(resourceGrowthRates.peoplePower * 30)}/mo.`
                : ""}
            </p>

            <p>Trust:</p>
            <p> ${formatNum(trust, 2)}</p>
            <p className="resource">
              {resourceGrowthRates.trust
                ? `${resourceGrowthRates.trust < 0 ? "-" : "+"}${formatNum(
                    resourceGrowthRates.trust * 30
                  )}/mo.`
                : ""}
            </p>

            <p>Dollars (Collective):</p>
            <p> ${formatNum(collectiveDollars, 2)}</p>
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
    </div>
  );
}

export default Resources;
