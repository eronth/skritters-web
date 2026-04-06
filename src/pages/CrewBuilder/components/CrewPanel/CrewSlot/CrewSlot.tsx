import { useDraggable, useDroppable } from '@dnd-kit/core';
import SkritterCard from '../../../../../common/SkritterDisplay/SkritterCard';
import EquipmentSlot from '../EquipmentSlot/EquipmentSlot';
import { CrewSlotData, DropCrewSlotData } from '../../crewBuilderTypes';
import type { PersonalEquipmentEntry } from '../../../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './CrewSlot.css';

const TWO_HANDED_SLOT_TYPES = new Set(['two-handed', 'onetwo-handed']);

function PersonalEquipChip({
  entry,
  crewSlotId,
  skritterKey,
  isPlaced,
}: {
  entry: PersonalEquipmentEntry;
  crewSlotId: string;
  skritterKey: string;
  isPlaced: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `drag-personal-equip-${crewSlotId}-${entry.key}`,
    data: {
      type: 'equipment' as const,
      key: entry.key,
      equipment: entry.equipment,
      personalOwnerSkritterKey: skritterKey,
      isFreeEquip: entry.free,
    },
    disabled: isPlaced,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={[
        'personal-equip-chip',
        isPlaced ? 'personal-equip-chip--placed' : '',
        isDragging ? 'personal-equip-chip--dragging' : '',
      ].filter(Boolean).join(' ')}
    >
      <span className="personal-equip-chip-name">{entry.equipment.name}</span>
      <span className="personal-equip-chip-hint">
        {isPlaced ? 'Equipped' : entry.free ? 'Free · Drag to free zone' : 'Drag to equip slot'}
      </span>
    </div>
  );
}

type Props = {
  slot: CrewSlotData;
  globalMaxEquipment: number;
  onRemoveSkritter: () => void;
  onRemoveEquipment: (equipSlotId: string) => void;
  onChangeMaxEquipment: (value: number | null) => void;
  onRemoveUnusedEquipmentSlots: () => void;
  onRemoveFreeEquipment: (equipmentKey: string) => void;
};

export default function CrewSlot({
  slot,
  globalMaxEquipment,
  onRemoveSkritter,
  onRemoveEquipment,
  onChangeMaxEquipment,
  onRemoveUnusedEquipmentSlots,
  onRemoveFreeEquipment,
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

  const optionalFreePersonalEquip = slot.skritter?.personalEquipment?.filter(e => e.free && !e.required) ?? [];
  const { setNodeRef: setFreeDropRef, isOver: isFreeOver } = useDroppable({
    id: `drop-free-equip-${slot.id}`,
    data: { type: 'free-equip' as const, crewSlotId: slot.id },
    disabled: optionalFreePersonalEquip.length === 0,
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

          {(slot?.skritter?.personalEquipment?.length ?? 0) > 0 && (
            <div className="personal-equip-section">
              <span className="personal-equip-section-label">Personal Equipment</span>

              {/* Chips for optional items — required items auto-show below */}
              <div className="personal-equip-chips">
                {slot.skritter.personalEquipment!
                  .filter(e => !e.required)
                  .map(entry => {
                    const isPlaced = entry.free
                      ? slot.freeEquipmentSlots.some(es => es.equipmentKey === entry.key)
                      : slot.equipmentSlots.some(es => es.equipmentKey === entry.key);
                    return (
                      <PersonalEquipChip
                        key={entry.key}
                        entry={entry}
                        crewSlotId={slot.id}
                        skritterKey={slot.skritterKey!}
                        isPlaced={isPlaced}
                      />
                    );
                  })}
              </div>

              {/* Free equipment zone: required+free always shown, optional+free when placed */}
              {slot.skritter.personalEquipment!.some(e => e.free) && (
                <div
                  ref={setFreeDropRef}
                  className={[
                    'free-equip-zone',
                    isFreeOver ? 'free-equip-zone--over' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {slot.skritter.personalEquipment!
                    .filter(e => e.required && e.free)
                    .map(entry => (
                      <div key={entry.key} className="free-equip-item free-equip-item--required">
                        <span className="free-equip-item-name">{entry.equipment.name}</span>
                        <span className="free-equip-item-badge">Always · Free</span>
                      </div>
                    ))}

                  {slot.freeEquipmentSlots.map(es => (
                    <div key={es.id} className="free-equip-item free-equip-item--optional">
                      <span className="free-equip-item-name">{es.equipment!.name}</span>
                      <button
                        type="button"
                        className="free-equip-item-remove"
                        onClick={() => onRemoveFreeEquipment(es.equipmentKey!)}
                        aria-label={`Remove ${es.equipment!.name}`}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  ))}

                  {optionalFreePersonalEquip.length > 0 && slot.freeEquipmentSlots.length === 0 && (
                    <div className="free-equip-zone-empty">Drag optional free equipment here</div>
                  )}
                </div>
              )}
            </div>
          )}

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

            {/* Equipment slots list */}
            <div className="equip-slots-list">
              {(() => {
                const eslots = slot.equipmentSlots;
                const pairs: [typeof eslots[0], typeof eslots[0] | null][] = [];
                for (let i = 0; i < eslots.length; i += 2) {
                  pairs.push([eslots[i], eslots[i + 1] ?? null]);
                }
                return pairs.map((pair, pairIndex) => {
                  const [slotA, slotB] = pair;
                  const isWeaponPair = pairIndex === 0;
                  const slotASpanning = TWO_HANDED_SLOT_TYPES.has(slotA.equipment?.slot ?? '');
                  const slotBSpanning = !!slotB && TWO_HANDED_SLOT_TYPES.has(slotB.equipment?.slot ?? '');
                  return (
                    <div key={slotA.id} className="equip-slot-pair">
                      {!slotBSpanning && (
                        <EquipmentSlot
                          crewSlotId={slot.id}
                          slot={slotA}
                          onRemove={() => onRemoveEquipment(slotA.id)}
                          isWeaponSlot={isWeaponPair}
                          isSpanning={slotASpanning}
                        />
                      )}
                      {slotB && !slotASpanning && (
                        <EquipmentSlot
                          crewSlotId={slot.id}
                          slot={slotB}
                          onRemove={() => onRemoveEquipment(slotB.id)}
                          isWeaponSlot={isWeaponPair}
                          isSpanning={slotBSpanning}
                        />
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      ) : (
        <div className="crew-slot-empty-label">Drop a Skritter here</div>
      )}
    </div>
  );
}
