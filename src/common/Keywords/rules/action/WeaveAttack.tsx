import Attack from "./Attack";

type Props = {
  plural?: boolean;
};

export default function WeaveAttack({ plural }: Props) {
  return (<Attack type="Weave" plural={plural}/>);
}