import CrewSettings from './CrewSettings/CrewSettings';
import CrewSlot from './CrewSlot/CrewSlot';
import { CrewSlotData } from '../crewBuilderTypes';
import './CrewPanel.css';

type Props = {
  crewSlots: CrewSlotData[];
  globalMaxEquipment: number;
  allowDuplicateSkritters: boolean;
  allowDuplicateEquipment: boolean;
  maxSlots: number;
  crews: { id: string; name: string }[];
  activeCrewId: string;
  crewName: string;
  onToggleDupSkritters: () => void;
  onToggleDupEquipment: () => void;
  onChangeMaxSlots: (value: number) => void;
  onChangeGlobalMaxEquipment: (value: number) => void;
  onRemoveSkritter: (slotId: string) => void;
  onRemoveEquipment: (crewSlotId: string, equipSlotId: string) => void;
  onChangeSlotMaxEquipment: (slotId: string, value: number | null) => void;
  onRemoveUnusedEquipmentSlots: (slotId: string) => void;
  onRemoveFreeEquipment: (crewSlotId: string, equipmentKey: string) => void;
  onAddCrew: () => void;
  onSwitchCrew: (crewId: string) => void;
  onRenameCrew: (name: string) => void;
};

export default function CrewPanel({
  crewSlots,
  globalMaxEquipment,
  allowDuplicateSkritters,
  allowDuplicateEquipment,
  maxSlots,
  crews,
  activeCrewId,
  crewName,
  onToggleDupSkritters,
  onToggleDupEquipment,
  onChangeMaxSlots,
  onChangeGlobalMaxEquipment,
  onRemoveSkritter,
  onRemoveEquipment,
  onChangeSlotMaxEquipment,
  onRemoveUnusedEquipmentSlots,
  onRemoveFreeEquipment,
  onAddCrew,
  onSwitchCrew,
  onRenameCrew,
}: Props) {
  return (
    <div className="crew-panel">
      <div className="crew-management">
        <div className="crew-switcher">
          {crews.length > 1 && (
            <select
              className="crew-select"
              value={activeCrewId}
              onChange={e => onSwitchCrew(e.target.value)}
            >
              {crews.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          <button className="new-crew-btn" onClick={onAddCrew}>+ New Crew</button>
        </div>
        <input
          className="crew-name-input"
          value={crewName}
          onChange={e => onRenameCrew(e.target.value)}
          placeholder="Crew name…"
          aria-label="Crew name"
        />
      </div>
      <CrewSettings
        allowDuplicateSkritters={allowDuplicateSkritters}
        allowDuplicateEquipment={allowDuplicateEquipment}
        maxSlots={maxSlots}
        globalMaxEquipment={globalMaxEquipment}
        onToggleDupSkritters={onToggleDupSkritters}
        onToggleDupEquipment={onToggleDupEquipment}
        onChangeMaxSlots={onChangeMaxSlots}
        onChangeGlobalMaxEquipment={onChangeGlobalMaxEquipment}
      />
      <div className="crew-slots-list">
        {crewSlots.map(slot => (
          <CrewSlot
            key={slot.id}
            slot={slot}
            globalMaxEquipment={globalMaxEquipment}
            onRemoveSkritter={() => onRemoveSkritter(slot.id)}
            onRemoveEquipment={equipSlotId => onRemoveEquipment(slot.id, equipSlotId)}
            onChangeMaxEquipment={value => onChangeSlotMaxEquipment(slot.id, value)}
            onRemoveUnusedEquipmentSlots={() => onRemoveUnusedEquipmentSlots(slot.id)}
            onRemoveFreeEquipment={equipmentKey => onRemoveFreeEquipment(slot.id, equipmentKey)}
          />
        ))}
      </div>
    </div>
  );
}

