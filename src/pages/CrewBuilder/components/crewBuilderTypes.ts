import { Equipment, Skritter } from '../../../types/types';

export type CrewData = {
  id: string;
  name: string;
  crewSlots: CrewSlotData[];
  maxSlots: number;
  globalMaxEquipment: number;
  allowDuplicateSkritters: boolean;
  allowDuplicateEquipment: boolean;
};

export type EquipmentSlotData = {
  id: string;
  equipment: Equipment | null;
  equipmentKey: string | null;
};

export type CrewSlotData = {
  id: string;
  skritter: Skritter | null;
  skritterKey: string | null;
  equipmentSlots: EquipmentSlotData[];
  maxEquipmentOverride: number | null; // null = use global default
};

export type DragSkritterData = {
  type: 'skritter';
  key: string;
  skritter: Skritter;
  fromCrewSlotId?: string;
};

export type DragEquipmentData = {
  type: 'equipment';
  key: string;
  equipment: Equipment;
  fromEquipSlotId?: string;
  fromCrewSlotId?: string;
};

export type DragData = DragSkritterData | DragEquipmentData;

export type DropCrewSlotData = { type: 'crew-slot'; slotId: string };
export type DropEquipSlotData = { type: 'equip-slot'; crewSlotId: string; equipSlotId: string };
export type DropSourceData = { type: 'skritter-source' | 'equip-source' };
export type DropData = DropCrewSlotData | DropEquipSlotData | DropSourceData;
