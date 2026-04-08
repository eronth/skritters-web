import Keyword from "../../Keyword";
import './Cloak.css'

export default function Cloak({ x }: { x?: number }) {
  return (
    <Keyword
      className="cloak"
    >
      {`Cloak ${ x ? ' '+x : ''}`}
    </Keyword>
  );
}