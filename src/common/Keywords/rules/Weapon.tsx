import Keyword from "../Keyword";

export default function Weapon({ weapon }: { weapon: string }) {
  return (
  <Keyword
    keyword={weapon}
    className="weapon"
    style={{ fontStyle: 'italic', color: '#555' }} />
  );
}