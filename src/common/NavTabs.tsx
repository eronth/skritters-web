import { Link } from 'react-router-dom';
import { TabType } from '../types/types';
import './nav.css';


type Props = {
  selectedTab: TabType;
  isOpen: boolean;
  onClose: () => void;
}

const NavTabs = ({selectedTab, isOpen, onClose}: Props) => {
  
  function getClassForTab(tab: TabType) {
    const sel = 'selected-tab';
    const unsel = 'unselected-tab';
    return tab == selectedTab ? sel : unsel;
  }

  return (
    <nav className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
      <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">✕</button>
      <Link to="/about" className={getClassForTab('about')} onClick={onClose}>
        <div>About</div>
      </Link>
      <Link to="/how-to-play" className={getClassForTab('how-to-play')} onClick={onClose}>
        <div>How to Play</div>
      </Link>
      <Link to="/skritters" className={getClassForTab('skritters')} onClick={onClose}>
        <div>Skritters</div>
      </Link>
      <Link to="/equipment" className={getClassForTab('equipment')} onClick={onClose}>
        <div>Equipment</div>
      </Link>
      <Link to="/scenarios" className={getClassForTab('scenarios')} onClick={onClose}>
        <div>Scenarios</div>
      </Link>
      <Link to="/campaign" className={getClassForTab('campaign')} onClick={onClose}>
        <div>Campaign</div>
      </Link>
      <Link to="/crew-builder" className={getClassForTab('crew-builder')} onClick={onClose}>
        <div>Crew Builder</div>
      </Link>
    </nav>
  );
}

export default NavTabs;