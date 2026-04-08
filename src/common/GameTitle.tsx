import { Link } from 'react-router-dom';
import "./GameTitle.css";

export default function GameTitle({ isIndex }: { isIndex?: boolean }) {
  return (
    <Link to="/" className={`game-title${isIndex ? ' index-page' : ''}`}>
      Skritters!
    </Link>
  );
}
