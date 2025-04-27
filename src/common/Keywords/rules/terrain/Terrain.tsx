import Keyword from "../../Keyword";

type Props = {
  type?: string;
  x?: number;
  plural?: boolean;
}

export default function Terrain({ type, x, plural = false }: Props) {
  
  return (
    <Keyword className={`terrain ${type ? type.toLowerCase() : ""}`}>
      {x ? x+' ' : null}{type ? type+' ' : null}Landmark{((x != 1) || plural) ? "s" : ""}
    </Keyword>
  );
}