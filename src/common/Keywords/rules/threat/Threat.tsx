import Keyword from "../../Keyword";

export default function Threat({ type }: { type?: string }) {
  return (
    <Keyword
      keyword={`${type ? ' ' + type : ''}Threat`}
      className={`threat bold ${type ? type.toLowerCase() : ''}`}
      />
  );
}