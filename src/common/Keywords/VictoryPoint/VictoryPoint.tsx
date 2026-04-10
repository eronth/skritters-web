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
    <>
      <svg style={{position:'absolute',width:0,height:0,overflow:'hidden'}} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="vp-rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb3ba"/>
            <stop offset="10%" stopColor="#ffdfba"/>
            <stop offset="20%" stopColor="#ffffba"/>
            <stop offset="60%" stopColor="#baffc9"/>
            <stop offset="80%" stopColor="#bae1ff"/>
            <stop offset="100%" stopColor="#d4baff"/>
          </linearGradient>
        </defs>
      </svg>
      <Keyword className='victory-point'>
        {x != null
          ? 
          <span className="count">{x} </span>
          : null
        }
        <FontAwesomeIcon icon={faTrophy} />
        <span className="victory-text">Victory Point{plural ? 's' : ''}</span>
      </Keyword>
    </>
  )
}
