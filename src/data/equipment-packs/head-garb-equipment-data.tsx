import Keyword from "../../common/Keywords/Keyword";
import Attack from "../../common/Keywords/rules/action/Attack";
import RangedAction from "../../common/Keywords/rules/action/RangedAction";
import WeaveAttack from "../../common/Keywords/rules/action/WeaveAttack";
import Defense from "../../common/Keywords/rules/Defense";
import MinusSize from "../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Size from "../../common/Keywords/rules/roll-modifiers/Size";
import Summer from "../../common/Keywords/times/Summer";
import Winter from "../../common/Keywords/times/Winter";
import { Dice, Equipment } from "../../types/types";

const d1d4: Dice = { count: 1, sides: 4 };
const d1d6: Dice = { count: 1, sides: 6 };

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

const gunslingersHat: Equipment = {
  name: "Gunslinger's Hat",
  type: "garb", slot: "head",
  effect: (<>
    Gain <Size x={1} /> to <RangedAction plural /> with <Keyword>One-Handed</Keyword>
    weapons.
  </>),
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
  treasuredCrown,
  floweredCrown,
  gunslingersHat,
  mouseketeeeringHat,
  dreamtimePillow,
  sunshadeHat,
  toastyfluffCap,
  acornHelmet,
  thimbleHelm,
  floweringMageCap,
};

export default equipment;
