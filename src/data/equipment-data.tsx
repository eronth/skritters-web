import { Equipment } from "../types/types";
import rangedEquipment from "./equipment-packs/weapon-packs/ranged-equipment-data";
import brawlEquipment from "./equipment-packs/weapon-packs/brawl-equipment-data";
import weaveEquipment from "./equipment-packs/weapon-packs/weave-equipment-data";
import faceGarbEquipment from "./equipment-packs/face-garb-equipment-data";
import headGarbEquipment from "./equipment-packs/head-garb-equipment-data";
import bodyGarbEquipment from "./equipment-packs/body-garb-equipment-data";
import backGarbEquipment from "./equipment-packs/back-garb-equipment-data";
import heldGarbEquipment from "./equipment-packs/held-garb-equipment-data";

const equipment: {
  [key: string]: Equipment;
} = {
  ...rangedEquipment,
  ...brawlEquipment,
  ...weaveEquipment,
  // Add other equipment packs here
  ...faceGarbEquipment,
  ...headGarbEquipment,
  ...bodyGarbEquipment,
  ...backGarbEquipment,
  ...heldGarbEquipment,
};

export default equipment;
