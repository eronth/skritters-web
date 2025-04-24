import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import Keyword from "../../Keyword";

export default function Night() {
  const time = 'Night';

  return (
    <Keyword className={`daytime ${time.toLowerCase()}`}>
       {time}<FontAwesomeIcon icon={faMoon} />
    </Keyword>
  );
}