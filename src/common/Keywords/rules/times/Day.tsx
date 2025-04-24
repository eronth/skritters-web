import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import Keyword from "../../Keyword";

export default function Day() {
  const time = 'Day';

  return (
    <Keyword className={`daytime ${time.toLowerCase()}`}>
       {time}<FontAwesomeIcon icon={faSun} />
    </Keyword>
  );
}