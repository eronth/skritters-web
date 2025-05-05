import Keyword from "../../Keyword";

export default function Success({ x, bonus, noVal }: { x?: number, bonus?: boolean, noVal?: boolean }) {
  x = x || 0; // Default to 0 if x is undefined or null
  const precursorText = (
    noVal
    ? ''
    : (bonus ? ((x < 0) ? '-' : '+') : '') + Math.abs(x || 0) + ' ' 
  )

return (
  <Keyword className="success">
    {precursorText}Success{Math.abs(x || 0) !== 1 ? 'es' : ''}
  </Keyword>
  );
}