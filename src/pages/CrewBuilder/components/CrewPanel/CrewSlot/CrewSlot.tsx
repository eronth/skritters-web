import { useDraggable, useDroppable } from '@dnd-kit/core';
import SkritterCard from '../../../../../common/SkritterDisplay/SkritterCard';
import EquipmentSlot from '../EquipmentSlot/EquipmentSlot';
import { CrewSlotData, DropCrewSlotData } from '../../crewBuilderTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './CrewSlot.css';

type Props = {
  slot: CrewSlotData;
  globalMaxEquipment: number;
  onRemoveSkritter: () => void;
  onRemoveEquipment: (equipSlotId: string) => void;
  onChangeMaxEquipment: (value: number | null) => void;
  onRemoveUnusedEquipmentSlots: () => void;
};

export default function CrewSlot({
  slot,
  globalMaxEquipment,
  onRemoveSkritter,
  onRemoveEquipment,
  onChangeMaxEquipment,
  onRemoveUnusedEquipmentSlots,
}: Props) {
  const dropData: DropCrewSlotData = { type: 'crew-slot', slotId: slot.id };

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-crew-${slot.id}`,
    data: dropData,
  });

  const { attributes, listeners, setNodeRef: setDragRef, isDragging } = useDraggable({
    id: `drag-skritter-slot-${slot.id}`,
    data: {
      type: 'skritter' as const,
      key: slot.skritterKey ?? '',
      skritter: slot.skritter as NonNullable<typeof slot.skritter>, // safe: disabled when null
      fromCrewSlotId: slot.id,
    },
    disabled: !slot.skritter,
  });

  return (
    <div
      ref={setDropRef}
      className={[
        'crew-slot',
        slot.skritter ? 'crew-slot--filled' : 'crew-slot--empty',
        isOver ? 'crew-slot--over' : '',
        isDragging ? 'crew-slot--dragging' : '',
      ].filter(Boolean).join(' ')}
    >
      {slot.skritter ? (
        <div className="crew-slot-filled-content">

          <SkritterCard skritter={slot.skritter}
            draggable={true}
            onRemove={onRemoveSkritter}
            dragData={{
              setDragRef,
              attributes,
              listeners,
            }}
          />

          <div className="equip-slots-section">
            <div className="equip-slots-header">
              <span className="equip-slots-label">Equipment</span>
              <div className="equip-slots-actions">

                <button
                  type="button"
                  className="equip-slot-btn"
                  onClick={() => {
                    const newCount = slot.equipmentSlots.length + 1;
                    onChangeMaxEquipment(newCount === globalMaxEquipment ? null : newCount);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Equipment Slot
                </button>

                <button
                  type="button"
                  className="equip-slot-btn equip-slot-btn--remove"
                  onClick={onRemoveUnusedEquipmentSlots}
                  disabled={slot.equipmentSlots.every(es => es.equipment !== null)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                  Remove Unused Equipment Slots
                </button>
              </div>
            </div>
            <div className="equip-slots-list">
              {slot.equipmentSlots.map(es => (
                <EquipmentSlot
                  key={es.id}
                  crewSlotId={slot.id}
                  slot={es}
                  onRemove={() => onRemoveEquipment(es.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="crew-slot-empty-label">Drop a Skritter here</div>
      )}
    </div>
  );
}
