import Check from "./Check";

export default function RangedCheck({ plural }: { plural?: boolean }) {
  return <Check type={"Ranged"} plural={plural} />
}
