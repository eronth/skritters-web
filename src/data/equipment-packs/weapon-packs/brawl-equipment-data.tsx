import Bsp from "../../../common/Formatting/bsp";
import Keyword from "../../../common/Keywords/Keyword";
import Action from "../../../common/Keywords/rules/action/Action";
import Attack from "../../../common/Keywords/rules/action/Attack";
import BrawlAttack from "../../../common/Keywords/rules/action/BrawlAttack";
import RangedAttack from "../../../common/Keywords/rules/action/RangedAttack";
import Defense from "../../../common/Keywords/rules/Defense";
import MinusDice from "../../../common/Keywords/rules/roll-modifiers/MinusDice";
import PlusDice from "../../../common/Keywords/rules/roll-modifiers/PlusDice";
import Success from "../../../common/Keywords/rules/roll-modifiers/Success";
import Autumn from "../../../common/Keywords/times/Autumn";
import { Dice, Equipment } from "../../../types/types";

const d1d6 = new Dice('1d6');
const d1d4 = new Dice('1d4');
const d2d4 = new Dice('2d4');
const d1d8 = new Dice('1d8');

const armorBreaker = <>
  Enemies hit by this weapon
  get <MinusDice x={1} /> to <Defense /> against
  the <Attack /> if
  they were wearing any <Keyword >Armor</Keyword>.
</>;

const thornDagger: Equipment = {
  name: "Thorn Dagger",
  type: "brawl", 
  slot: "one-handed",
  range: .5,
  bonus: { size: [-1] },
  effect: (<>
    Gains <PlusDice dice={d1d6} /> on a <Attack type="Revealing" />.
  </>),
  tags: ['PLANT']
};

const needleBlade: Equipment = {
  name: "Needle Blade",
  type: "brawl",
  slot: "one-handed",
  range: 1,
  bonus: { removeDice: [1] },
  effect: (<>
    This lightweight weapon grants +1" to Fall Back <Action plural />.
  </>),
  tags: ['METALORPLANT']
};

const whirlerBladeshield: Equipment = {
  name: "Whirler Bladeshield",
  type: "brawl",
  slot: "one-handed",
  range: .5,
  bonus: { size: [1] },
  effect: (<>
    This weapon's bonus is also applied to and <Defense />.
    </>),
  tags: ['METALORPLANT']
};

const matchstickTorch: Equipment = {
  name: "Matchstick Torch",
  type: "brawl",
  slot: "one-handed",
  range: .5,
  effect: (<>
    <Attack plural /> with this weapon get +<Success x={1} />.
  </>),
  tags: ['FLAME'],
};

const gumballFlail: Equipment = {
  name: "Gumball Flail",
  type: "brawl",
  slot: "one-handed",
  range: 1,
  effect: armorBreaker,
  tags: ['PLANT'],
};

const pinNail: Equipment = {
  name: "Pin-Nail",
  type: "brawl",
  slot: "one-handed",
  range: 1,
  bonus: { dice: [d1d6] },
  effect: (<></>),
  tags: ['METAL'],
};

const entrenchingSpade: Equipment = {
  name: "Entrenching Spade",
  type: "brawl",
  slot: "one-handed",
  range: 1,
  bonus: { size: [1] },
  effect: (<>
    Entrench <Action />: Gain the benefits of cover.
    This lasts until you move for any reason.
  </>)
};

const grassBlade: Equipment = {
  name: "Grass Blade",
  type: "brawl",
  slot: "one-handed",
  range: 1,
  bonus: { size: [1] },
  effect: (<>
    You may use your Weave Stat to 
    make <Attack plural /> with this weapon.
  </>),
  tags: ['PLANT'],
};

const mace: Equipment = {
  name: "Mace",
  type: "brawl",
  slot: "one-handed",
  range: 1,
  bonus: { size: [2] },
  effect: (<></>),
  tags: ['METAL']
};

const whip: Equipment = {
  name: "Whip",
  type: "brawl",
  slot: "one-handed",
  range: 2,
  bonus: { size: [1] },
  effect: (<>
  </>)
};

