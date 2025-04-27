import Keyword from "../../Keyword";

type Props = {
  type?: string;
  plural?: boolean;
}
export default function Action({ type, plural }: Props) {
  return (
    <Keyword className={`action bold ${type ? type.toLowerCase() : ''}`}>
      {type ? type+' ' : ''}Action{plural ? 's' : ''}
    </Keyword>
  );
}
