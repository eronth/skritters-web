import Attack from "./Attack";

type Props = {
  plural?: boolean;
};

export default function RangedAttack({ plural }: Props) {
  return (<Attack type="Ranged" plural={plural} />);
}