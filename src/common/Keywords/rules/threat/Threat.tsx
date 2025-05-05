import Keyword from "../../Keyword";

export default function Threat({ type }: { type?: string }) {
  return (
    <Keyword
      className={`threat ${type ? type.toLowerCase() : ''}`}
      bold
    >
      {`${type ? ' ' + type : ''}Threat`}
    </Keyword>
  );
}