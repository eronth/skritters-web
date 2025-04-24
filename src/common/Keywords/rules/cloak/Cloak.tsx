import Keyword from "../../Keyword";

export default function Cloak({ x }: { x?: number }) {
  return (
    <Keyword
      className="cloak"
      style={{ fontStyle: 'italic', color: '#555' }}
    >
      {`Cloak ${ x ? ' '+x : ''}`}
    </Keyword>
  );
}