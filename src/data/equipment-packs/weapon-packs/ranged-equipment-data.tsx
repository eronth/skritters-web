import Keyword from "../../../common/Keywords/Keyword";
import Action from "../../../common/Keywords/rules/action/Action";
import Attack from "../../../common/Keywords/rules/action/Attack";
import RangedAttack from "../../../common/Keywords/rules/action/RangedAttack";
import WeaveAttack from "../../../common/Keywords/rules/action/WeaveAttack";
import Defense from "../../../common/Keywords/rules/Defense";
import Dazzle from "../../../common/Keywords/rules/resources/Dazzle";
import Focus from "../../../common/Keywords/rules/resources/Focus";
import MinusSize from "../../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../../common/Keywords/rules/roll-modifiers/PlusSize";
import Success from "../../../common/Keywords/rules/roll-modifiers/Success";
import RangedThreat from "../../../common/Keywords/rules/threat/RangedThreat";
import Summer from "../../../common/Keywords/times/Summer";
import Winter from "../../../common/Keywords/times/Winter";
import { Dice, Equipment } from "../../../types/types";

const d1d4: Dice = { count: 1, sides: 4 };
const d1d6: Dice = { count: 1, sides: 6 };
const d2d6: Dice = { count: 2, sides: 6 };
const d1d8: Dice = { count: 1, sides: 8 };

const scattergun = <>
  This weapon gets <MinusSize x={1} /> for each range increment 
  instead of the normal penalty.
</>;

// Ranged Weapons
// // One-Handed Weapons
const pistol: Equipment = {
  name: "Pistol",
  type: "ranged",
  slot: "one-handed",
  range: 8,
  bonus: {
    dice: [{...d1d4}],
  },
  effect: (<>
    A classic and reliable weapon. When making an <Attack /> with
    this weapon, you can reroll a single dice that's not already
    a 1, and choose which result to keep.
  </>),
  tags: ['METALORPLANT'],
};

const crystalPistol: Equipment = {
  name: "Crystal Pistol",
  type: "ranged",
  slot: "one-handed",
  range: 8,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    When you hit with an attack using this weapon, you can spend 3
    of the successes to gain a <Dazzle /> resource. You do not 
    add those successes to your number of hits if you do this.
  </>),
  tags: ['GEM']
};

const sling: Equipment = {
  name: "Sling",
  type: "ranged",
  slot: "one-handed",
  range: 8,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    You may take any additional <Keyword>One-Handed</Keyword> weapon
    when you take this weapon. You still need to swap to it 
    if you don't already have it equipped.
  </>)
};

const skillshot: Equipment = {
  name: "Skillshot",
  type: "ranged",
  slot: "two-handed",
  range: 8,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    If you make an attack with this weapon
    that includes a d8, gain <PlusSize x={1} /> on any 
    dice other than a d8.
  </>),
  tags: ['METAL']
};

const throwingBlades: Equipment = {
  name: "Throwing Blades",
  type: "ranged",
  slot: "one-handed",
  range: 6,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    This includes items such as knives, hatchets, shuriken, and other 
    such thrown weapons. <Attack type="revealing" plural /> with this weapon
    gets <PlusDice dice={d1d6} />. This stacks with the normal bonus for 
    <Attack type="revealing" plural />.
  </>),
  tags: ['METAL']
};

const infernalHandgun: Equipment = {
  name: "Infernal Handgun",
  type: "ranged",
  slot: "one-handed",
  range: 6,
  bonus: {},
  effect: (<>
    Each time you <Attack /> with this weapon, you can choose whether the
    attack is is a <WeaveAttack /> or <RangedAttack />. 
    Regardless of your choice, you add your Weave and Ranged bonuses 
    together for the <Attack />. 
  </>),
  tags: ['FLAME', 'GLOOMY']
};

const handcannon: Equipment = {
  name: "Handcannon",
  type: "ranged",
  slot: "one-handed",
  range: 6,
  bonus: {},
  effect: (<>
    Ignore your target's <Defense /> when making an <Attack /> with
    this weapon. Must use an <Action /> to reload before it can 
    be used again, and you cannot use this weapon twice in the same activation.
  </>),
  tags: ['METAL']
};

const sixShoota: Equipment = {
  name: "6-Shoota",
  type: "ranged",
  slot: "one-handed",
  range: 8,
  bonus: {
    dice: [{...d1d6}]
  },
  effect: (<>
    You can only make 6 <Attack plural /> with this weapon during a mission.
  </>),
  tags: ['METALORPLANT'],
};


// // Two-Handed Weapons
const birdseedShot: Equipment = {
  name: "Birdseed Shot",
  type: "ranged",
  slot: "two-handed",
  range: 12,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    {scattergun}<br />
    Creatures hit by this 
    lose <Keyword>Flitter About</Keyword> and <Keyword>Soar</Keyword> until 
    the end of their next activation.
  </>),
  tags: ['METALORPLANT']
};

