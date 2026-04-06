import skritters from '../../../data/skritter-data';
import equipment from '../../../data/equipment-data';
import { Equipment, Skritter } from '../../../types/types';
import { CrewData, CrewSlotData, EquipmentSlotData } from './crewBuilderTypes';

// ── ID generator (shared counter across all CrewBuilder ID creation) ───────

let _idCounter = 0;
export function newId(prefix: string): string {
  return `${prefix}-${++_idCounter}`;
}

// ── Serialized types ──────────────────────────────────────────────────────

type SavedCrewSlot = {
  skritterKey: string | null;
  maxEquipmentOverride: number | null;
  /** Keys for indexed equipment slots (null = empty slot) */
  equipmentKeys: (string | null)[];
  /** Keys for free equipment slots */
  freeEquipmentKeys: string[];
};

type SavedCrew = {
  id: string;
  name: string;
  maxSlots: number;
  globalMaxEquipment: number;
  allowDuplicateSkritters: boolean;
  allowDuplicateEquipment: boolean;
  crewSlots: SavedCrewSlot[];
};

export type SavedCrewsState = {
  version: 1;
  list: SavedCrew[];
  activeId: string;
};

export const STORAGE_VERSION = 1 as const;
const STORAGE_KEY = 'skritters-web-crews-v1';

// ── Serialize ─────────────────────────────────────────────────────────────

export function serializeCrews(list: CrewData[], activeId: string): SavedCrewsState {
  return {
    version: STORAGE_VERSION,
    activeId,
    list: list.map(crew => ({
      id: crew.id,
      name: crew.name,
      maxSlots: crew.maxSlots,
      globalMaxEquipment: crew.globalMaxEquipment,
      allowDuplicateSkritters: crew.allowDuplicateSkritters,
      allowDuplicateEquipment: crew.allowDuplicateEquipment,
      crewSlots: crew.crewSlots.map(slot => ({
        skritterKey: slot.skritterKey,
        maxEquipmentOverride: slot.maxEquipmentOverride,
        equipmentKeys: slot.equipmentSlots.map(es => es.equipmentKey),
        freeEquipmentKeys: slot.freeEquipmentSlots
          .map(es => es.equipmentKey)
          .filter((k): k is string => k !== null),
      })),
    })),
  };
}

// ── Deserialize ───────────────────────────────────────────────────────────

function hydrateEquipSlot(key: string | null): EquipmentSlotData {
  const equip: Equipment | null = key
    ? ((equipment as Record<string, Equipment>)[key] ?? null)
    : null;
  return {
    id: newId('equip-slot'),
    equipment: equip,
    equipmentKey: equip ? key : null,
  };
}

export function deserializeCrews(
  saved: SavedCrewsState,
): { list: CrewData[]; activeId: string } | null {
  if (!saved || saved.version !== STORAGE_VERSION) return null;
  try {
    const list: CrewData[] = saved.list.map(savedCrew => {
      const crewSlots: CrewSlotData[] = savedCrew.crewSlots.map(savedSlot => {
        const skritterData: Skritter | null = savedSlot.skritterKey
          ? ((skritters as Record<string, Skritter>)[savedSlot.skritterKey] ?? null)
          : null;
        return {
          id: newId('crew-slot'),
          skritter: skritterData,
          skritterKey: skritterData ? savedSlot.skritterKey : null,
          maxEquipmentOverride: savedSlot.maxEquipmentOverride,
          equipmentSlots: savedSlot.equipmentKeys.map(hydrateEquipSlot),
          freeEquipmentSlots: savedSlot.freeEquipmentKeys
            .map(hydrateEquipSlot)
            .filter(es => es.equipment !== null),
        };
      });

      return {
        id: savedCrew.id,
        name: savedCrew.name,
        maxSlots: savedCrew.maxSlots,
        globalMaxEquipment: savedCrew.globalMaxEquipment,
        allowDuplicateSkritters: savedCrew.allowDuplicateSkritters,
        allowDuplicateEquipment: savedCrew.allowDuplicateEquipment,
        crewSlots,
      };
    });

    const activeId = list.some(c => c.id === saved.activeId)
      ? saved.activeId
      : (list[0]?.id ?? '');

    return { list, activeId };
  } catch {
    return null;
  }
}

// ── localStorage ──────────────────────────────────────────────────────────

export function saveCrewsToLocalStorage(list: CrewData[], activeId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeCrews(list, activeId)));
  } catch {
    // Ignore errors (e.g. quota exceeded, private browsing)
  }
}

export function loadCrewsFromLocalStorage(): { list: CrewData[]; activeId: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return deserializeCrews(JSON.parse(raw) as SavedCrewsState);
  } catch {
    return null;
  }
}

// ── Export ────────────────────────────────────────────────────────────────

export function exportCrewsAsJson(list: CrewData[], activeId: string): void {
  const data = serializeCrews(list, activeId);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'skritters-crews.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Import ────────────────────────────────────────────────────────────────

export function importCrewsFromJson(
  json: string,
): { list: CrewData[]; activeId: string } | null {
  try {
    return deserializeCrews(JSON.parse(json) as SavedCrewsState);
  } catch {
    return null;
  }
}
