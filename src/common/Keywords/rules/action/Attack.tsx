import Keyword from "../../Keyword";

type Props = {
  type?: string;
  plural?: boolean;
}
export default function Attack({ type, plural }: Props) {
  return (<Keyword className={"attack"+ (type ? ` ${type.toLowerCase()}` : '')} bold>
    {type ? `${type} `: null}Attack{plural ? 's' : ''}
  </Keyword>);
}