import Action from "../../common/Keywords/rules/action/Action";
import BrawlAction from "../../common/Keywords/rules/action/BrawlAction";
import Defense from "../../common/Keywords/rules/Defense";
import Adaptive from "../../common/Keywords/rules/resources/Adaptive";
import Ready from "../../common/Keywords/rules/resources/Ready";
import Rush from "../../common/Keywords/rules/resources/Rush";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Night from "../../common/Keywords/times/Night";
import { Equipment } from "../../types/types";
import { extraWeapons, grenadeContainer } from "./common-effect-data";


const explorersGear: Equipment = {
  name: "Explorer's Gear",
  type: "garb", slot: "back",
  effect: (<>
    At the start of the mission, choose one of the following:
    <ul>
      <li>Gain 2 <Ready /> resources.</li>
      <li>Gain 1 <Ready /> and 1 <Rush /> resource.</li>
    </ul>
  </>)
};

const comRadio: Equipment = {
  name: "Com Radio",
  type: "garb", slot: "back",
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
  name: "Nightprowl Cape",
  type: "garb", slot: "back",
  effect: (<>
    <PlusSize x={2} /> to <Defense /> at <Night />.
  </>),
  tags: ['GLOOMY']
};

const survivalPack: Equipment = {
  name: "Survival Pack",
  type: "garb", slot: "back",
  effect: (<>
    At the start of the mission, gain an <Adaptive /> resource.
  </>)
};

const capeOfHeroism: Equipment = {
  name: "Cape of Heroism",
  type: "garb", slot: "back",
  effect: (<>
    <PlusSize x={1} /> to <BrawlAction plural />.
  </>)
};

const weaponsPack: Equipment = {
  name: "Weapons Pack",
  type: "garb", slot: "back",
  effect: extraWeapons
};

const gliderLeaf: Equipment = {
  name: "Glider Leaf",
  type: "garb", slot: "back",
  effect: (<>
    Small Skritter only. Can be deployed to gently 
    fall from height, gaining 2" movement. Once per combat.
  </>),
  tags: ['PLANT']
};

const alchemersKit: Equipment = {
  name: "Alchemist's Kit",
  type: "garb", slot: "back",
  effect: (<>
    (make potions - Drew's Bitter Jitter Brew, Red Gull's Wings)
  </>)
};

const iconOfDetermination: Equipment = {
  name: "Icon of Determination",
  type: "garb", slot: "back",
  effect: (<>
    If this Skritter would be forced to retreat, they do not retreat until after 
    their next turn. If the mission ends before the end of their next turn, they
    are not treated as having retreated.
  </>)
};

const grenadeSatchel: Equipment = {
  name: "Grenade Satchel",
  type: "garb", slot: "back",
  effect: grenadeContainer
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
};

export default equipment;
