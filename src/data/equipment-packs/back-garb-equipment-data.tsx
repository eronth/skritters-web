import Bsp from "../../common/Formatting/bsp";
import Action from "../../common/Keywords/rules/action/Action";
import BrawlAction from "../../common/Keywords/rules/action/BrawlAction";
import WeaveAction from "../../common/Keywords/rules/action/WeaveAction";
import Defense from "../../common/Keywords/rules/Defense";
import Adaptive from "../../common/Keywords/rules/resources/Adaptive";
import Ready from "../../common/Keywords/rules/resources/Ready";
import Rush from "../../common/Keywords/rules/resources/Rush";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Night from "../../common/Keywords/times/Night";
import Match from "../../common/Match";
import { Dice, Equipment } from "../../types/types";
import { extraWeapons, grenadeContainer } from "./common-effect-data";
import { EquipmentFragment } from "./types";

const base: EquipmentFragment = { type: 'garb', slot: 'back' };

const d1d4: Dice = { count: 1, sides: 4 };

const explorersGear: Equipment = {
  ...base,
  name: "Explorer's Gear",
  effect: (<>
    At the start of the <Match />, choose one of the following:
    <ul>
      <li>Gain 2 <Ready /> resources.</li>
      <li>Gain 1 <Ready /> and 1 <Rush /> resource.</li>
    </ul>
  </>)
};

const comRadio: Equipment = {
  ...base,
  name: "Com Radio",
  effect: (<>
    When you activate this Skritter, you may choose another Skritter 
    on your team not within 12" who has not activated yet to team up.
    Activate the chosen Skritter at the same time as a Coordinated Team.
    <br />
    Both Skritters are considered active. You may take <Action plural /> with 
    them in any order, but only one action at a time (as normal). If one 
    member of the Coordinated Team attacks a Skritter, the other
    member gains <PlusSize x={1} /> to <Action plural /> targetting
    that same Skritter until the end of the activation. This does not stack.
  </>),
  tags: ['METAL','ZAP']
};

const nightprowlCape: Equipment = {
  ...base,
  name: "Nightprowl Cape",
  effect: (<>
    <PlusSize x={2} /> to <Defense /> at <Night />.
  </>),
  tags: ['GLOOMY']
};

const survivalPack: Equipment = {
  ...base,
  name: "Survival Pack",
  effect: (<>
    At the start of the <Match />, gain an <Adaptive /> resource.
  </>)
};

const capeOfHeroism: Equipment = {
  ...base,
  name: "Cape of Heroism",
  effect: (<>
    <PlusSize x={1} /> to <BrawlAction plural />.
  </>)
};

const weaponsPack: Equipment = {
  ...base,
  name: "Weapons Pack",
  effect: extraWeapons
};

const gliderLeaf: Equipment = {
  ...base,
  name: "Glider Leaf",
  effect: (<>
    Small Skritter only. Can be deployed to gently 
    fall from height, gaining 2" movement. Once per combat.
  </>),
  tags: ['PLANT']
};

const alchemersKit: Equipment = {
  ...base,
  name: "Alchemist's Kit",
  effect: (<>
    (make potions - Drew's Bitter Jitter Brew, Red Gull's Wings)
  </>)
};

const iconOfDetermination: Equipment = {
  ...base,
  name: "Icon of Determination",
  effect: (<>
    If this Skritter would be forced to retreat,
    they do not retreat until after their next
    turn. If the <Match /> ends before the end
    of their next turn, they are not treated as
    having retreated.
  </>)
};

const grenadeSatchel: Equipment = {
  ...base,
  name: "Grenade Satchel",
  effect: grenadeContainer
};

const deployableMiniCauldron: Equipment = {
  ...base,
  name: "Deployable Mini Cauldron",
  effect: (<>
    While deployed, a Skritter within 1" gets
    +1" range and<Bsp /><PlusDice dice={d1d4} />
    <Bsp />to <WeaveAction plural /> for each
    Skritter within 1" that is currently wielding
    a Weave Item (including themselves).
    <br /><br />
    During <Night />, these <WeaveAction plural />
    <Bsp />get an additional +1" range per Skritter.
  </>),
  tags: ['DEPLOYABLE']
};

const equipment = {
  explorersGear,
  comRadio,
  nightprowlCape,
  survivalPack,
  capeOfHeroism,
  weaponsPack,
  gliderLeaf,
  alchemersKit,
  iconOfDetermination,
  grenadeSatchel,
  deployableMiniCauldron,
};

export default equipment;
