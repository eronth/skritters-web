import { useDraggable, useDroppable } from '@dnd-kit/core';
import SkritterComponent from '../../../../../common/SkritterDisplay/SkritterComponent';
import EquipmentSlot from '../EquipmentSlot/EquipmentSlot';
import { CrewSlotData, DropCrewSlotData } from '../../crewBuilderTypes';
import './CrewSlot.css';

type Props = {
  slot: CrewSlotData;
  globalMaxEquipment: number;
  onRemoveSkritter: () => void;
  onRemoveEquipment: (equipSlotId: string) => void;
  onChangeMaxEquipment: (value: number | null) => void;
};

export default function CrewSlot({
  slot,
  globalMaxEquipment,
  onRemoveSkritter,
  onRemoveEquipment,
  onChangeMaxEquipment,
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

  const effectiveMax = slot.maxEquipmentOverride ?? globalMaxEquipment;

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
          <div className="crew-slot-controls">
            <div
              ref={setDragRef}
              {...attributes}
              {...listeners}
              className="drag-handle"
              title="Drag to remove"
            >
              ⠿
            </div>
            <button className="remove-btn" onClick={onRemoveSkritter} title="Remove Skritter">
              ✕
            </button>
          </div>

          <SkritterComponent skritter={slot.skritter} />

          <div className="equip-slots-section">
            <div className="equip-slots-header">
              <span className="equip-slots-label">Equipment</span>
              <label
                className="equip-max-label"
                title={
                  slot.maxEquipmentOverride !== null
                    ? 'Per-slot override active'
                    : 'Using global default'
                }
              >
                Max:{' '}
                <input
                  type="number"
                  className="equip-max-input"
                  min={0}
                  max={10}
                  value={effectiveMax}
                  onChange={e => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v >= 0) {
                      onChangeMaxEquipment(v === globalMaxEquipment ? null : v);
                    }
                  }}
                />
              </label>
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
