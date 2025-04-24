import MinusSize from "./MinusSize";
import PlusSize from "./PlusSize";


export default function Size({ x }: { x: number }) {
  
  return (<>
    {
      (x < 0)
      ? <MinusSize x={Math.abs(x || 1)} />
      : <PlusSize x={Math.abs(x || 1)} />
    }
  </>);
}