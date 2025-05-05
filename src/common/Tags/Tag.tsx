import { Keyword } from "../../types/keywords";

type Props = {
  tag: Keyword;
  className?: string;
  style?: React.CSSProperties;
};


export default function Tag({ tag, className, style }: Props) {
  return (
    <span className={`tag ${tag.toLowerCase()} ${className || ''}`} style={style}>
      {tag}
    </span>
  );
}