const mightyFistDeadlyChop: Equipment = {
  name: "Mighty Fist / Deadly Chop",
  type: "brawl",
  slot: "onetwo-handed",
  range: 1,
  bonus: { size: [1] },
  effect: (<>
    This "weapon" can be selected as a single item or as a pair.
    If selected as a single option, 
    your second movement does not suffer the penalty 
    for multiple movements. 
    If selected as a pair, your second and third movement
    do not suffer the penalty.
  </>)
};

const gunblade: Equipment = {
  name: "Gunblade",
  type: "brawl",
  slot: "two-handed",
  range: [1, 12],
  bonus: { dice: [d1d6] },
  effect: (<>
    This weapon can be used for 
    either a<Bsp /><BrawlAttack /><Bsp />with range 1"
    or <RangedAttack /><Bsp />with range 12".
  </>),
  tags: ['METALORPLANT']
};

const tarnishedScrew: Equipment = {
  name: "Tarnished Screw",
  type: "brawl",
  slot: "two-handed",
  range: .5,
  bonus: { dice: [d1d6] },
  effect: (<>
    A Skritter forced to retreat by
    an <Attack /> made with this weapon starts the next
    game with 2 less health.
  </>),
  tags: ['METAL'],
};

const beatingBranch: Equipment = {
  name: "Beating Branch",
  type: "brawl",
  slot: "two-handed",
  range: 1.5,
  bonus: { dice: [d2d4] },
  effect: (<></>),
  tags: ['PLANT'],
};

const spear: Equipment = {
  name: "Spear",
  type: "brawl",
  slot: "two-handed",
  range: 1.5,
  bonus: { size: [1] },
  effect: (<>
    You may weild a shield with this weapon,
    even though it is Two-Handed.
  </>),
  tags: ['PLANT'],
};

const warHammer: Equipment = {
  name: "War Hammer",
  type: "brawl",
  slot: "two-handed",
  range: 1.5,
  bonus: { dice: [d1d6] },
  effect: armorBreaker,
  tags: ['METAL'],
};

const twoHanderSword: Equipment = {
  name: "Two-Hander Sword",
  type: "brawl",
  slot: "two-handed",
  range: 1,
  bonus: { dice: [d1d6, d1d4] },
  effect: (<></>),
  tags: ['METAL']
};

const heavyNail: Equipment = {
  name: "Heavy Nail",
  type: "brawl",
  slot: "two-handed",
  range: 1,
  bonus: { dice: [d1d6], size: [2] },
  effect: (<></>),
  tags: ['METAL']
};

const battleAxe: Equipment = {
  name: "Battle Axe",
  type: "brawl",
  slot: "two-handed",
  range: 1.5,
  bonus: { dice: [d1d8], size: [1] },
  effect: (<></>),
  tags: ['METALORPLANT']
};

const poleaxe: Equipment = {
  name: "Poleaxe",
  type: "brawl",
  slot: "two-handed",
  range: 2,
  bonus: { dice: [d1d8] },
  effect: (<></>)
};

const graphiteLance: Equipment = {
  name: "Graphite Lance",
  type: "brawl",
  slot: "two-handed",
  range: 2,
  bonus: { dice: [d1d6], size: [1] },
  effect: (<></>)
};

const hookthornStick: Equipment = {
  name: "Hookthorn Stick",
  type: "brawl",
  slot: "two-handed",
  range: 2,
  bonus: { dice: [d1d4], size: [1] },
  effect: (<>
    If you deal damage to a target with this weapon, they are HOOKED. 
    While hooked, they cannot retreat. They can use an action to become unhooked.
  </>)
};

const scythe: Equipment = {
  name: "Scythe",
  type: "brawl",
  slot: "two-handed",
  range: 2,
  bonus: { dice: [d2d4] },
  effect: (<>
    <Attack plural /> with this weapon get +<Success x={1} /> during
    the <Autumn />.
  </>),
  tags: ['GLOOMY'],
};

const equipment = {
  // One-Handed
  thornDagger,
  needleBlade,
  whirlerBladeshield,
  matchstickTorch,
  gumballFlail,
  pinNail,
  entrenchingSpade,
  grassBlade,
  mace,
  whip,
  // Two-Handed
  gunblade,
  tarnishedScrew,
  beatingBranch,
  spear,
  warHammer,
  twoHanderSword,
  heavyNail,
  battleAxe,
  poleaxe,
  graphiteLance,
  hookthornStick,
  scythe,
  // Special
  mightyFistDeadlyChop,
};

export default equipment;
