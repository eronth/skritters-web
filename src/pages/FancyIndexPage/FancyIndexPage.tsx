import GameTitle from "../../common/GameTitle";
import NavCluster from "../../common/NavCluster";
import './FancyIndexPage.css';

export default function FancyIndexPage() {
  return (<div className='fancy-index'>
    <GameTitle isIndex={true} />
    <div className='content-area'>
      <div className='left-side'>
        <NavCluster />
      </div>
      <div className='right-side'>
        <p>
          Short description or introduction about the Skritters game.
          Short description or introduction about the Skritters game.
        </p>
      </div>
    </div>
  </div>);
}
