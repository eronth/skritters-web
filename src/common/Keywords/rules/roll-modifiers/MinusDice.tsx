import Keyword from "../../Keyword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons";

export default function MinusDice({ x }: { x: number }) {
  
  return (
    <Keyword className="minus-dice" >
      {`-${x}`}<FontAwesomeIcon icon={faDiceD6} />
    </Keyword>
  );
}