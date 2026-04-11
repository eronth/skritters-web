import { ReactElement, ReactNode } from "react";
import { ItemKeyword, SkritterKeyword } from "./keywords";

type TabType = "home" | 'about' | 'how-to-play' 
| 'skritters' | 'equipment' | 'crew-builder' | 'campaign'
| 'scenarios';

export const EQUIPMENT_TYPES = {
  ranged: 'ranged',
  brawl: 'brawl',
  weave: 'weave',
  garb: 'garb',
} as const;
type EquipmentType = typeof EQUIPMENT_TYPES[keyof typeof EQUIPMENT_TYPES];

export const EQUIPMENT_SLOTS = {
  'one-handed': 'one-handed',
  'two-handed': 'two-handed',
  'onetwo-handed': 'onetwo-handed',
  face: 'face',
  head: 'head',
  body: 'body',
  back: 'back',
  special: 'special',
  grenade: 'grenade',
  deployable: 'deployable'
} as const;
type EquipmentSlotType = typeof EQUIPMENT_SLOTS[keyof typeof EQUIPMENT_SLOTS];



export class Dice {
  sides: number;
  count: number;

  // Two different constructors, one for string xdy format,
  // and one for two numbers.
  constructor(count: number, sides: number);
  constructor(dice: string);
  constructor(countOrDice: number | string, sides?: number) {
    if (typeof countOrDice === 'string') {
      const [count, sides] = countOrDice.split('d').map(Number);
      this.count = count ? count : 1;
      this.sides = sides;
    } else {
      this.count = countOrDice ? countOrDice : 1;
      this.sides = sides!;
    }
  }

  // override to string
  toString() {
    return `${this.count}d${this.sides}`;
  }
}

type Modifiers = {
  nilout?: boolean;
  dice?: Dice[];
  removeDice?: number[];
  successes?: number[];
  size?: number[];
}

type SkritterStatline = {
  movement: number;
  // Each stat is any combo of modifiers;
  ranged: Modifiers;
  brawl: Modifiers;
  weave: Modifiers;
  defense: Modifiers;
  health: number;
  size: 'Small' | 'Medium' | 'Large';
}


type PersonalEquipmentEntry = {
  key: string;
  equipment: Equipment;
  required: boolean;
  free: boolean;
};

type Skritter = {
  name: string;
  description: string;
  stats: SkritterStatline;
  abilities: {
    name: string;
    effect: ReactNode;
  }[];
  retirement: ReactElement[];
  sageWisdom?: {
    type: string;
    effect: ReactElement;
  }
  personalEquipment?: PersonalEquipmentEntry[];
  tags: SkritterKeyword[];
};

type Equipment = {
  name: string;
  type: EquipmentType;
  slot: EquipmentSlotType;
  range?: number | [number, number];
  bonus?: Modifiers;
  requires?: ReactNode;
  effect: ReactNode;
  tags?: ItemKeyword[];
};

type Filter = {
  name: string;
  allOptions: string[];
  selectedOptions: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedOptions: React.Dispatch<React.SetStateAction<any[]>>;
};

export type ScenarioCategory = 'neutral' | 'assault&guard' | 'faceoff';
type Scenario = {
  name: string;
  type: ScenarioCategory;
  setup: ReactNode;
  deployment: ReactNode;
  endConditions: ReactNode;
  scoring: ReactNode;
  extraRules: ReactNode;
};

export type {
  Modifiers,
  Skritter,
  SkritterStatline,
  Equipment,
  PersonalEquipmentEntry,
  EquipmentType,
  EquipmentSlotType,
  TabType,
  Filter,
  Scenario,
};
