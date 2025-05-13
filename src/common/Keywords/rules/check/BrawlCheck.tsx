import Check from "./Check";

export default function BrawlCheck({ plural }: { plural?: boolean }) {
  return <Check type={"Brawl"} plural={plural} />
}
