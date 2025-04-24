import Keyword from "../../Keyword";

export default function Successes({ x }: { x?: number }) {
  x = x || 0; // Default to 0 if x is undefined or null

return (
  <Keyword className="successes">
    {(x < 0) ? '-' : '+'}{Math.abs(x || 1)} Success{Math.abs(x || 1) !== 1 ? 'es' : ''}
  </Keyword>
  );
}