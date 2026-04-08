import { useState, useMemo, useEffect } from 'react';
import { CrewData, CrewSlotData, EquipmentSlotData } from './crewBuilderTypes';
import { loadCrewsFromLocalStorage, saveCrewsToLocalStorage, newId } from './crewStorageUtils';

// ── Constants & factories ─────────────────────────────────────────────────

const DEFAULT_MAX_SLOTS = 4;
const DEFAULT_MAX_EQUIPMENT = 4;

function makeEquipmentSlots(count: number): EquipmentSlotData[] {
  return Array.from({ length: count }, () => ({
    id: newId('equip-slot'),
    equipment: null,
    equipmentKey: null,
  }));
}

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

export function makeNewCrew(existingCount: number): CrewData {
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

// ── Hook ──────────────────────────────────────────────────────────────────

export type CrewsState = {
  list: CrewData[];
  activeId: string;
};

export function useCrewsState() {
  const [crewsState, setCrewsState] = useState<CrewsState>(() => {
    const saved = loadCrewsFromLocalStorage();
    if (saved) { return saved; }
    
    const first = makeNewCrew(0);
    return { list: [first], activeId: first.id };
  });

  useEffect(() => {
    saveCrewsToLocalStorage(crewsState.list, crewsState.activeId);
  }, [crewsState]);

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

  function importState(newState: { list: CrewData[]; activeId: string }) {
    setCrewsState(newState);
  }

  return {
    crewsState,
    activeCrew,
    crewSlots,
    globalMaxEquipment,
    allowDuplicateSkritters,
    allowDuplicateEquipment,
    usedSkritterKeys,
    usedEquipmentKeys,
    setCrewSlots,
    updateActiveCrew,
    handleChangeMaxSlots,
    handleChangeGlobalMaxEquipment,
    handleChangeSlotMaxEquipment,
    handleRemoveSkritter,
    handleRemoveUnusedEquipmentSlots,
    handleRemoveEquipment,
    handleRemoveFreeEquipment,
    handleAddCrew,
    handleSwitchCrew,
    handleRenameCrew,
    importState,
  };
}
