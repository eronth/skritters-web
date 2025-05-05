import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import Keyword from "../Keyword";

export default function Winter() {
  const season = 'Winter';

  return (
    <Keyword className={`season ${season.toLowerCase()}`}>
      <FontAwesomeIcon icon={faSnowflake} /> {season}
    </Keyword>
  );
}