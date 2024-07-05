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
        <p className="resource ppm">
          {resourceGrowthRates.globalPpm
            ? `+${formatNum(resourceGrowthRates.globalPpm * 30)}/mo.`
            : ""}
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

        <p>Dollars:</p>
        <p> ${formatNum(dollars, 2)}</p>
        <p className="resource">
          {resourceGrowthRates.dollars
            ? `${resourceGrowthRates.dollars < 0 ? "-" : "+"}${formatNum(
                resourceGrowthRates.dollars * 30
              )}/mo.`
            : ""}
        </p>
      </div>
    </div>
  );
}

export default Resources;
