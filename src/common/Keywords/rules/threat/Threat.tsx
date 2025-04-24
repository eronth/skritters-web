import Keyword from "../../Keyword";

export default function Threat({ type }: { type?: string }) {
  return (
    <Keyword
      className={`threat bold ${type ? type.toLowerCase() : ''}`}
    >
      {`${type ? ' ' + type : ''}Threat`}
    </Keyword>
  );
