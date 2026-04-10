import Keyword from "../../Keyword";
import './Cloak.css'

type Props = {
  x?: number;
  placeholder?: never;
} | {
  x?: never;
  placeholder: boolean;
};

export default function Cloak({ x, placeholder }: Props) {
  return (
    <Keyword
      className="cloak"
    >
      {`Cloak ${ placeholder ? 'X' : (x ? ' '+x : '')}`}
    </Keyword>
  );
}