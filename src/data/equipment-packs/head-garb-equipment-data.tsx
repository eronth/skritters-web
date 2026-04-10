import Bsp from "../../common/Formatting/bsp";
import Keyword from "../../common/Keywords/Keyword";
import Action from "../../common/Keywords/rules/action/Action";
import Attack from "../../common/Keywords/rules/action/Attack";
import RangedAction from "../../common/Keywords/rules/action/RangedAction";
import WeaveAction from "../../common/Keywords/rules/action/WeaveAction";
import WeaveAttack from "../../common/Keywords/rules/action/WeaveAttack";
import Defense from "../../common/Keywords/rules/Defense";
import MinusSize from "../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Size from "../../common/Keywords/rules/roll-modifiers/Size";
import Day from "../../common/Keywords/times/Day";
import Night from "../../common/Keywords/times/Night";
import Summer from "../../common/Keywords/times/Summer";
import Winter from "../../common/Keywords/times/Winter";
import { Dice, Equipment } from "../../types/types";
import { EquipmentFragment } from "./types";

const base: EquipmentFragment = { type: 'garb', slot: 'head' };

const d1d4: Dice = { count: 1, sides: 4 };
const d1d6: Dice = { count: 1, sides: 6 };

const gunslingersWideBrimHat: Equipment = {
  ...base,
  name: "Gunslinger's Wide-Brim Hat",
  requires: <>
    <Keyword>One-Handed</Keyword> Range Weapon,
    <Bsp /><Day />
  </>,
  effect: (<>
    Gain <Size x={2} /> to <RangedAction plural />.
    <br /><br />
    When you use the<Bsp /><Action type='Swapping Weapons' />
    <Bsp />to switch to a<Bsp /><Keyword>One-Handed</Keyword>
    <Bsp />Ranged Weapon, you may make an attack with
    that weapon as part of the swap. (You can only make
    one attack this way, even if you swap to two valid
    weapons.)
  </>),
};

const castersWideBrimHat: Equipment = {
  ...base,
  name: "Caster's Wide-Brim Hat",
  requires: <>
    Weave Weapon,
    <Bsp /><Night />
  </>,
  effect: (<>
    Gain <Size x={2} /> to <WeaveAction plural />.
    <br /><br />
    If you deal at least 1 Damage with a<Bsp />
    <WeaveAction />, regain 1 health.
  </>),
};

const strikersWideBrimHat: Equipment = {
  ...base,
  name: "Striker's Wide-Brim Hat",
  requires: <>
    <Keyword>Two-Handed</Keyword> Brawl Weapon
  </>,
  effect: (<>
    Gain <PlusDice dice={d1d4} /> to <Attack plural />
    <Bsp />with <Keyword>Two-Handed</Keyword>
    <Bsp />weapons immediately after a<Bsp />
    <Action type="Charge" />.
    <br /><br />
    You can attempt to <b>Intercept</b> a Skritter
    at twice your Scuffle Range. (You cannot Intercept
    further than your movement.)
  </>),
};

const treasuredCrown: Equipment = {
  name: "Treasured Crown",
  type: "garb", slot: "head",
  effect: (<>
    Your wealth and royalty is noticed by all. All <Attack plural /> against 
    a Skritter wearing this item this unit suffer <MinusSize x={1} />.
  </>),
  tags: ['METAL', 'GEM'],
};

const floweredCrown: Equipment = {
  name: "Flowered Crown",
  type: "garb", slot: "head",
  effect: (<>
    Gain <Size x={2} /> <Defense /> against <WeaveAttack plural />.
  </>),
  tags: ['PLANT'],
};

const mouseketeeeringHat: Equipment = {
  name: "Mouseketeeering Hat",
  type: "garb", slot: "head",
  effect: (<>
    Needle Blade's penalty is removed, and instead you 
    gain <Size x={1} /> to <Attack plural /> with Needle Blade.
    Additionally, you have <Size x={1} /> to <Defense /> while weilding a 
    Needle Blade.
  </>),
};

const dreamtimePillow: Equipment = {
  name: "Dreamtime Pillow",
  type: "garb", slot: "head",
  effect: (<>
    If this Skritter retreats and retires, 
    you can remove the Dreamtime Pillow instead, causing the 
    Skritter to get a full recovery instead of retiring.
  </>),
};

const sunshadeHat: Equipment = {
  name: "Sunshade Hat",
  type: "garb", slot: "head",
  effect: (<>
    (reduce the effects of <Summer />)
  </>),
};

const toastyfluffCap: Equipment = {
  name: "Toastyfluff Cap",
  type: "garb", slot: "head",
  effect: (<>
    (reduce the effects of <Winter />)
  </>),
};

const acornHelmet: Equipment = {
  name: "Acorn Helmet",
  type: "garb", slot: "head",
  effect: (<>
    <Size x={1} /> to <Defense />.
  </>),
  tags: ['PLANT']
};

const thimbleHelm: Equipment = {
  name: "Thimble Helm",
  type: "garb", slot: "head",
  effect: (<>
    <PlusDice dice={d1d4} /> to <Defense />.
  </>),
  tags: ['METAL']
};

const floweringMageCap: Equipment = {
  name: "Flowering Mage Cap",
  type: "garb", slot: "head",
  effect: (<>
    <PlusDice dice={d1d6} /> and <PlusSize x={1} /> to <WeaveAttack plural />.
  </>),
  tags: ['PLANT']
};

const equipment = {
  gunslingersWideBrimHat,
  castersWideBrimHat,
  strikersWideBrimHat,
  treasuredCrown,
  floweredCrown,
  mouseketeeeringHat,
  dreamtimePillow,
  sunshadeHat,
  toastyfluffCap,
  acornHelmet,
  thimbleHelm,
  floweringMageCap,
};

export default equipment;
