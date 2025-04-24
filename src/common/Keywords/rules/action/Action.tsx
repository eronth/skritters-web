import Keyword from "../../Keyword";

export default function Action({ type }: { type?: string }) {
  return (
    <Keyword className={`action bold ${type ? type.toLowerCase() : ''}`}>
      {`${type ? type+'' : ''}Action`}
    </Keyword>
  );
}
