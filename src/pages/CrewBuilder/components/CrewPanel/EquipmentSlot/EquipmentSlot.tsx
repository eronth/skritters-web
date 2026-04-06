import { useDraggable, useDroppable } from '@dnd-kit/core';
import EquipmentCard from '../../../../Equipment/EquipmentCard';
import { DropEquipSlotData, EquipmentSlotData } from '../../crewBuilderTypes';
import './EquipmentSlot.css';

type Props = {
  crewSlotId: string;
  slot: EquipmentSlotData;
  onRemove: () => void;
  isWeaponSlot?: boolean;
  isSpanning?: boolean;
};

export default function EquipmentSlot({ crewSlotId, slot, onRemove, isWeaponSlot, isSpanning }: Props) {
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
        isWeaponSlot ? 'equip-slot--weapon' : '',
        isSpanning ? 'equip-slot--spanning' : '',
      ].filter(Boolean).join(' ')}
    >
      {slot.equipment ? (
        <EquipmentCard
          item={slot.equipment}
          onRemove={onRemove}
          draggable={true}
          dragData={{
            setDragRef,
            attributes,
            listeners,
          }}
        />
      ) : (
        <div className="equip-slot-empty-label">
          {isWeaponSlot ? 'Held Equipment Only' : 'Drop equipment here'}
        </div>
      )}
    </div>
  );
}
