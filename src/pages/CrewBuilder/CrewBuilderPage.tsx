import { useState, useMemo, useEffect, useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import Page from '../Page';
import CrewPanel from './components/CrewPanel/CrewPanel';
import SourcePanel from './components/SourcePanel/SourcePanel';
import {
  CrewData,
  CrewSlotData,
  DragData,
  DropCrewSlotData,
  DropEquipSlotData,
  DropFreeEquipData,
  DropSourceData,
  EquipmentSlotData,
} from './components/crewBuilderTypes';
import {
  exportCrewsAsJson,
  importCrewsFromJson,
  loadCrewsFromLocalStorage,
  newId,
  saveCrewsToLocalStorage,
} from './components/crewStorageUtils';
import './CrewBuilderPage.css';

function makeEquipmentSlots(count: number): EquipmentSlotData[] {
  return Array.from({ length: count }, () => ({
    id: newId('equip-slot'),
    equipment: null,
    equipmentKey: null,
  }));
}

const DEFAULT_MAX_SLOTS = 4;
const DEFAULT_MAX_EQUIPMENT = 4;

function makeInitialCrewSlots(): CrewSlotData[] {
  return Array.from({ length: DEFAULT_MAX_SLOTS }, () => ({
    id: newId('crew-slot'),
    skritter: null,
    skritterKey: null,
    equipmentSlots: makeEquipmentSlots(DEFAULT_MAX_EQUIPMENT),
    freeEquipmentSlots: [],
    maxEquipmentOverride: null,
  }));
}

function makeNewCrew(existingCount: number): CrewData {
  return {
    id: newId('crew'),
    name: `Crew ${existingCount + 1}`,
    crewSlots: makeInitialCrewSlots(),
    maxSlots: DEFAULT_MAX_SLOTS,
    globalMaxEquipment: DEFAULT_MAX_EQUIPMENT,
    allowDuplicateSkritters: false,
    allowDuplicateEquipment: false,
  };
}

type CrewsState = {
  list: CrewData[];
  activeId: string;
};

export default function CrewBuilderPage() {
  const [crewsState, setCrewsState] = useState<CrewsState>(() => {
    const saved = loadCrewsFromLocalStorage();
    if (saved) return saved;
    const first = makeNewCrew(0);
    return { list: [first], activeId: first.id };
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourcePanelOpen, setSourcePanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'skritters' | 'equipment'>('skritters');
  const [activeDrag, setActiveDrag] = useState<DragData | null>(null);

  useEffect(() => {
    saveCrewsToLocalStorage(crewsState.list, crewsState.activeId);
  }, [crewsState]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeCrew = crewsState.list.find(c => c.id === crewsState.activeId)!;
  const { crewSlots, globalMaxEquipment, allowDuplicateSkritters, allowDuplicateEquipment } = activeCrew;

  function updateActiveCrew(updater: (crew: CrewData) => CrewData) {
    setCrewsState(prev => ({
      ...prev,
      list: prev.list.map(c => c.id === prev.activeId ? updater(c) : c),
    }));
  }

  function setCrewSlots(updater: CrewSlotData[] | ((prev: CrewSlotData[]) => CrewSlotData[])) {
    updateActiveCrew(c => ({
      ...c,
      crewSlots: typeof updater === 'function' ? updater(c.crewSlots) : updater,
    }));
  }

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
    updateActiveCrew(crew => {
      let newCrewSlots = crew.crewSlots;
      if (newMax > newCrewSlots.length) {
        const additional = Array.from({ length: newMax - newCrewSlots.length }, () => ({
          id: newId('crew-slot'),
          skritter: null,
          skritterKey: null,
          equipmentSlots: makeEquipmentSlots(crew.globalMaxEquipment),
          freeEquipmentSlots: [],
          maxEquipmentOverride: null,
        }));
        newCrewSlots = [...newCrewSlots, ...additional];
      } else {
        newCrewSlots = newCrewSlots.slice(0, newMax);
      }
      return { ...crew, maxSlots: newMax, crewSlots: newCrewSlots };
    });
  }

  function handleChangeGlobalMaxEquipment(newMax: number) {
    updateActiveCrew(crew => ({
      ...crew,
      globalMaxEquipment: newMax,
      crewSlots: crew.crewSlots.map(slot => {
        if (slot.maxEquipmentOverride !== null) return slot;
        return resizeEquipmentSlots(slot, newMax);
      }),
    }));
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
      prev.map(s => (s.id === slotId ? { ...s, skritter: null, skritterKey: null, freeEquipmentSlots: [] } : s))
    );
  }

  function handleRemoveUnusedEquipmentSlots(slotId: string) {
    setCrewSlots(prev =>
      prev.map(slot => {
        if (slot.id !== slotId) return slot;
        const filledSlots = slot.equipmentSlots.filter(es => es.equipment !== null);
        const newCount = filledSlots.length;
        return {
          ...slot,
          equipmentSlots: filledSlots,
          maxEquipmentOverride: newCount === globalMaxEquipment ? null : newCount,
        };
      })
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

  function handleRemoveFreeEquipment(crewSlotId: string, equipmentKey: string) {
    setCrewSlots(prev =>
      prev.map(s => {
        if (s.id !== crewSlotId) return s;
        return {
          ...s,
          freeEquipmentSlots: s.freeEquipmentSlots.filter(es => es.equipmentKey !== equipmentKey),
        };
      })
    );
  }

  // ── Crew management ──────────────────────────────────────────────────────

  function handleAddCrew() {
    setCrewsState(prev => {
      const crew = makeNewCrew(prev.list.length);
      return { list: [...prev.list, crew], activeId: crew.id };
    });
  }

  function handleSwitchCrew(crewId: string) {
    setCrewsState(prev => ({ ...prev, activeId: crewId }));
  }

  function handleRenameCrew(name: string) {
    updateActiveCrew(c => ({ ...c, name }));
  }

  // ── Import / Export ──────────────────────────────────────────────────────

  function handleExport() {
    exportCrewsAsJson(crewsState.list, crewsState.activeId);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const json = ev.target?.result as string;
      const result = importCrewsFromJson(json);
      if (result) {
        setCrewsState(result);
      } else {
        alert('Could not import: invalid or incompatible file.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
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
              // Swap: displaced skritter moves to source slot
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

        // Personal equipment may only go into its owner's crew slot
        if (drag.personalOwnerSkritterKey !== undefined) {
          const targetCrewSlotForOwnerCheck = crewSlots.find(s => s.id === targetCrewSlotId);
          if (targetCrewSlotForOwnerCheck?.skritterKey !== drag.personalOwnerSkritterKey) return;
        }

        // Free equipment belongs in the free-equip zone, not normal slots
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

        // Weapon pair (slots 0 & 1) only accepts weapons
        if (isWeaponPair && !WEAPON_SLOT_TYPES.has(drag.equipment.slot)) return;

        // Two-handed items require a pair mate (unpaired last slot can't hold them)
        if (isTwoHandedDrag && !hasPairMate) return;

        // Can't drop on a slot whose pair mate is already occupied by a two-handed item
        if (TWO_HANDED_SLOT_TYPES.has(pairMate?.equipment?.slot ?? '')) return;

        // No duplicate garb types across non-weapon slots
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
                  // Clear pair mate of target when placing a two-handed item
                  if (isTwoHandedDrag && pairMate && es.id === pairMate.id) {
                    return { ...es, equipment: null, equipmentKey: null };
                  }
                  // Swap within the same crew slot
                  if (
                    drag.fromEquipSlotId &&
                    es.id === drag.fromEquipSlotId &&
                    drag.fromCrewSlotId === targetCrewSlotId
                  ) {
                    const swappedItem = targetEquipSlot?.equipment ?? null;
                    // Don't swap a non-weapon back into the weapon pair
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

            // Cross-crew-slot: clear/swap source equip slot
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
                    // Don't swap a non-weapon back into the weapon pair
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

  return (
    <Page tab="crew-builder" className={`crew-builder-page${sourcePanelOpen ? ' crew-builder-page--source-open' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <p>
        To build your crew, select 4 Skritters to be members. Each member must
        be a different Skritter from others in your crew — no duplicates!
        Then, equip your Skritters with items of your choice; again no duplicates.
        Use the following rules to equip your Skritters:
      </p>
      <ul>
        <li>
          Your first equipped items can either be 2 one-handed items or 1 two-handed item.
          This acts as the items the Skritter is "holding".
        </li>
        <li>
          Beyond the held items, you can equip additional items in up to 2 extra slots.
          These can be any type of item, including more one-handed or two-handed items,
          but any additional -handed items are considered carried by the Skritter, but
          not held in their hands, and thus no benefits are conferred.
        </li>
        <li>
          You can't have more than one of the same garb type (face, head, body, back, special)
          accross these slots per Skritter.
        </li>
      </ul>
      <br /><hr /><br />
      <DndContext sensors={sensors} modifiers={[snapCenterToCursor]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="crew-builder-layout">
          <div className="crew-builder-left">
            <CrewPanel
              crewSlots={crewSlots}
              globalMaxEquipment={activeCrew.globalMaxEquipment}
              allowDuplicateSkritters={allowDuplicateSkritters}
              allowDuplicateEquipment={allowDuplicateEquipment}
              maxSlots={activeCrew.maxSlots}
              crews={crewsState.list.map(c => ({ id: c.id, name: c.name }))}
              activeCrewId={crewsState.activeId}
              crewName={activeCrew.name}
              onToggleDupSkritters={() => updateActiveCrew(c => ({ ...c, allowDuplicateSkritters: !c.allowDuplicateSkritters }))}
              onToggleDupEquipment={() => updateActiveCrew(c => ({ ...c, allowDuplicateEquipment: !c.allowDuplicateEquipment }))}
              onChangeMaxSlots={handleChangeMaxSlots}
              onChangeGlobalMaxEquipment={handleChangeGlobalMaxEquipment}
              onRemoveSkritter={handleRemoveSkritter}
              onRemoveEquipment={handleRemoveEquipment}
              onRemoveFreeEquipment={handleRemoveFreeEquipment}
              onChangeSlotMaxEquipment={handleChangeSlotMaxEquipment}
              onRemoveUnusedEquipmentSlots={handleRemoveUnusedEquipmentSlots}
              onAddCrew={handleAddCrew}
              onSwitchCrew={handleSwitchCrew}
              onRenameCrew={handleRenameCrew}
              onExport={handleExport}
              onImport={handleImportClick}
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
