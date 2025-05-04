import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Keyword from "../../Keyword";


export default function PlusSize({ x, noVal }: { x?: number, noVal?: boolean }) {

  return (
    <Keyword className="plus-size">
      {noVal ? '' : '+'+Math.abs(x || 1)}<FontAwesomeIcon icon={faAnglesUp} />
    </Keyword>
  );
}