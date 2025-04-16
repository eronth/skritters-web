type Props = {
  keyword: string; 
  className?: string; 
  style?: React.CSSProperties;
}

export default function Keyword({ keyword, className, style }: Props) {
  return (
    <span className={`keyword ${keyword} ${className || ''}`} style={style}>
      {keyword}
    </span>
  );
}
