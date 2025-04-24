type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Keyword({ className, style, children }: Props) {
  return (
    <span className={`keyword ${className || ''}`} style={style}>
      {children}
    </span>
  );
}
