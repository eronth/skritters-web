import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import Keyword from "../Keyword";

export default function Day() {
  const time = 'Daytime';

  return (
    <Keyword className={`time-of-day ${time.toLowerCase()}`}>
       {time} <FontAwesomeIcon icon={faSun} />
    </Keyword>
  );
}