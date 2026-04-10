import { Equipment } from "../../types/types";

export type EquipmentFragment = Omit<Equipment, 'name' | 'effect' | 'requires'>;
