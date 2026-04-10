import Bsp from "../../common/Formatting/bsp";
import Keyword from "../../common/Keywords/Keyword";
import Attack from "../../common/Keywords/rules/action/Attack";
import BrawlAction from "../../common/Keywords/rules/action/BrawlAction";
import BrawlAttack from "../../common/Keywords/rules/action/BrawlAttack";
import Defense from "../../common/Keywords/rules/Defense";
import MinusSize from "../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Night from "../../common/Keywords/times/Night";
import Summer from "../../common/Keywords/times/Summer";
import Match from "../../common/Match";
import { Dice, Equipment } from "../../types/types";
import { EquipmentFragment } from "./types";

const base: EquipmentFragment = { type: 'garb', slot: 'face' };

const d1d6: Dice = { count: 1, sides: 6 };

const goggles: Equipment = {
  ...base,
  name: "Goggles",
  effect: (<>
    You may equip one extra Face item (this item does nothing).
  </>),
  tags: ['GEM']
};

const slickShades: Equipment = {
  ...base,
  name: "Slick Shades",
  effect: (<>
    (reduce the effects of <Summer /> and somehow make you better 
    because you're slick.)
  </>)
};

const angryEyes: Equipment = {
  ...base,
  name: "Angry Eyes",
  effect: (<>
    <BrawlAction plural /> against you
    get <MinusSize x={1} />.
  </>)
};

const youWouldntHitAGuyWithGlasses = <>
  <BrawlAttack plural /> against you by
  a Skritter larger than you get<Bsp />
  <MinusSize x={2} />.
</>

const studentsSpectacles: Equipment = {
  ...base,
  name: "Students Spectacles",
  effect: (<>
    A Skritter wearing these spectacles can be under the effects
    of two <Keyword>Sage Wisdoms</Keyword>.
    <br /><br />
    {youWouldntHitAGuyWithGlasses}
  </>),
  tags: ['GEM']
};

const farSightGlasses: Equipment = {
  ...base,
  name: "Far-Sight Glasses",
  effect: (<>
    Gain <PlusDice dice={d1d6} /> to <Attack plural /> 
    <Bsp />at a range of 10" or greater.
    <br /><br />
    {youWouldntHitAGuyWithGlasses}
  </>),
  tags: ['GEM']
};

const nearSightGlasses: Equipment = {
  ...base,
  name: "Near-Sight Glasses",
  effect: (<>
    Gain <PlusSize x={1} /> to <Attack plural /> 
    <Bsp />and <Defense /> at a range of 1"
    or smaller.
    <br /><br />
    {youWouldntHitAGuyWithGlasses}
  </>),
  tags: ['GEM']
};

const radiantEyepiece: Equipment = {
  ...base,
  name: "Radiant Eyepiece",
  effect: (<>
    Ignore penalties to <Attack plural /> during <Night /> <Match />.
  </>)
};

const stoicMask: Equipment = {
  ...base,
  name: "Stoic Mask",
  effect: (<>
    Ignore penalties to <Defense />.
  </>)
};

const equipment = {
  goggles,
  slickShades,
  angryEyes,
  studentsSpectacles,
  farSightGlasses,
  nearSightGlasses,
  radiantEyepiece,
  stoicMask,
};

export default equipment;
