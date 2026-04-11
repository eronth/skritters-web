import { Dice } from "../../../../types/types";
import Keyword from "../../Keyword";

type Props = {
  dice?: Dice;
  type?: string;
  plural?: boolean;
}

export default function Check({ type, plural, dice }: Props) {
  return (
    <Keyword className="check" bold italic>
      {dice ? <>{dice.toString()} </> : null}
      {type ? type+' ' : null}Check{plural ? 's' : ''}
    </Keyword>
  )
}
