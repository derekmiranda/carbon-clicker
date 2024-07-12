import useSelectedState from "../hooks/useSelectedState";
import ButtonsList from "./ButtonsList";
import "./Buttons.css";

export default function Upgrades() {
  const { upgradeButtons } = useSelectedState();
  return upgradeButtons.length ? (
    <div className="buttons-container buttons-container--upgrades">
      <div className="buttons-box">
        <h2>One-Time Actions</h2>
        <ButtonsList buttonOrder={upgradeButtons} />
      </div>
    </div>
  ) : null;
}
