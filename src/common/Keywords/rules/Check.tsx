import Keyword from "../Keyword";

type Props = {
  type?: string;
  plural?: boolean;
}

export default function Check({ type, plural }: Props) {
  return (
    <Keyword className="check">
      {type ? type+'' : null}Check{plural ? 's' : ''}
    </Keyword>
  )
}