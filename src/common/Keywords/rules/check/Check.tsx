import Keyword from "../../Keyword";

type Props = {
  type?: string;
  plural?: boolean;
}

export default function Check({ type, plural }: Props) {
  return (
    <Keyword className="check" bold italic>
      {type ? type+' ' : null}Check{plural ? 's' : ''}
    </Keyword>
  )
}