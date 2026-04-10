import Keyword from "../../Keyword";
import './Cloak.css'

type Props = {
  x?: number;
  placeholder?: never;
  ed?: boolean;
} | {
  x?: never;
  placeholder: boolean;
  ed?: boolean;
};

export default function Cloak({ x, placeholder, ed }: Props) {
  return (
    <Keyword
      className="cloak"
    >
      {`Cloak${ed ? 'ed' : ''} ${ placeholder ? 'X' : (x ? ' '+x : '')}`}
    </Keyword>
  );
}