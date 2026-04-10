import Check from "./Check";

export default function DefenseCheck({ plural }: { plural?: boolean }) {
  return <Check type={"Defense"} plural={plural} />
}
