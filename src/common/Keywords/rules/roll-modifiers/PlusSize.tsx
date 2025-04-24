import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Keyword from "../../Keyword";


export default function PlusSize({ x }: { x?: number }) {

  return (
    <Keyword className="minus-size">
      {'+'}{Math.abs(x || 1)} <FontAwesomeIcon icon={faAnglesUp} />
    </Keyword>
  );
}