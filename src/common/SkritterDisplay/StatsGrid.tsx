import { faBullseye, faHandBackFist, faHeartPulse, faShield, faShoePrints, faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { SkritterStatline } from "../../types/types";
import { formatModifiers } from "../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './StatsGrid.css';

type Props = {
  stats: SkritterStatline;
};

export default function StatsGrid({ stats }: Props) {
  return (
    <div className="stats-container">
      <div className="stats-grid">
        <div className="stat-cell stat-cell--movement">
          <div className="stat-header"><FontAwesomeIcon icon={faShoePrints} /> Move</div>
          <div className="stat-value">{stats.movement}″</div>
        </div>
        <div className="stat-cell stat-cell--ranged">
          <div className="stat-header"><FontAwesomeIcon icon={faBullseye} /> Ranged</div>
          <div className="stat-value">{formatModifiers(stats.ranged)}</div>
        </div>
        <div className="stat-cell stat-cell--brawl">
          <div className="stat-header"><FontAwesomeIcon icon={faHandBackFist} /> Brawl</div>
          <div className="stat-value">{formatModifiers(stats.brawl)}</div>
        </div>
        <div className="stat-cell stat-cell--weave">
          <div className="stat-header"><FontAwesomeIcon icon={faWandSparkles} /> Weave</div>
          <div className="stat-value">{formatModifiers(stats.weave)}</div>
        </div>
        <div className="stat-cell stat-cell--defense">
          <div className="stat-header"><FontAwesomeIcon icon={faShield} /> Defense</div>
          <div className="stat-value">{formatModifiers(stats.defense)}</div>
        </div>
        <div className="stat-cell stat-cell--heart">
          <div className="stat-header"><FontAwesomeIcon icon={faHeartPulse} /> Heart</div>
          <div className="stat-value">{stats.health}</div>
        </div>
        <div className="stat-cell stat-cell--size">
          <div className="stat-header">Size</div>
          <div className="stat-value">{stats.size}</div>
        </div>
        <div className="stat-cell stat-cell--idk">
          <div className="stat-header">idk</div>
          <div className="stat-value">idk</div>
        </div>
      </div>
    </div>
  );
}