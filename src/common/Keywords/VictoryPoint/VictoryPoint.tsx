import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Keyword from "../Keyword";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import './VictoryPoint.css';

type Props = {
  x?: number;
  plural?: boolean;
};
export default function VictoryPoint({ x, plural }: Props) {

  if ((x ?? 1) !== 1) {
    plural = true;
  }

  return (
    <Keyword className='victory-point'>
      {x != null ? x+' ' : ''}
      <FontAwesomeIcon icon={faTrophy} />
      Victory Point{plural ? 's' : ''}
    </Keyword>
  )
}
