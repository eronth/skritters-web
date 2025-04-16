import { SkritterStatline } from "../../types/types";
import { formatModifiers } from "../utilities";
import './StatsTable.css';

type Props = {
  stats: SkritterStatline;
};

export default function StatsTable({ stats }: Props) {

  return (
  <div className="stats-container">
    <table className="stats-table">
      <thead>
        <tr>
          <th>Movement</th>
          <th>Ranged</th>
          <th>Brawl</th>
          <th>Weave</th>
          <th>Defense</th>
          <th>Health</th>
          <th>Size</th>
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