const peppershot: Equipment = {
  name: "Peppershot",
  type: "ranged",
  slot: "two-handed",
  range: 12,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    {scattergun}<br />
    Choose a second Skritter that is within half of 
    your <RangedThreat /> distance from your target, you may also target them with a 
    second <RangedAttack /> using this weapon without spending an <Action />.
  </>),
  tags: ['PLANT']
};

const boomShot: Equipment = {
  name: "Boomshot",
  type: "ranged",
  slot: "two-handed",
  range: 12,
  bonus: {
    dice: [{...d1d6}]
  },
  effect: (<>
    BLAST 2" - BOOMIE BOOMIE
  </>),
  tags: ['METALORPLANT']
};

const bow: Equipment = {
  name: "Bow",
  type: "ranged",
  slot: "two-handed",
  range: 15,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    <Attack plural /> with this weapon can target a unit as if 
    they were 1" in any 
    direction of your choice (so long as it is still at the same height), 
    allowing you to possibly ignore cover.
  </>),
  tags: ['PLANT']
};

const bigBlasta: Equipment = {
  name: "Big Blasta",
  type: "ranged",
  slot: "two-handed",
  range: 15,
  bonus: {
    dice: [{...d2d6}]
  },
  effect: (<>
    When you <Attack /> with this weapon, 
    you are knocked back 3" directly away from your target. You 
    are also hit with half of the <Success plural />
    (rounded up) for this attack (you may roll your <Defense /> to
    reduce the damage as normal).
  </>),
  tags: ['METAL']
};

const crossbow: Equipment = {
  name: "Crossbow",
  type: "ranged",
  slot: "two-handed",
  range: 18,
  bonus: {
    dice: [{...d1d4}]
  },
  effect: (<>
    Can be braced for an additional 6" range.
  </>),
  tags: ['PLANT']
};

const stickbodyRifle: Equipment = {
  name: "Stickbody Rifle",
  type: "ranged",
  slot: "two-handed",
  range: 18,
  bonus: {
    dice: [{...d1d6}]
  },
  effect: (<>
    This reliable weapon allows you to
    start with a <Focus /> resource. Additionally, on the 
    first <Attack /> you make with this weapon each turn, 
    you may reroll a single dice that had a result of a 1.
  </>),
  tags: ['PLANT']
};

const riffleRifle: Equipment = {
  name: "Riffle-Rifle",
  type: "ranged",
  slot: "two-handed",
  range: 18,
  bonus: {
    dice: [{...d1d6}]
  },
  effect: (<>
    the first attack each turn, you can find a squirrel resource
  </>),
  tags: ['METALORPLANT']
};

const supremeRaybem: Equipment = {
  name: "Supreme Raybem",
  type: "ranged",
  slot: "two-handed",
  range: 18,
  bonus: {
    dice: [{...d1d8}, {...d1d6}]
  },
  effect: (<>
    After making an <Attack /> with this weapon, give it gains an
    Overheated token. 
    If it's <Summer />, it gains two Overheated tokens instead. 
    If it's <Winter />, it only gains an Overheat token on every 
    other <Attack />.
    <br />
    While this weapon has an Overheated token, it cannot be used to make
    an <Attack />.
    <br />
    At the end of your turn, you can remove an Overheated token
     from this weapon.
    <br />
    <Action />: Remove an Overheated from this weapon. 
    
  </>),
  tags: ['FLAME']
};

const grenadeLobber: Equipment = {
  name: "Grenade Lobber",
  type: "ranged",
  slot: "two-handed",
  range: 9,
  bonus: { },
  effect: (<>
    Can fire grenades at a new and improved range. Requires grenades to be used. You get a single grenade of choice when you get this weapon, but you may use other grenades brought via Grenade Pouch or Grenade Satchel.
  </>),
  tags: ['METALORPLANT']
};

const fishersLine: Equipment = {
  name: "Fisher's Line",
  type: "ranged",
  slot: "two-handed",
  range: 12,
  bonus: { size: [-1] },
  effect: (<>
    If you roll at least one success when attacking with this weapon, the target becomes SNAGGED. You may only have one snagged target at a time.
    Targets who are SNAGGED by you cannot move further from you by any means. You may make a Brawling attack to reel your target in, with each unblocked success allowing you to reel the target 1"".
    If you switch weapons ore use any movement action, your target stops being SNAGGED.
  </>),
  tags: []
};

const boomerang: Equipment = {
  name: "Boomerang",
  type: "ranged",
  slot: "one-handed",
  range: 9,
  bonus: { size: [1] },
  effect: (<>
    If you make an <Attack /> <Action /> with this weapon immediately 
    after making an <Attack /> <Action /> with it, you may make
    the <Attack /> measuring from the target of the previous <Attack />.
  </>),
  tags: ['PLANT']
};

const equipment = {
  // One-Handed
  pistol,
  crystalPistol,
  sling,
  skillshot,
  throwingBlades,
  infernalHandgun,
  handcannon,
  sixShoota,
  boomerang,
  // Two-Handed
  birdseedShot,
  peppershot,
  boomShot,
  bow,
  bigBlasta,
  crossbow,
  stickbodyRifle,
  riffleRifle,
  supremeRaybem,
  grenadeLobber,
  fishersLine,
};

export default equipment;
