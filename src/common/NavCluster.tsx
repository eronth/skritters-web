import { Link } from 'react-router-dom';
import './nav.css';

export default function NavCluster() {
  return (
    <nav className="navbar navcluster">
      <div><Link to="/about">About</Link></div>
      <div><Link to="/how-to-play">How to Play</Link></div>
      <div><Link to="/skritters">Skritters</Link></div>
      <div><Link to="/equipment">Equipment</Link></div>
      <div><Link to="/campaign">Campaign</Link></div>
      <div><Link to="/crew-builder">Crew Builder</Link></div>
    </nav>
  );
}
