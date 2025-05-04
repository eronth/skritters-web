import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Keyword from "../../Keyword";


export default function MinusSize({ x, noVal }: { x?: number, noVal?: boolean }) {

  return (
    <Keyword className="minus-size">
      {noVal ? '' : '-'+Math.abs(x || 1)}<FontAwesomeIcon icon={faAnglesDown} />
    </Keyword>
  );
}