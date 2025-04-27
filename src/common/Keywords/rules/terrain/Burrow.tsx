import Terrain from "./Terrain";

type Props = {
  x?: number;
  plural?: boolean;
}

export default function Burrow({ x, plural = false }: Props) {
  return (
    <Terrain type="Burrow" x={x} plural={plural} />
  );
}