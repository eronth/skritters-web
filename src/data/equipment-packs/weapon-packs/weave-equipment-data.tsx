import Action from "../../../common/Keywords/rules/action/Action";
import Attack from "../../../common/Keywords/rules/action/Attack";
import Check from "../../../common/Keywords/rules/Check";
import Dazzle from "../../../common/Keywords/rules/resources/Dazzle";
import Rush from "../../../common/Keywords/rules/resources/Rush";
import Whimsy from "../../../common/Keywords/rules/resources/Whimsy";
import PlusSize from "../../../common/Keywords/rules/roll-modifiers/PlusSize";
import Success from "../../../common/Keywords/rules/roll-modifiers/Success";
import ItemTag from "../../../common/Tags/ItemTag";
import { Dice, Equipment } from "../../../types/types";

const d2d4: Dice = new Dice('2d4');
const d1d6: Dice = new Dice('1d6');
const d3d6: Dice = new Dice('3d6');
const metal = <><ItemTag tag={'METAL'} /></>

const razzleDazzle: Equipment = {
  name: "Razzle Dazzle",
  type: "weave",
  slot: "one-handed",
  range: 2,
  bonus: { },
  effect: (
    <>
      <Action />: Razzle Dazzle - Make a <Check type="Weave" />. For each <Success /> you 
      roll, choose a Skritter within range and grant them a <Dazzle /> resource. 
      (This action can target the Skritter carrying this item.)
      You cannot grant a Skritter more than one <Dazzle /> this way and 
      you cannot target a Skritter that already has a <Dazzle />.
    </>
  ),
};

const lashvineWhip: Equipment = {
  name: "Lashvine Whip",
  type: "weave",
  slot: "one-handed",
  range: 5,
  bonus: { dice: [d1d6] },
  effect: (<>
    As part of an <Attack /> with this weapon, you may cancel any number 
    of <Success plural /> to pull a creature closer to you by that many inches.
    This can pull creatures into Scuffles.
  </>),
  tags: ['PLANT'],
};

const songstaffWhistle: Equipment = {
  name: "Songstaff (Whistle)",
  type: "weave",
  slot: "one-handed",
  range: 6,
  bonus: { size: [1] },
  effect: (<>
    <Action />: Healsong - Make a <Check type="Weave" />. Each success 
    heals an ally by one health. You may spend 2 <Success plural/> to
    instead gain a <Whimsy /> resource.
  </>),
  tags: ['METALORPLANT'],
};

const coilWireRod: Equipment = {
  name: "Coil-Wire Rod",
  type: "weave",
  slot: "one-handed",
  range: 6,
  bonus: { dice: [d1d6] },
  effect: (<>
    You may target a second creature within 3" of your target for a
    second Coil-Wire Rod <Attack />. If a creature you're targetting has 
    two {metal} items, gain <PlusSize x={1} /> to the attack. If 
    you deal at least 3 damage to both creatures (each, not combined), 
    you gain a <Rush /> resource.
  </>),
  tags: ['ZAP'],
};

const poppingrockFlinger: Equipment = {
  name: "Poppingrock Flinger",
  type: "weave",
  slot: "one-handed",
  range: 6,
  bonus: { dice: [d3d6] },
  effect: <>
    (3" radius AoE, max 2 damage per target. Hits allies too?)
  </>
};

const brightrockStick: Equipment = {
  name: "Brightrock Stick",
  type: "weave",
  slot: "one-handed",
  range: 6,
  bonus: { dice: [d1d6] },
  effect: (<>
    At the start of the mission, gain a <Dazzle /> resource.
  </>),
  tags: ['GEM'],
};

const wildflowerWand: Equipment = {
  name: "Wildflower Wand",
  type: "weave",
  slot: "one-handed",
  range: 8,
  bonus: { dice: [d2d4] },
  effect: (<>
    <Attack plural /> with this have a bonus effect that
    depends on the remainder from your <Attack /> <Check /> (the number discarded after
    dividing by 3).
    <ol start={0}>
      <li>You may move 1" in any direction.</li>
      <li>Gain 2 Health.</li>
      <li>Gain +1 Success.</li>
    </ol>
  </>),
  tags: ['PLANT'],
};

const equipment = {
  // One-Handed
  razzleDazzle,
  lashvineWhip,
  songstaffWhistle,
  coilWireRod,
  poppingrockFlinger,
  brightrockStick,
  // Two-Handed
  wildflowerWand
};

export default equipment;
