import Keyword from "../Keyword";

type Props = {
  plural?: boolean
};
export default function Scuffle({ plural }: Props) {
  return (
    <Keyword className='scuffle' bold>
      Scuffle{plural ? "s" : ""}
    </Keyword>
  )
}
