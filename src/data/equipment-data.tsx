import { Equipment } from "../types/types";
import rangedEquipment from "./equipment-packs/ranged-equipment-data";
import faceGarbEquipment from "./equipment-packs/face-garb-equipment-data";

const equipment: {
  [key: string]: Equipment;
} = {
  ...rangedEquipment,
  // Add other equipment packs here
  ...faceGarbEquipment,
}

export default equipment;
