import Keyword from "../../Keyword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import './Success.css';

export default function Success({ x, bonus, plural, shorthand }: { 
  x?: number,
  bonus?: boolean,
  plural?: boolean,
  shorthand?: boolean,
}) {
  x = x || 0; // Default to 0 if x is undefined or null
  const precursorText = (
    x
    ? (bonus ? ((x < 0) ? '-' : '+') : '') + Math.abs(x || 0) + ' ' 
    : ''
  )

  const pluralText = (
    plural || (Math.abs(x) > 1)
    ? 'es'
    : ''
  )

  const finalText = shorthand
  ? <>{precursorText}<FontAwesomeIcon icon={faStar} /></>
  : <>{precursorText}<FontAwesomeIcon icon={faStar} />Success{pluralText}</>;
  
  return (
    <Keyword className="success">
      {finalText}
    </Keyword>
  );
}
