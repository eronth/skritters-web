import Keyword from "../../Keyword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons";

export default function PlusDice({ x }: { x: number }) {
  
  return (
    <Keyword className="plus-dice" >
      {`-${x}`}<FontAwesomeIcon icon={faDiceD6} />
    </Keyword>
  );
}