import Attack from "./Attack";

type Props = {
  plural?: boolean;
};

export default function BrawlAttack({ plural }: Props) {
  return (<Attack type="Brawl" plural={plural} />);
}