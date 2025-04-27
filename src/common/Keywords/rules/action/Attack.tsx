import Keyword from "../../Keyword";

type Props = {
  type?: string;
  plural?: boolean;
}
export default function Attack({ type, plural }: Props) {
  return (<Keyword className={"attack bold"+ (type ? ` ${type.toLowerCase()}` : '')}>
    {type ? `${type} `: null}Attack{plural ? 's' : ''}
  </Keyword>);
}