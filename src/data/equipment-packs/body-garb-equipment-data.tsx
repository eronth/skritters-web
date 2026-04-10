import Bsp from "../../common/Formatting/bsp";
import Action from "../../common/Keywords/rules/action/Action";
import Attack from "../../common/Keywords/rules/action/Attack";
import WeaveAction from "../../common/Keywords/rules/action/WeaveAction";
import Cloak from "../../common/Keywords/rules/cloak/Cloak";
import Defense from "../../common/Keywords/rules/Defense";
import Dazzle from "../../common/Keywords/rules/resources/Dazzle";
import MinusSize from "../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Night from "../../common/Keywords/times/Night";
import Spring from "../../common/Keywords/times/Spring";
import Summer from "../../common/Keywords/times/Summer";
import Winter from "../../common/Keywords/times/Winter";
import Match from "../../common/Match";
import Tag from "../../common/Tags/Tag";
import { Dice, Equipment } from "../../types/types";
import { extraWeapons, grenadeContainer } from "./common-effect-data";
import { EquipmentFragment } from "./types";

const base: EquipmentFragment = { type: 'garb', slot: 'body' };

const d1d6 = new Dice('1d6');

const raincoat: Equipment = {
  ...base,
  name: 'Raincoat',
  effect: (<>
    (reduce the effects of <Spring />, but also buff
    <Bsp /><Tag tag='WATERFOND' /><Bsp />
    Skritters because it's cute as hell)
  </>)
};

const rainingcoat: Equipment = {
  ...base,
  name: 'Rainingcoat',
  requires: <>
    <Tag tag={'WATERFOND'} />
  </>,
  effect: (<>
    Same as Raincoat, but only<Bsp /><Tag tag='WATERFOND' /><Bsp />
    Skritters can
    have it. You can have both a Raincoat and Rainingcoat on the same
    team.
  </>)
};

const roastytoastCoat: Equipment = {
  ...base,
  name: 'Roastytoast Coat',
  effect: (<>
    (reduce the effects of <Winter />, but bigger)
  </>)
};

const breezyGarment: Equipment = {
  ...base,
  name: 'Breezy Garment',
  effect: (<>
    (reduce the effects of <Summer />, but bigger)
  </>)
};

const ruggedCoat: Equipment = {
  ...base,
  name: 'Rugged Coat',
  effect: (<>
    A Skritter wearing this has +2
    max Health.
  </>)
};

const oakenbarkAarmor: Equipment = {
  ...base,
  name: 'Oakenbark Armor',
  effect: (<>
    <PlusDice dice={d1d6} /> and <PlusSize x={1} /> to <Defense />.
  </>),
  tags: ['PLANT']
};

const paperbarkArmor: Equipment = {
  ...base,
  name: 'Paperbark Armor',
  effect: (<>
    <PlusSize x={1} /> to <Defense />.
  </>),
  tags: ['PLANT']
};

const shimmergleamRobe: Equipment = {
  ...base,
  name: 'Shimmergleam Robe',
  effect: (<>
    Start the <Match /> with a <Dazzle /> resource.
  </>)
};

const shadowsilkCloak: Equipment = {
  ...base,
  name: 'Shadowsilk Cloak',
  effect: (<>
    Once per game, if it's <Night />, <Cloak x={3} /> as
    an <Action />. If you reveal with a Thornwood Dagger or Throwing Blades <Attack />,
    you gain <PlusDice dice={d1d6} /> on that check.
  </>),
  tags: ['GLOOMY']
};

const petalweaveRobes: Equipment = {
  ...base,
  name: 'Petalweave Robes',
  effect: (<>
    <WeaveAction plural /> that target you get <MinusSize x={1} />.
  </>),
  tags: ['PLANT']
};

const weaponsHolster: Equipment = {
  ...base,
  name: 'Weapons Holster',
  effect: extraWeapons
};

const travelersPocketGuide: Equipment = {
  ...base,
  name: 'Traveler\'s Pocket Guide',
  effect: (<>
    For one turn ignore difficult terrain and no penalty for double move.
  </>)
};

const ninjaGi: Equipment = {
  ...base,
  name: 'Ninja Gi',
  effect: (<>
    Gain +1" to movements during <Night />, 
    and <PlusSize x={1} /> to <Defense /> at <Night />.
  </>)
};

const grenadePouch: Equipment = {
  ...base,
  name: 'Grenade Pouch',
  effect: grenadeContainer,
};

const equipment = {
  raincoat,
  rainingcoat,
  roastytoastCoat,
  oakenbarkAarmor,
  paperbarkArmor,
  shimmergleamRobe,
  shadowsilkCloak,
  petalweaveRobes,
  weaponsHolster,
  travelersPocketGuide,
  grenadePouch,
  ninjaGi,
  ruggedCoat,
  breezyGarment
};

export default equipment;
