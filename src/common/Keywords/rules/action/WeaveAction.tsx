import Action from "./Action";

export default function WeaveAction({ plural = false }: { plural?: boolean }) {
  return (<Action type="Weave" plural={plural} />);
}