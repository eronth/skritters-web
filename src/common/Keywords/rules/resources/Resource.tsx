import Keyword from "../../Keyword";

type Props = {
  resource: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function Resource({ resource, className, style }: Props) {
  //Capitalize first letter of resource
  resource = resource.charAt(0).toUpperCase() + resource.slice(1);
  return (
    <Keyword
      className={`resource italics ${className || ''}`}
      style={style}
    >
      {resource}
    </Keyword>
  );
}