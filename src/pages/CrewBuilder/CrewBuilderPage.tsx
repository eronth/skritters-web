import { useState, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Page from '../Page';
import CrewPanel from './components/CrewPanel/CrewPanel';
import SourcePanel from './components/SourcePanel/SourcePanel';
import {
  CrewSlotData,
  DragData,
  DropCrewSlotData,
  DropEquipSlotData,
  DropSourceData,
  EquipmentSlotData,
} from './components/crewBuilderTypes';
import './CrewBuilderPage.css';

let _idCounter = 0;
function newId(prefix: string) {
  return `${prefix}-${++_idCounter}`;
}

function makeEquipmentSlots(count: number): EquipmentSlotData[] {
  return Array.from({ length: count }, () => ({
    id: newId('equip-slot'),
    equipment: null,
    equipmentKey: null,
  }));
}

const DEFAULT_MAX_SLOTS = 4;
const DEFAULT_MAX_EQUIPMENT = 2;

function makeInitialCrewSlots(): CrewSlotData[] {
  return Array.from({ length: DEFAULT_MAX_SLOTS }, () => ({
    id: newId('crew-slot'),
    skritter: null,
    skritterKey: null,
    equipmentSlots: makeEquipmentSlots(DEFAULT_MAX_EQUIPMENT),
    maxEquipmentOverride: null,
  }));
}

export default function CrewBuilderPage() {
  const [crewSlots, setCrewSlots] = useState<CrewSlotData[]>(makeInitialCrewSlots);
  const [allowDuplicateSkritters, setAllowDuplicateSkritters] = useState(false);
  const [allowDuplicateEquipment, setAllowDuplicateEquipment] = useState(false);
  const [maxSlots, setMaxSlots] = useState(DEFAULT_MAX_SLOTS);
  const [globalMaxEquipment, setGlobalMaxEquipment] = useState(DEFAULT_MAX_EQUIPMENT);
  const [sourcePanelOpen, setSourcePanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'skritters' | 'equipment'>('skritters');
  const [activeDrag, setActiveDrag] = useState<DragData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const usedSkritterKeys = useMemo(
    () => new Set(crewSlots.map(s => s.skritterKey).filter((k): k is string => k !== null)),
    [crewSlots]
  );

  const usedEquipmentKeys = useMemo(
    () =>
      new Set(
        crewSlots
          .flatMap(s => s.equipmentSlots.map(es => es.equipmentKey))
          .filter((k): k is string => k !== null)
      ),
    [crewSlots]
  );

  // ── Slot management ──────────────────────────────────────────────────────

  function resizeEquipmentSlots(slot: CrewSlotData, newMax: number): CrewSlotData {
    const current = slot.equipmentSlots;
    if (newMax > current.length) {
      const additional = Array.from({ length: newMax - current.length }, () => ({
        id: newId('equip-slot'),
        equipment: null,
        equipmentKey: null,
      }));
      return { ...slot, equipmentSlots: [...current, ...additional] };
    }
    return { ...slot, equipmentSlots: current.slice(0, newMax) };
  }

  function handleChangeMaxSlots(newMax: number) {
    setMaxSlots(newMax);
    setCrewSlots(prev => {
      if (newMax > prev.length) {
        const additional = Array.from({ length: newMax - prev.length }, () => ({
          id: newId('crew-slot'),
          skritter: null,
          skritterKey: null,
          equipmentSlots: makeEquipmentSlots(globalMaxEquipment),
          maxEquipmentOverride: null,
        }));
        return [...prev, ...additional];
      }
      return prev.slice(0, newMax);
    });
  }

  function handleChangeGlobalMaxEquipment(newMax: number) {
    setGlobalMaxEquipment(newMax);
    setCrewSlots(prev =>
      prev.map(slot => {
        if (slot.maxEquipmentOverride !== null) return slot;
        return resizeEquipmentSlots(slot, newMax);
      })
    );
  }

  function handleChangeSlotMaxEquipment(slotId: string, value: number | null) {
    setCrewSlots(prev =>
      prev.map(slot => {
        if (slot.id !== slotId) return slot;
        const effectiveMax = value ?? globalMaxEquipment;
        return { ...resizeEquipmentSlots(slot, effectiveMax), maxEquipmentOverride: value };
      })
    );
  }

  function handleRemoveSkritter(slotId: string) {
    setCrewSlots(prev =>
      prev.map(s => (s.id === slotId ? { ...s, skritter: null, skritterKey: null } : s))
    );
  }

  function handleRemoveEquipment(crewSlotId: string, equipSlotId: string) {
    setCrewSlots(prev =>
      prev.map(s => {
        if (s.id !== crewSlotId) return s;
        return {
          ...s,
          equipmentSlots: s.equipmentSlots.map(es =>
            es.id === equipSlotId ? { ...es, equipment: null, equipmentKey: null } : es
          ),
        };
      })
    );
  }

  // ── Drag handlers ────────────────────────────────────────────────────────

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
              return { ...s, skritter: drag.skritter, skritterKey: drag.key };
            }
            if (drag.fromCrewSlotId && s.id === drag.fromCrewSlotId) {
              // Swap: displaced skritter moves to source slot
              return { ...s, skritter: targetSlot.skritter, skritterKey: targetSlot.skritterKey };
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

        if (!allowDuplicateEquipment) {
          const alreadyUsed = crewSlots.some(s =>
            s.equipmentSlots.some(
              es => es.equipmentKey === drag.key && es.id !== drag.fromEquipSlotId
            )
          );
          if (alreadyUsed) return;
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
                equipmentSlots: updated.equipmentSlots.map(es => {
                  if (es.id === targetEquipSlotId) {
                    return { ...es, equipment: drag.equipment, equipmentKey: drag.key };
                  }
                  // Swap within the same crew slot
                  if (
                    drag.fromEquipSlotId &&
                    es.id === drag.fromEquipSlotId &&
                    drag.fromCrewSlotId === targetCrewSlotId
                  ) {
                    return {
                      ...es,
                      equipment: targetEquipSlot?.equipment ?? null,
                      equipmentKey: targetEquipSlot?.equipmentKey ?? null,
                    };
                  }
                  return es;
                }),
              };
            }

            // Cross-crew-slot: clear/swap source equip slot
            if (
              drag.fromCrewSlotId &&
              crewSlot.id === drag.fromCrewSlotId &&
              drag.fromCrewSlotId !== targetCrewSlotId
            ) {
              updated = {
                ...updated,
                equipmentSlots: updated.equipmentSlots.map(es => {
                  if (es.id === drag.fromEquipSlotId) {
                    return {
                      ...es,
                      equipment: targetEquipSlot?.equipment ?? null,
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
      } else if (
        drop.type === 'equip-source' &&
        drag.fromCrewSlotId &&
        drag.fromEquipSlotId
      ) {
        handleRemoveEquipment(drag.fromCrewSlotId, drag.fromEquipSlotId);
      }
    }
  }

  return (
    <Page tab="crew-builder" className="crew-builder-page">
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={`crew-builder-layout${sourcePanelOpen ? ' crew-builder-layout--source-open' : ''}`}>
          <div className="crew-builder-left">
            <CrewPanel
              crewSlots={crewSlots}
              globalMaxEquipment={globalMaxEquipment}
              allowDuplicateSkritters={allowDuplicateSkritters}
              allowDuplicateEquipment={allowDuplicateEquipment}
              maxSlots={maxSlots}
              onToggleDupSkritters={() => setAllowDuplicateSkritters(p => !p)}
              onToggleDupEquipment={() => setAllowDuplicateEquipment(p => !p)}
              onChangeMaxSlots={handleChangeMaxSlots}
              onChangeGlobalMaxEquipment={handleChangeGlobalMaxEquipment}
              onRemoveSkritter={handleRemoveSkritter}
              onRemoveEquipment={handleRemoveEquipment}
              onChangeSlotMaxEquipment={handleChangeSlotMaxEquipment}
            />
          </div>
          <SourcePanel
            isOpen={sourcePanelOpen}
            activeTab={activeTab}
            usedSkritterKeys={usedSkritterKeys}
            usedEquipmentKeys={usedEquipmentKeys}
            allowDuplicateSkritters={allowDuplicateSkritters}
            allowDuplicateEquipment={allowDuplicateEquipment}
            onToggleOpen={() => setSourcePanelOpen(p => !p)}
            onChangeTab={setActiveTab}
          />
        </div>
        <DragOverlay>
          {activeDrag?.type === 'skritter' && (
            <div className="drag-overlay-card">{activeDrag.skritter.name}</div>
          )}
          {activeDrag?.type === 'equipment' && (
            <div className="drag-overlay-card">{activeDrag.equipment.name}</div>
          )}
        </DragOverlay>
      </DndContext>
    </Page>
  );
}
