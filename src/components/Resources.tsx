import { ClickerContext } from "../reducers/context";
import { useContext } from "react";
import { formatNum } from "../utils";
import "./Resources.css";

function Resources() {
  const { state } = useContext(ClickerContext);
  const { resources, resourceGrowthRates } = state;
  const { mood, maxMood, co2Saved, knowledge, globalPpm, dollars } = resources;

  return (
    <div className="resources-container">
      <h1>Carbon Clicker</h1>
      <div className="resources-grid">
        <p className="ppm-display">Global CO2:</p>
        <p className="resource ppm">
          {formatNum(globalPpm)} PPM{" "}
          <a
            target="_blank"
            href="https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"
          >
            info
          </a>
        </p>
        {resourceGrowthRates.globalPpm ? (
          <>
            <p className="resource ppm">CO2 Growth Rate:</p>
            <p className="resource ppm">
              {formatNum(resourceGrowthRates.globalPpm * 30)} PPM/month
            </p>
          </>
        ) : null}

        <p>Mood:</p>
        <p>
          {mood}/{maxMood}
        </p>
        <p>Knowledge:</p>
        <p> {knowledge}</p>
        <p>CO2 Saved:</p>
        <p> {formatNum(co2Saved)} kg</p>
        <p>Dollars:</p>
        <p> ${formatNum(dollars, 2)}</p>
      </div>
    </div>
  );
}

export default Resources;
