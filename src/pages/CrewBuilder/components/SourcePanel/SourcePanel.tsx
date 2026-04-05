import SkritterSourceList from './SkritterSourceList/SkritterSourceList';
import EquipmentSourceList from './EquipmentSourceList/EquipmentSourceList';
import './SourcePanel.css';

type Tab = 'skritters' | 'equipment';

type Props = {
  isOpen: boolean;
  activeTab: Tab;
  usedSkritterKeys: Set<string>;
  usedEquipmentKeys: Set<string>;
  allowDuplicateSkritters: boolean;
  allowDuplicateEquipment: boolean;
  onToggleOpen: () => void;
  onChangeTab: (tab: Tab) => void;
};

export default function SourcePanel({
  isOpen,
  activeTab,
  usedSkritterKeys,
  usedEquipmentKeys,
  allowDuplicateSkritters,
  allowDuplicateEquipment,
  onToggleOpen,
  onChangeTab,
}: Props) {
  return (
    <div className={`source-panel ${isOpen ? 'source-panel--open' : 'source-panel--closed'}`}>
      <button
        className="source-panel-toggle"
        onClick={onToggleOpen}
        title={isOpen ? 'Collapse source panel' : 'Expand source panel'}
      >
        <div className='icon'>▶</div>
      </button>
      <div className="source-panel-content">
        <div className="source-tabs">
          <button
            className={`source-tab ${activeTab === 'skritters' ? 'source-tab--active' : ''}`}
            onClick={() => onChangeTab('skritters')}
          >
            Skritters
          </button>
          <button
            className={`source-tab ${activeTab === 'equipment' ? 'source-tab--active' : ''}`}
            onClick={() => onChangeTab('equipment')}
          >
            Equipment
          </button>
        </div>
        <div className="source-panel-body">
          {activeTab === 'skritters' ? (
            <SkritterSourceList
              usedKeys={usedSkritterKeys}
              allowDuplicates={allowDuplicateSkritters}
            />
          ) : (
            <EquipmentSourceList
              usedKeys={usedEquipmentKeys}
              allowDuplicates={allowDuplicateEquipment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
