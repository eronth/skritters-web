import Keyword from "../../../common/Keywords/Keyword";
import Action from "../../../common/Keywords/rules/action/Action";
import Attack from "../../../common/Keywords/rules/action/Attack";
import BrawlAttack from "../../../common/Keywords/rules/action/BrawlAttack";
import RangedAttack from "../../../common/Keywords/rules/action/RangedAttack";
import WeaveAttack from "../../../common/Keywords/rules/action/WeaveAttack";
import Check from "../../../common/Keywords/rules/check/Check";
import WeaveCheck from "../../../common/Keywords/rules/check/WeaveCheck";
import Cloak from "../../../common/Keywords/rules/cloak/Cloak";
import Defense from "../../../common/Keywords/rules/Defense";
import Dazzle from "../../../common/Keywords/rules/resources/Dazzle";
import Focus from "../../../common/Keywords/rules/resources/Focus";
import Hardy from "../../../common/Keywords/rules/resources/Hardy";
import Lucky from "../../../common/Keywords/rules/resources/Lucky";
import Rush from "../../../common/Keywords/rules/resources/Rush";
import Vigor from "../../../common/Keywords/rules/resources/Vigor";
import Whimsy from "../../../common/Keywords/rules/resources/Whimsy";
import MinusSize from "../../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../../common/Keywords/rules/roll-modifiers/PlusSize";
import Success from "../../../common/Keywords/rules/roll-modifiers/Success";
import Night from "../../../common/Keywords/times/Night";
import ItemTag from "../../../common/Tags/ItemTag";
import { Dice, Equipment } from "../../../types/types";

const d1d4: Dice = new Dice('1d4');
const d2d4: Dice = new Dice('2d4');
const d1d6: Dice = new Dice('1d6');
const d2d6: Dice = new Dice('2d6');
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
      Razzle Dazzle <Action />: Make a <WeaveCheck />. For each <Success /> you 
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
    Healsong <Action />: Make a <WeaveCheck />. Each success 
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

const sinnergoneDust: Equipment = {
  name: "Sinner-gone Dust",
  type: "weave",
  slot: "one-handed",
  range: 9,
  bonus: { },
  effect: (<>
    A Skritter hit by Sinner-gone Dust is knocked 3" in the direction of 
    your choice if you have at least 2 unblocked <Success plural />. 
    You can only knock each Skritter this way once per round.
    <br />
    If a Srkitter has Sinner-gone Dust and the Matchstick Torch, they can 
    make a Matchstick Torch attack using a <WeaveAttack /> and with a range of 9".
  </>),
};

const farstrikeWand: Equipment = {
  name: "Farstrike Wand",
  type: "weave",
  slot: "one-handed",
  range: 15,
  bonus: { dice: [d1d4] },
  effect: (<>
    This weapon can not target a creature within 8".
  </>)
};

const starWand: Equipment = {
  name: "Star Wand",
  type: "weave",
  slot: "one-handed",
  range: 8,
  bonus: { },
  effect: (<>
    When you deal damage to a Skritter with an <Attack /> from this weapon, you can swap places 
    with that Skritter.
  </>),
};

const pacifyingCenser: Equipment = {
  name: "Pacifying Censer",
  type: "weave",
  slot: "two-handed",
  range: 8,
  bonus: { },
  effect: (<>
    If you deal damage to a Skritter that is in a Scuffle, that Skritter 
    and all Skritters in the Scuffle with them gain 1 <Keyword>Pacifism</Keyword> Token.
    <br />
    Peace <Action />: Target a Skritter with a Weave check. 
    All Skritters in a Scuffle gets pacifism tokens based on number of <Success plural />.
    <ul>
      <li>1 - 2 <Success plural />: 1 <Keyword>Pacifism</Keyword> token.</li>
      <li>2 - 4 <Success plural />: 2 <Keyword>Pacifism</Keyword> tokens.</li>
      <li>5+ <Success plural />: 3 <Keyword>Pacifism</Keyword> tokens.</li>
    </ul>
    <br />
    <Keyword>Pacifism</Keyword> Token: A Skritter 
    with a <Keyword>Pacifism</Keyword> token gets <MinusSize x={1} /> 
    per Pacifism token to all <Attack plural />. At the end of their 
    activation, remove all Pacifism tokens.
  </>),
  tags: ['METAL'],
};

const shadeShardShtaff: Equipment = {
  name: "Shade Shard Shtaff",
  type: "weave",
  slot: "two-handed",
  range: 4,
  bonus: { dice: [d1d4] },
  effect: (<>
    You cannot make <Attack plural /> with this equipment.
    <br />
    Drape in Shadow <Action />: Make a <WeaveCheck />. A Skritter in range is draped
    in shadow  and can <Cloak /> X, where X 
    is the number of <Success plural />.
  </>),
  tags: ['GLOOMY'],
};

