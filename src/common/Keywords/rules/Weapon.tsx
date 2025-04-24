import Keyword from "../Keyword";

export default function Weapon({ weapon }: { weapon: string }) {
  return (
  <Keyword
    className="weapon"
    style={{ fontStyle: 'italic', color: '#555' }}
  >
    {weapon}
  </Keyword>
  );
}