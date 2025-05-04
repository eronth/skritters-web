import Keyword from "../../Keyword";

export default function Success({ x, noVal }: { x?: number, noVal?: boolean }) {
  x = x || 0; // Default to 0 if x is undefined or null
  const precursorText = (
    noVal
    ? ''
    : ((x < 0) ? '-' : '+') + Math.abs(x || 1) + ' ' 
  )

return (
  <Keyword className="success">
    {precursorText}Success{Math.abs(x || 1) !== 1 ? 'es' : ''}
  </Keyword>
  );
}