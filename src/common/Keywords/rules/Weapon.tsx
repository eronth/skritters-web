import Keyword from "../Keyword";

export default function Weapon({ children }: { children: string }) {
  return (
  <Keyword
    className="weapon"
    style={{ fontStyle: 'italic', color: '#555' }}
  >
    {children}
  </Keyword>
  );
}