import { Dice } from "../../../../types/types";
import Keyword from "../../Keyword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6 } from "@fortawesome/free-solid-svg-icons";

export default function PlusDice({ dice }: { dice?: Dice }) {
  
  return (
    <Keyword className="plus-dice">
      {dice ? `+${dice.count}d${dice.sides}`: null}<FontAwesomeIcon icon={faDiceD6} />
    </Keyword>
  );
}