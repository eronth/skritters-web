import { Skritter } from "../types/types";

type Props = {
  skritter: Skritter;
};

export default function SkritterComponent({ skritter }: Props) {
  return <div>
    SkritterComponent
    <div>{skritter.name}</div>
  </div>
}
