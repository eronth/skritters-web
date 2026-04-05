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
  onToggleDupSkritters: () => void;
  onToggleDupEquipment: () => void;
  onChangeMaxSlots: (value: number) => void;
  onChangeGlobalMaxEquipment: (value: number) => void;
  onRemoveSkritter: (slotId: string) => void;
  onRemoveEquipment: (crewSlotId: string, equipSlotId: string) => void;
  onChangeSlotMaxEquipment: (slotId: string, value: number | null) => void;
  onRemoveUnusedEquipmentSlots: (slotId: string) => void;
};

export default function CrewPanel({
  crewSlots,
  globalMaxEquipment,
  allowDuplicateSkritters,
  allowDuplicateEquipment,
  maxSlots,
  onToggleDupSkritters,
  onToggleDupEquipment,
  onChangeMaxSlots,
  onChangeGlobalMaxEquipment,
  onRemoveSkritter,
  onRemoveEquipment,
  onChangeSlotMaxEquipment,
  onRemoveUnusedEquipmentSlots,
}: Props) {
  return (
    <div className="crew-panel">
      <h2 className="crew-panel-title">Crew</h2>
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
          />
        ))}
      </div>
    </div>
  );
}
