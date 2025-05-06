import Action from "./Action";

export default function BrawlAction({ plural = false }: { plural?: boolean }) {
  return (<Action type="Brawl" plural={plural} />);
}