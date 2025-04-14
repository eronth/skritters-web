import GameTitle from "../common/GameTitle";
import NavCluster from "../common/NavCluster";


export default function FancyIndexPage() {
  return (<div className='fancy-index'>
    <GameTitle isIndex={true} />
    <NavCluster />
  </div>);
}