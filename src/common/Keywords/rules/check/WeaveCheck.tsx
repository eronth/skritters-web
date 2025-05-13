import Check from "./Check";

export default function WeaveCheck({ plural }: { plural?: boolean }) {
  return <Check type={"Weave"} plural={plural} />
}
