import { useDraggable, useDroppable } from '@dnd-kit/core';
import EquipmentCard from '../../../../Equipment/EquipmentCard';
import { DropEquipSlotData, EquipmentSlotData } from '../../crewBuilderTypes';
import './EquipmentSlot.css';

type Props = {
  crewSlotId: string;
  slot: EquipmentSlotData;
  onRemove: () => void;
};

export default function EquipmentSlot({ crewSlotId, slot, onRemove }: Props) {
  const dropData: DropEquipSlotData = {
    type: 'equip-slot',
    crewSlotId,
    equipSlotId: slot.id,
  };

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-equip-${slot.id}`,
    data: dropData,
  });

  const { attributes, listeners, setNodeRef: setDragRef, isDragging } = useDraggable({
    id: `drag-equip-slot-${slot.id}`,
    data: {
      type: 'equipment' as const,
      key: slot.equipmentKey ?? '',
      equipment: slot.equipment as NonNullable<typeof slot.equipment>, // safe: disabled when null
      fromEquipSlotId: slot.id,
      fromCrewSlotId: crewSlotId,
    },
    disabled: !slot.equipment,
  });

  return (
    <div
      ref={setDropRef}
      className={[
        'equip-slot',
        slot.equipment ? 'equip-slot--filled' : 'equip-slot--empty',
        isOver ? 'equip-slot--over' : '',
        isDragging ? 'equip-slot--dragging' : '',
      ].filter(Boolean).join(' ')}
    >
      {slot.equipment ? (
        <>
          <div className="equip-slot-controls">
            <div
              ref={setDragRef}
              {...attributes}
              {...listeners}
              className="drag-handle"
              title="Drag to remove"
            >
              ⠿
            </div>
            <button className="remove-btn" onClick={onRemove} title="Remove equipment">
              ✕
            </button>
          </div>
          <EquipmentCard item={slot.equipment} />
        </>
      ) : (
        <div className="equip-slot-empty-label">Drop equipment here</div>
      )}
    </div>
  );
}
