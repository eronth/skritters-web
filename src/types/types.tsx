import { ReactElement, ReactNode } from "react";
import { SkritterKeyword } from "./keywords";

type TabType = "home" | 'about' | 'how-to-play' 
| 'skritters' | 'equipment' | 'crew-builder' | 'campaign'
| 'scenarios';



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
  tags: SkritterKeyword[];
};

type EquipmentType = 'ranged' | 'brawl' | 'weave' 
  | 'garb';
type EquipmentSlotType = 'one-handed' | 'two-handed'
  | 'face' | 'head' | 'body'
  | 'back' | 'special' | 'grenade' | 'deployable';

type Equipment = {
  name: string;
  type: EquipmentType;
  slot: EquipmentSlotType;
  range?: number | [number, number];
  bonus: Modifiers;
  effect: ReactNode;
};

export type {
  Modifiers,
  Skritter,
  SkritterStatline,
  Equipment,
  TabType
};
