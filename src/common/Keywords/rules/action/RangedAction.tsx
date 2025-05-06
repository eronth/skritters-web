import Action from "./Action";

export default function RangedAction({ plural = false }: { plural?: boolean }) {
  return (<Action type="Ranged" plural={plural} />);
}