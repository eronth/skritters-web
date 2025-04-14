import { Link } from 'react-router-dom';
import { TabType } from '../types/types';
import './nav.css';


type Props = {
  selectedTab: TabType;
}

const NavTabs = ({selectedTab}: Props) => {
  
  function getClassForTab(tab: TabType) {
    const sel = 'selected-tab';
    const unsel = 'unselected-tab';
    return tab == selectedTab ? sel : unsel;
  }

  return (
    <nav className="navbar navtabs">
      <Link to="/about" className={getClassForTab('about')}>
        <div>About</div>
      </Link>
      <Link to="/how-to-play" className={getClassForTab('how-to-play')}>
        <div>How to Play</div>
      </Link>
      <Link to="/skritters" className={getClassForTab('skritters')}>
        <div>Skritters</div>
      </Link>
      <Link to="/equipment" className={getClassForTab('equipment')}>
        <div>Equipment</div>
      </Link>
      <Link to="/crew-builder" className={getClassForTab('crew-builder')}>
        <div>Crew Builder</div>
      </Link>
    </nav>
  );
}

export default NavTabs;