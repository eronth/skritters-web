import Keyword from "../../Keyword";

type Props = {
  type?: string;
  plural?: boolean;
}
export default function Action({ type, plural }: Props) {
  return (
    <Keyword className={`action ${type ? type.toLowerCase() : ''}`} bold>
      {type ? type+' ' : ''}Action{plural ? 's' : ''}
    </Keyword>
  );
}
