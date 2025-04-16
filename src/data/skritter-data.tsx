import Hardy from "../common/Keywords/rules/resources/Hardy";
import Vigor from "../common/Keywords/rules/resources/Vigor";
import Scuffle from "../common/Keywords/rules/Scuffle";
import Weapon from "../common/Keywords/rules/Weapon";
import ItemTag from "../common/Tags/ItemTag";
import Tag from "../common/Tags/Tag";
import { Dice, Skritter } from "../types/types"


const porcupine: Skritter = {
  name: "Porcupine",
  description: "A porcupine",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('3d4')] },
    weave: { dice: [new Dice('1d6')] },
    defense: { dice: [new Dice('1d6')] },
    health: 5,
    size: "Medium",
  },
  abilities: [
    {
      name: "Quills",
      effect: <>When attacked in a <Scuffle />, you automatically hit your attacker
        for the same number of hits, up to 3.</>
    }
  ],
  retirement: [<>
    When Porcupine first retires, it can grant a member of your crew 
    1 <Weapon weapon="Needle Blade" />.
    While retired, Porcupine grants 1 <Vigor /> resource at the start of each match.
  </>],
  tags: [],
};

const armordilloKnight: Skritter = {
  name: "Armordillo Knight",
  description: "An Armordillo knight",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('2d4')] },
    brawl: { dice: [new Dice('2d6')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [new Dice('1d6'), new Dice('1d4')] },
    health: 6,
    size: "Large",
  },
  abilities: [
    {
      name: "Rollup",
      effect: <>
        As an action, you can roll into a defensive ball. When you do, your 
        defense checks get 
        +Size and your movement gets -2".
        <br/>
        As an action, you can unroll. When you do, you gain 
        a <Vigor /> or <Hardy /> resource.
      </>
    },
    {
      name: "Durable",
      effect: <>
        Armordillo Knight starts the match with one <Hardy /> resource.
      </>
    },
    {
      name: "Shocking Shell",
      effect: <>
        The Armordillo Knight can bring a Shocking Shell 
        in place of one other piece of equipment. When attacked by a Skritter 
        using a Brawl attack with a <ItemTag tag='METAL' /> weapon, you may immediately make a 2d4 
        Brawl attack against that Skritter.
        Additionally, if you make a Brawl attack a Skritter that has a 
        non-weapon <ItemTag tag='METAL' /> item equipped, gain +1SIZE to the attack.
      </>
    }
  ],
  retirement: [<>
    While retired, Armordillo Knight grants a hardy resource at
    the start of each match.
  </>],
  tags: ['CONCENTRATION'],
};


export {
  porcupine,
  armordilloKnight,
}