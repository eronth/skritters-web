import { Link } from 'react-router-dom';
import './nav.css';

export default function NavCluster() {
  return (
    <nav className="navbar navcluster">
      <div><Link to="/about">About</Link></div>
      <div><Link to="/how-to-play">How to Play</Link></div>
      <div><Link to="/character-creation">Character Creation</Link></div>
      <div><Link to="/additional-equipment">Equipment</Link></div>
      <div><Link to="/advanced-perks">Advanced Perks</Link></div>
      <div><Link to="/magic">Magic</Link></div>
      <div><Link to="/creatures">Creatures</Link></div>
    </nav>
  );
}
