import Keyword from "../../Keyword";

export default function Success({ x, bonus, plural }: { 
  x?: number,
  bonus?: boolean,
  plural?: boolean
}) {
  x = x || 0; // Default to 0 if x is undefined or null
  const precursorText = (
    x
    ? (bonus ? ((x < 0) ? '-' : '+') : '') + Math.abs(x || 0) + ' ' 
    : ''
  )

  const pluralText = (
    plural || (Math.abs(x) > 1)
    ? 'es'
    : ''
  )

return (
  <Keyword className="success">
    {precursorText}Success{pluralText}
  </Keyword>
  );
}