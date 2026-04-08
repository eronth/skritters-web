import { useState } from 'react';
import { PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import {
  CrewSlotData,
  DragData,
  DropCrewSlotData,
  DropEquipSlotData,
  DropFreeEquipData,
  DropSourceData,
} from './crewBuilderTypes';
import { newId } from './crewStorageUtils';

type SetCrewSlots = (updater: CrewSlotData[] | ((prev: CrewSlotData[]) => CrewSlotData[])) => void;

interface UseDragHandlersParams {
  crewSlots: CrewSlotData[];
  allowDuplicateSkritters: boolean;
  allowDuplicateEquipment: boolean;
  setCrewSlots: SetCrewSlots;
  handleRemoveSkritter: (slotId: string) => void;
  handleRemoveEquipment: (crewSlotId: string, equipSlotId: string) => void;
}

export function useDragHandlers({
  crewSlots,
  allowDuplicateSkritters,
  allowDuplicateEquipment,
  setCrewSlots,
  handleRemoveSkritter,
  handleRemoveEquipment,
}: UseDragHandlersParams) {
  const [activeDrag, setActiveDrag] = useState<DragData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveDrag(active.data.current as DragData);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveDrag(null);
    if (!over) return;

    const drag = active.data.current as DragData | undefined;
    const drop = over.data.current as
      | DropCrewSlotData
      | DropEquipSlotData
      | DropSourceData
      | DropFreeEquipData
      | undefined;
    if (!drag || !drop) return;

    if (drag.type === 'skritter') {
      if (drop.type === 'crew-slot') {
        const { slotId: targetSlotId } = drop as DropCrewSlotData;
        if (drag.fromCrewSlotId === targetSlotId) return;

        if (!allowDuplicateSkritters) {
          const alreadyUsed = crewSlots.some(
            s => s.skritterKey === drag.key && s.id !== drag.fromCrewSlotId
          );
          if (alreadyUsed) return;
        }

        setCrewSlots(prev => {
          const targetSlot = prev.find(s => s.id === targetSlotId);
          if (!targetSlot) return prev;
          return prev.map(s => {
            if (s.id === targetSlotId) {
              return { ...s, skritter: drag.skritter, skritterKey: drag.key, freeEquipmentSlots: [] };
            }
            if (drag.fromCrewSlotId && s.id === drag.fromCrewSlotId) {
              return { ...s, skritter: targetSlot.skritter, skritterKey: targetSlot.skritterKey, freeEquipmentSlots: [] };
            }
            return s;
          });
        });
      } else if (drop.type === 'skritter-source' && drag.fromCrewSlotId) {
        handleRemoveSkritter(drag.fromCrewSlotId);
      }
    } else if (drag.type === 'equipment') {
      if (drop.type === 'equip-slot') {
        const { crewSlotId: targetCrewSlotId, equipSlotId: targetEquipSlotId } =
          drop as DropEquipSlotData;
        if (drag.fromEquipSlotId === targetEquipSlotId) return;

        if (drag.personalOwnerSkritterKey !== undefined) {
          const targetCrewSlotForOwnerCheck = crewSlots.find(s => s.id === targetCrewSlotId);
          if (targetCrewSlotForOwnerCheck?.skritterKey !== drag.personalOwnerSkritterKey) return;
        }

        if (drag.isFreeEquip) return;

        if (!allowDuplicateEquipment && !drag.personalOwnerSkritterKey) {
          const alreadyUsed = crewSlots.some(s =>
            s.equipmentSlots.some(
              es => es.equipmentKey === drag.key && es.id !== drag.fromEquipSlotId
            )
          );
          if (alreadyUsed) return;
        }

        const targetCrewSlot = crewSlots.find(s => s.id === targetCrewSlotId);
        const targetEquipSlotIndex = targetCrewSlot?.equipmentSlots.findIndex(
          es => es.id === targetEquipSlotId
        ) ?? -1;

        const WEAPON_SLOT_TYPES = new Set(['one-handed', 'two-handed', 'onetwo-handed']);
        const TWO_HANDED_SLOT_TYPES = new Set(['two-handed', 'onetwo-handed']);
        const UNIQUE_GARB_SLOTS = new Set(['face', 'head', 'body', 'back', 'special']);

        const totalEquipSlots = targetCrewSlot?.equipmentSlots.length ?? 0;
        const isWeaponPair = Math.floor(targetEquipSlotIndex / 2) === 0;
        const pairMateIndex = targetEquipSlotIndex % 2 === 0
          ? targetEquipSlotIndex + 1
          : targetEquipSlotIndex - 1;
        const hasPairMate = pairMateIndex >= 0 && pairMateIndex < totalEquipSlots;
        const pairMate = hasPairMate ? targetCrewSlot?.equipmentSlots[pairMateIndex] : undefined;
        const isTwoHandedDrag = TWO_HANDED_SLOT_TYPES.has(drag.equipment.slot);

        if (isWeaponPair && !WEAPON_SLOT_TYPES.has(drag.equipment.slot)) return;
        if (isTwoHandedDrag && !hasPairMate) return;
        if (TWO_HANDED_SLOT_TYPES.has(pairMate?.equipment?.slot ?? '')) return;

        if (!isWeaponPair && UNIQUE_GARB_SLOTS.has(drag.equipment.slot)) {
          const excludedSlotId =
            drag.fromCrewSlotId === targetCrewSlotId ? drag.fromEquipSlotId : undefined;
          const alreadyHasType = targetCrewSlot?.equipmentSlots.some(
            (es, idx) =>
              Math.floor(idx / 2) !== 0 &&
              es.id !== targetEquipSlotId &&
              es.id !== excludedSlotId &&
              es.equipment?.slot === drag.equipment.slot
          );
          if (alreadyHasType) return;
        }

        setCrewSlots(prev => {
          const targetCrewSlot = prev.find(s => s.id === targetCrewSlotId);
          const targetEquipSlot = targetCrewSlot?.equipmentSlots.find(
            es => es.id === targetEquipSlotId
          );

          return prev.map(crewSlot => {
            let updated = crewSlot;

            if (crewSlot.id === targetCrewSlotId) {
              updated = {
                ...updated,
                equipmentSlots: updated.equipmentSlots.map((es, idx) => {
                  if (es.id === targetEquipSlotId) {
                    return { ...es, equipment: drag.equipment, equipmentKey: drag.key };
                  }
                  if (isTwoHandedDrag && pairMate && es.id === pairMate.id) {
                    return { ...es, equipment: null, equipmentKey: null };
                  }
                  if (
                    drag.fromEquipSlotId &&
                    es.id === drag.fromEquipSlotId &&
                    drag.fromCrewSlotId === targetCrewSlotId
                  ) {
                    const swappedItem = targetEquipSlot?.equipment ?? null;
                    if (Math.floor(idx / 2) === 0 && swappedItem && !WEAPON_SLOT_TYPES.has(swappedItem.slot)) {
                      return { ...es, equipment: null, equipmentKey: null };
                    }
                    return {
                      ...es,
                      equipment: swappedItem,
                      equipmentKey: targetEquipSlot?.equipmentKey ?? null,
                    };
                  }
                  return es;
                }),
              };
            }

            if (
              drag.fromCrewSlotId &&
              crewSlot.id === drag.fromCrewSlotId &&
              drag.fromCrewSlotId !== targetCrewSlotId
            ) {
              updated = {
                ...updated,
                equipmentSlots: updated.equipmentSlots.map((es, idx) => {
                  if (es.id === drag.fromEquipSlotId) {
                    const swappedItem = targetEquipSlot?.equipment ?? null;
                    if (Math.floor(idx / 2) === 0 && swappedItem && !WEAPON_SLOT_TYPES.has(swappedItem.slot)) {
                      return { ...es, equipment: null, equipmentKey: null };
                    }
                    return {
                      ...es,
                      equipment: swappedItem,
                      equipmentKey: targetEquipSlot?.equipmentKey ?? null,
                    };
                  }
                  return es;
                }),
              };
            }

            return updated;
          });
        });
      } else if (drop.type === 'free-equip') {
        const { crewSlotId: targetCrewSlotId } = drop as DropFreeEquipData;

        if (!drag.isFreeEquip) return;

        if (drag.personalOwnerSkritterKey !== undefined) {
          const targetCrewSlot = crewSlots.find(s => s.id === targetCrewSlotId);
          if (targetCrewSlot?.skritterKey !== drag.personalOwnerSkritterKey) return;
        }

        const alreadyPlaced = crewSlots
          .find(s => s.id === targetCrewSlotId)
          ?.freeEquipmentSlots.some(es => es.equipmentKey === drag.key);
        if (alreadyPlaced) return;

        setCrewSlots(prev => prev.map(crewSlot => {
          if (crewSlot.id !== targetCrewSlotId) return crewSlot;
          return {
            ...crewSlot,
            freeEquipmentSlots: [
              ...crewSlot.freeEquipmentSlots,
              { id: newId('free-equip-slot'), equipment: drag.equipment, equipmentKey: drag.key },
            ],
          };
        }));
      } else if (
        drop.type === 'equip-source' &&
        drag.fromCrewSlotId &&
        drag.fromEquipSlotId
      ) {
        handleRemoveEquipment(drag.fromCrewSlotId, drag.fromEquipSlotId);
      }
    }
  }

  return { activeDrag, sensors, handleDragStart, handleDragEnd };
}
