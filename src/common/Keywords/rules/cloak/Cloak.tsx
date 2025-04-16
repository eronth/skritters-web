import Keyword from "../../Keyword";

export default function Cloak({ x }: { x?: number }) {
  return (
    <Keyword
      keyword={`Cloak ${ x ? ' '+x : ''}`}
      className="cloak"
      style={{ fontStyle: 'italic', color: '#555' }}
      />
  );
}