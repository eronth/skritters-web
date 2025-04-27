import Terrain from "./Terrain";

type Props = {
  x?: number;
  plural?: boolean;
}

export default function Cover({ x, plural = false }: Props) {
  return (
    <Terrain type="Cover" x={x} plural={plural} />
  );
}