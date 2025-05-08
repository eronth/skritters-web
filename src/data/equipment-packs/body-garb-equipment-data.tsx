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
import { Dice, Equipment } from "../../types/types";
import { extraWeapons, grenadeContainer } from "./common-effect-data";

const d1d6 = new Dice('1d6');

const raincoat: Equipment = {
  name: 'Raincoat',
  type: 'garb', slot: 'body',
  effect: (<>
    (reduce the effects of spring, but also buff WATERFOND creatures because it's cute as hell)
  </>)
};

const roastytoastCoat: Equipment = {
  name: 'Roastytoast Coat',
  type: 'garb', slot: 'body',
  effect: (<>
    (reduce the effects of winter, but bigger)
  </>)
};

const oakenbarkAarmor: Equipment = {
  name: 'Oakenbark Armor',
  type: 'garb', slot: 'body',
  effect: (<>
    <PlusDice dice={d1d6} /> and <PlusSize x={1} /> to <Defense />.
  </>),
  tags: ['PLANT']
};

const paperbarkArmor: Equipment = {
  name: 'Paperbark Armor',
  type: 'garb', slot: 'body',
  effect: (<>
    <PlusSize x={1} /> to <Defense />.
  </>),
  tags: ['PLANT']
};

const shimmergleamRobe: Equipment = {
  name: 'Shimmergleam Robe',
  type: 'garb', slot: 'body',
  effect: (<>
    Start the match with a <Dazzle /> resource.
  </>)
};

const shadowsilkCloak: Equipment = {
  name: 'Shadowsilk Cloak',
  type: 'garb', slot: 'body',
  effect: (<>
    Once per game, if it's <Night />, <Cloak x={3} /> as
    an <Action />. If you reveal with a Thornwood Dagger or Throwing Blades <Attack />,
    you gain <PlusDice dice={d1d6} /> on that check.
  </>),
  tags: ['GLOOMY']
};

const petalweaveRobes: Equipment = {
  name: 'Petalweave Robes',
  type: 'garb', slot: 'body',
  effect: (<>
    <WeaveAction plural /> that target you get <MinusSize x={1} />.
  </>),
  tags: ['PLANT']
};

const weaponsHolster: Equipment = {
  name: 'Weapons Holster',
  type: 'garb', slot: 'body',
  effect: extraWeapons
};

const travelersPocketGuide: Equipment = {
  name: 'Traveler\'s Pocket Guide',
  type: 'garb', slot: 'body',
  effect: (<>
    For one turn ignore difficult terrain and no penalty for double move.
  </>)
};

const ninjaGi: Equipment = {
  name: 'Ninja Gi',
  type: 'garb', slot: 'body',
  effect: (<>
    Gain +1" to movements during <Night />, 
    and <PlusSize x={1} /> to <Defense /> at <Night />.
  </>)
};

const grenadePouch: Equipment = {
  name: 'Grenade Pouch',
  type: 'garb', slot: 'body',
  effect: grenadeContainer,
};

const equipment = {
  raincoat,
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
};

export default equipment;
