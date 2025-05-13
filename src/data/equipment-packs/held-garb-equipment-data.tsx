import Keyword from "../../common/Keywords/Keyword";
import BrawlAttack from "../../common/Keywords/rules/action/BrawlAttack";
import RangedAttack from "../../common/Keywords/rules/action/RangedAttack";
import WeaveAction from "../../common/Keywords/rules/action/WeaveAction";
import WeaveAttack from "../../common/Keywords/rules/action/WeaveAttack";
import Defense from "../../common/Keywords/rules/Defense";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import MinusDice from "../../common/Keywords/rules/roll-modifiers/MinusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Success from "../../common/Keywords/rules/roll-modifiers/Success";
import { Dice } from "../../types/types";
import { Equipment } from "../../types/types";
import Action from "../../common/Keywords/rules/action/Action";
import Check from "../../common/Keywords/rules/check/Check";

const d1d4: Dice = { count: 1, sides: 4 };
const d1d6: Dice = { count: 1, sides: 4 };
const d1d8: Dice = { count: 1, sides: 8 };

const acorncapShield: Equipment = {
  name: "Acorncap Shield",
  type: "garb", slot: "one-handed",
  effect: (<>
    Gain <Success x={1} /> to <Defense />.
  </>),
  tags: ['PLANT'],
};

const floweringPetalShield: Equipment = {
  name: "Flowering Petal Shield",
  type: "garb", slot: "one-handed",
  effect: (<>
    <PlusSize x={1} /> to <Defense /> and <WeaveAction plural />.
  </>),
  tags: ['PLANT'],
};

const stitchButtonShield: Equipment = {
  name: "Stitch-Button Shield",
  type: "garb", slot: "one-handed",
  effect: (<>
    Get <Success x={1} /> to <Defense />. 
    This item can be equipped with a a <Keyword>Two-Handed</Keyword> weapon. If you
    do, you get a <PlusSize x={1} /> to <Defense /> instead.
  </>),
};

const bottlecapShield: Equipment = {
  name: "Bottlecap Shield",
  type: "garb", slot: "one-handed",
  effect: (<>
    Get <PlusDice dice={d1d6} />+<PlusDice dice={d1d4} /> on <Defense /> against <BrawlAttack plural /> and <RangedAttack plural />,
    but <MinusDice x={1} /> against <WeaveAttack plural />.
  </>),
  tags: ['METAL'],
};

const dancingRibbon: Equipment = {
  name: "Dancing Ribbon",
  type: "garb", slot: "one-handed",
  effect: (<>
    Enemies get <MinusDice x={1} /> to <RangedAttack plural /> and <BrawlAttack plural /> that
    target you.
  </>),
};

const warhorn: Equipment = {
  name: "Warhorn",
  type: "garb", slot: "one-handed",
  effect: (<>
    Blow the Warhorn! <Action />: All allied Skritters within 3" can 
    immediately move up to 3".
    You may only use this <Action /> once per turn.
  </>),
  tags: ['METALORPLANT']
};

const ponderinOrb: Equipment = {
  name: "Ponderin' Orb",
  type: "garb", slot: "one-handed",
  effect: (<>
    <Action />: (PONDER)
  </>),
  tags: ['GEM'],
};

const dewdrop: Equipment = {
  name: "Dewdrop",
  type: "garb", slot: "one-handed",
  effect: (<>
    (DEWDROP)
  </>),
  tags: ['WATER'],
};

const deployableWallShield: Equipment = {
  name: "Deployable Wall Shield",
  type: "garb", slot: "two-handed",
  effect: (<>
    If currently weilded, 
    get <PlusDice dice={d1d8} /> + <PlusDice dice={d1d6} /> to <Defense /> <Check plural />.
    Can be deployed to act as a 1.5" section of cover. If you do deploy it while weilding it, 
    you may automatically equip another weapon set if you have one.
  </>),
};

const equipment = {
  acorncapShield,
  floweringPetalShield,
  stitchButtonShield,
  bottlecapShield,
  dancingRibbon,
  warhorn,
  ponderinOrb,
  dewdrop,
  deployableWallShield,
};

export default equipment;
