import { faBullseye, faHandBackFist, faHeartPulse, faShield, faShoePrints, faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { SkritterStatline } from "../../types/types";
import { formatModifiers } from "../utilities";
import './StatsTable.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  stats: SkritterStatline;
};

export default function StatsTable({ stats }: Props) {

  return (
  <div className="stats-container">
    <table className="stats-table">
      <thead>
        <tr>
          <th><FontAwesomeIcon icon={faShoePrints} /><br />Movement</th>
          <th><FontAwesomeIcon icon={faBullseye} /><br />Ranged</th>
          <th><FontAwesomeIcon icon={faHandBackFist} /><br />Brawl</th>
          <th><FontAwesomeIcon icon={faWandSparkles} /><br />Weave</th>
          <th><FontAwesomeIcon icon={faShield} /><br />Defense</th>
          <th><FontAwesomeIcon icon={faHeartPulse} /><br />Heart</th>
          <th className="size-column">Size</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{stats.movement}″</td>
          <td>{formatModifiers(stats.ranged)}</td>
          <td>{formatModifiers(stats.brawl)}</td>
          <td>{formatModifiers(stats.weave)}</td>
          <td>{formatModifiers(stats.defense)}</td>
          <td>{stats.health}</td>
          <td>{stats.size}</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}