const bubbleStaff: Equipment = {
  name: "Bubble Staff",
  type: "weave",
  slot: "two-handed",
  range: 8,
  bonus: { dice: [d1d4] },
  effect: (<>
    Bubble Dome <Action />: Make a <WeaveCheck /> check. Create a Bubble Dome around a Skritter. 
    The Bubble Dome has a durability equal to the number of <Success plural />. The next <Attack /> that targets 
    the creature gets -X<MinusSize /> to their <Attack />. A Skritter cannot have more than 1 Bubble Dome
    on them at a time.
  </>),
  tags: ['WATER']
};

const zipzorpStaff: Equipment = {
  name: "Zipzorp Staff",
  type: "weave",
  slot: "two-handed",
  range: 6,
  bonus: { size: [1] },
  effect: (<>
    Zipzorp <Action />: To zipzorp, pick a location in range, ignoring all obstacles. 
    Make a <WeaveCheck />You teleport a number of inches equal 
    to the number of <Success plural /> in a straight line towards the chosen location.
  </>)
};

const hardshardBlock: Equipment = {
  name: "Hardshard Block",
  type: "weave",
  slot: "two-handed",
  range: 8,
  bonus: { size: [1] },
  effect: (<>
    At the start of the mission, gain an 2 <Hardy /> resources.
    <br />
    Add <PlusSize x={1} /> to <Defense />.
  </>),
  tags: ['GEM'],
};

const confettiPop: Equipment = {
  name: "Confetti Pop",
  type: "weave",
  slot: "two-handed",
  range: 8,
  bonus: { dice: [d2d6] },
  effect: (<>
    Your <WeaveAttack /> also targets all Skritters
    within 2" of your target.
    <br />
    You may only make one <WeaveAttack /> with this item
    per mission.
  </>)
};

const spikegemSpear: Equipment = {
  name: "--Spikegem Spear--",
  type: "weave",
  slot: "two-handed",
  range: 2,
  bonus: { },
  effect: (<>
    When you make an <Attack /> with this weapon, you
    can choose whether your <Attack /> with this weapon 
    is a <WeaveAttack /> or <BrawlAttack />. Regardless of choice, you add 
    your Weave and Brawl bonuses together for this attack. 
  </>)
};

const springbloomStaff: Equipment = {
  name: "Springbloom Staff",
  type: "weave",
  slot: "two-handed",
  range: 5,
  bonus: { dice: [d2d4] },
  effect: (<>
    Verdant Growth <Action />: Make a <WeaveCheck /> to
    grow and gain resources.
    At least 1 <Success />: Gain 1 <Focus />, <Vigor />, or <Whimsy />.
    At least 4 <Success plural />: May instead gain 1 <Hardy /> or <Rush />.
    At least 7 <Success plural />: May instead gain 1 <Lucky />.
  </>),
  tags: ['PLANT']
};

const illuminationRod: Equipment = {
  name: "Illumination Rod",
  type: "weave",
  slot: "two-handed",
  range: 6,
  bonus: { size: [2] },
  effect: (<>
    Anybody targeting Skritters within 3" of staff Wilder are 
    not affected by <Night /> penalties. The Skritter holding 
    this staff 
    gains <PlusDice dice={d1d6} /> against <RangedAttack plural/> and <WeaveAttack plural />.
  </>)
};

const lifebenderStaff: Equipment = {
  name: "Lifebender Staff",
  type: "weave",
  slot: "two-handed",
  range: 8,
  bonus: { dice: [d1d6, d1d4] },
  effect: (<>
    Whenever you damage a Skritter with this staff, 
    the Skritter weilding it gains unit gains an equal
    number of <Keyword>Lifeforce</Keyword> tokens.
    <br />
    Lifesurge <Action />: Make a <WeaveCheck /> and remove a number 
    of <Keyword>Lifeforce</Keyword> tokens to heal a target 
    by the same amount. (The max number of tokens you may remove for 
    this action is equal to the number of <Success plural /> you rolled.)
  </>)
};

const equipment = {
  // One-Handed
  razzleDazzle,
  lashvineWhip,
  songstaffWhistle,
  coilWireRod,
  poppingrockFlinger,
  brightrockStick,
  wildflowerWand,
  sinnergoneDust,
  farstrikeWand,
  starWand,
  // Two-Handed
  pacifyingCenser,
  shadeShardShtaff,
  bubbleStaff,
  zipzorpStaff,
  hardshardBlock,
  confettiPop,
  spikegemSpear,
  springbloomStaff,
  illuminationRod,
  lifebenderStaff,
};

export default equipment;
