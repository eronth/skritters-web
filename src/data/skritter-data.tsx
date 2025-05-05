import Action from "../common/Keywords/rules/action/Action";
import Attack from "../common/Keywords/rules/action/Attack";
import BrawlAction from "../common/Keywords/rules/action/BrawlAction";
import BrawlAttack from "../common/Keywords/rules/action/BrawlAttack";
import FreeAction from "../common/Keywords/rules/action/FreeAction";
import WeaveAction from "../common/Keywords/rules/action/WeaveAction";
import WeaveAttack from "../common/Keywords/rules/action/WeaveAttack";
import Check from "../common/Keywords/rules/Check";
import Cloak from "../common/Keywords/rules/cloak/Cloak";
import Defense from "../common/Keywords/rules/Defense";
import DiscoveredMarker from "../common/Keywords/rules/markers/DiscoveredMarker";
import FrostMarker from "../common/Keywords/rules/markers/FrostMarker";
import Adaptive from "../common/Keywords/rules/resources/Adaptive";
import Focus from "../common/Keywords/rules/resources/Focus";
import Hardy from "../common/Keywords/rules/resources/Hardy";
import Lucky from "../common/Keywords/rules/resources/Lucky";
import Ready from "../common/Keywords/rules/resources/Ready";
import Rush from "../common/Keywords/rules/resources/Rush";
import Vigor from "../common/Keywords/rules/resources/Vigor";
import MinusSize from "../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../common/Keywords/rules/roll-modifiers/PlusDice";
import Success from "../common/Keywords/rules/roll-modifiers/Success";
import Scuffle from "../common/Keywords/rules/Scuffle";
import Burrow from "../common/Keywords/rules/terrain/Burrow";
import Cover from "../common/Keywords/rules/terrain/Cover";
import BrawlThreat from "../common/Keywords/rules/threat/BrawlThreat";
import Autumn from "../common/Keywords/times/Autumn";
import Night from "../common/Keywords/times/Night";
import Spring from "../common/Keywords/times/Spring";
import Summer from "../common/Keywords/times/Summer";
import Winter from "../common/Keywords/times/Winter";
import Weapon from "../common/Keywords/rules/Weapon";
import ItemTag from "../common/Tags/ItemTag";
import { Dice, Skritter } from "../types/types"
const d1d4: Dice = new Dice('1d4');
const d1d6: Dice = new Dice('1d6');
const d2d6: Dice = new Dice('2d6');
const sageWisdom: React.ReactNode = <>While retired, this Skritter can pass on its Sage Wisdom.</>;
const prehensileTail: React.ReactNode = <>This Skritter can carry and wield an extra one-handed item using their tail. As such, they start with an extra item that does not count against their equipment limit.</>;
const burrows: {name: string; effect: React.ReactNode} = {
  name: "Burrows",
  effect: <>
    The Vole comes with <Burrow x={3} />. You can bring an
    extra <Burrow x={2} /> in place of one piece of equipment.
    A vole must end their turn outside a burrow, and will return next to the 
    burrow they entered if they end their turn without exiting (even if there are nearby enemies).
    <br />
    <Action />: The vole can enter a burrow if they are in contact with it. Remove them from the battlefield 
    while they are in a burrow. 
    <br />
    <FreeAction />: Scouter Vole can exit from any burrow they choose, so long as there are no 
    enemies within 15 inches of the chosen burrow. To exit a burrow, place the Scouter Vole in contact
    with the chosen burrow. 
    <br />
    <Action />: Scouter Vole can exit from any burrow they choose, so long as there are no 
    enemies within 6 inches of the chosen burrow. To exit a burrow, place the Scouter Vole in contact
    with the chosen burrow.
  </>,
};
const acornCache: {name: string; effect: React.ReactNode} = {
  name: "Acorn Cache",
  effect: <>
    You start with 4 acorn caches. When you deploy, you must place at least one in an opponent's 
    deployment zone. You may place up to one in your own deployment zone. The rest must be placed 
    outside your own deployment zone. You can use an <Action /> to search a cache you are in contact with.
    You can choose to find a <Focus />, <Vigor />, or <Rush /> resource inside.
  </>
};
const tongueLash: {name: string; effect: React.ReactNode} = {
  name: "Tongue Lash",
  effect: <>
    Your <BrawlThreat /> range is increased by 1".
    (Or, your actual attack range is 1"?)
  </>
};
const flitterAbout: {name: string; effect: React.ReactNode} = {
  name: "Flitter About",
  effect: <>This skritter has a 3" retreat.</>
};
const echolocate: {name: string; effect: React.ReactNode} = {
  name: "Echolocate",
  effect: <>
    Battle Bat has a <WeaveAttack /> with <PlusDice dice={d2d6} />. Creatures hit/damaged by
    this attack are marked with a 
    <DiscoveredMarker />. Next <Attack /> by a creature with Echolocate against this creature can use 
    the <DiscoveredMarker /> for <PlusDice dice={d1d4} />.
  </>
};


const porcupine: Skritter = {
  name: "Porcupine",
  description: "A porcupine",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('3d4')] },
    weave: { dice: [new Dice('1d6')] },
    defense: { dice: [new Dice('1d6')] },
    health: 5,
    size: "Medium",
  },
  abilities: [
    {
      name: "Quills",
      effect: <>When attacked in a <Scuffle />, you automatically hit your attacker
        for the same number of hits, up to 3.</>
    }
  ],
  retirement: [<>
    When Porcupine first retires, it can grant a member of your crew 
    1 <Weapon>Needle Blade</Weapon>.
    While retired, Porcupine grants 1 <Vigor /> resource at the start of each mission.
  </>],
  tags: [],
};

const armordilloKnight: Skritter = {
  name: "Armordillo Knight",
  description: "An Armordillo knight",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('2d4')] },
    brawl: { dice: [new Dice('2d6')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [new Dice('1d6'), new Dice('1d4')] },
    health: 6,
    size: "Large",
  },
  abilities: [
    {
      name: "Rollup",
      effect: <>
        <Action/> - Rollup: Armordillo Knight rolls into a defensive ball. When they do, your 
        defense checks get +Size and your movement gets -2".
        <br/>
        <Action /> - Unfurl: Armordillo Knight is no longer in a defensive ball, and gains
        a <Vigor /> or <Hardy /> resource.
      </>
    },
    {
      name: "Durable",
      effect: <>
        Armordillo Knight starts the mission with one <Hardy /> resource.
      </>
    },
    {
      name: "Shocking Shell",
      effect: <>
        The Armordillo Knight can bring a Shocking Shell 
        in place of one other piece of equipment. When attacked by a Skritter 
        using a Brawl attack with a <ItemTag tag='METAL' /> weapon, you may immediately make a 2d4 
        Brawl attack against that Skritter.
        Additionally, if you make a Brawl attack a Skritter that has a 
        non-weapon <ItemTag tag='METAL' /> item equipped, gain +1SIZE to the attack.
      </>
    }
  ],
  retirement: [<>
    While retired, Armordillo Knight grants a <Hardy /> resource at
    the start of each mission.
  </>],
  tags: ['CONCENTRATION'],
};

const scouterVole: Skritter = {
  name: "Scouter Vole",
  description: "A Scouter Vole",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('2d6')] },
    weave: { dice: [new Dice('1d6')] },
    defense: { dice: [new Dice('1d6')] },
    health: 4,
    size: "Small",
  },
  abilities: [burrows],
  retirement: [sageWisdom],
  sageWisdom: {
    type: "Burrows",
    effect: <>
      A Skritter with the Burrows Sage Wisdom gains the 
      Borrows ability (and all related actions) with <Burrow x={2} />, or 3 if
      Scouter Vole had extras.
    </>
  },
  tags: ['SCOUT'],
};

const blueJay: Skritter = {
  name: "Bluejay",
  description: "A Bluejay",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d4')] },
    brawl: { dice: [new Dice('2d4')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [new Dice('1d4')] },
    health: 3,
    size: "Small",
  },
  abilities: [
    {...flitterAbout},
    {
      name: "Flight",
      effect: <>
        <Action />: Bluejay can move 12". This counts as a Movement <Action />
        for any purposes. I'll rephrases this later to be "Bluejay's move statistic
        is 12" instead of 6" for one action".
      </>
    }
  ],
  retirement: [sageWisdom],
  sageWisdom: {
    type: "Floating Feather",
    effect: <>
      A Skritter with the Floating Feather Sage Wisdom gains the 
      Flitter About ability.
    </>
  },
  tags: ['FLIGHTY', 'SCOUT'],
};

const gecko: Skritter = {
  name: "Gecko",
  description: "A Gecko",
  stats: {
    movement: 7,
    ranged: { dice: [new Dice('3d4')] },
    brawl: { dice: [new Dice('2d6')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [new Dice('1d6')] },
    health: 5,
    size: "Small",
  },
  abilities: [
    {
      name: "Sticky Feet",
      effect: <>
        When you climb, you do not fall on difficult surfaces. Additionally, you add 
        <Success x={2} /> to
        climb checks.
      </>
    },
    {...tongueLash},
    {
      name: "Decoy Tail",
      effect: <>
        After seeing the result of an <Attack />, but before rolling <Defense />, 
        Gecko can choose to sacrifice their tail. If they do, the <Attack /> misses 
        Gecko instead of hitting.
        <br />
        Once sacrificed, the tail does not regrow until next season.
      </>
    }
  ],
  retirement: [],
  tags: ['COLD-BLOODED'],
};

const squirrel: Skritter = {
  name: "Squirrel",
  description: "A Squirrel",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('2d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { },
    defense: { dice: [d1d6] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Adrenaline Rush",
      effect: <>
        While under max health, squirrel gets +2" to Movement and <PlusDice dice={d1d6} /> to <Defense />.
      </>
    },
    {...acornCache}
  ],
  retirement: [],
  tags: ['DISTRACTED'],
};

const flyingSquirrel: Skritter = {
  name: "Flying Squirrel",
  description: "A Flying Squirrel",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('2d6')] },
    brawl: { dice: [new Dice('1d4')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [d1d6] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Glide",
      effect: <>
        When you jump from a high point, you may glide to the ground. As long as your movement 
        ends on the ground, you do not take damage from falling.
      </>
    },
    {...acornCache}
  ],
  retirement: [],
  tags: ['DISTRACTED'],
};

const frogWizard: Skritter = {
  name: "Frog Wizard",
  description: "A Frog Wizard",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { },
    weave: { dice: [new Dice('2d6'), new Dice('1d4')] },
    defense: { dice: [new Dice('1d4')] },
    health: 4,
    size: "Small",
  },
  abilities: [
    {
      name: "Leaping",
      effect: <>
        While moving, Frog Wizard can ignore up to 1" of Difficult Terrain. Additionally, 
        it gets <PlusDice dice={d1d6} /> to <Check type="Jump" plural />.
      </>
    }
  ],
  retirement: [],
  tags: ['WATERFOND', 'HELPFUL'],
};

const trenchRat: Skritter = {
  name: "Trench Rat",
  description: "A Trench Rat",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('2d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [new Dice('1d6')] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Rat-a-tat",
      effect: <>
        Rat can spend 2 <Action plural /> to make 3 <Attack plural />.
      </>
    },
    {
      name: "Night Sneak",
      effect: <>
        Rat can use an <Action /> to <Cloak x={2} /> during <Night /> missions.
      </>
    }
  ],
  retirement: [],
  tags: ['NOCTERNAL'],
};

const houseMouse: Skritter = {
  name: "House Mouse",
  description: "A House Mouse", 
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { },
    defense: { dice: [new Dice('1d6')] },
    health: 4,
    size: "Small",
  },
  abilities: [
    {
      name: "Scurry Scurry!",
      effect: <>
        Can swap weapons as part of a <Action type="Move" />.
      </>
    },
    {
      name: "Traps",
      effect: <>
        You start with 6 trap tokens, 4 false and 2 true. When you deploy, place them face down on the battlefield.
        When an enemy unit moves within 2" of a trap, it is triggered. Flip it to reveal whether it is false or true.
        If true, the trap immediately makes a <PlusDice dice={new Dice('2d8')} /> <BrawlAction /> against the triggering unit.
        The mouse who placed the trap can add bonuses to this check (for example, via <Vigor /> resources).
      </>
    }
  ],
  retirement: [],
  tags: ['SCOUT', 'HELPFUL'],
};

const raccoon: Skritter = {
  name: "Raccoon",
  description: "A Raccoon",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('2d6')] },
    weave: { nilout: true },
    defense: { dice: [new Dice('1d6')] },
    health: 6,
    size: "Large",
  },
  abilities: [
    {
      name: "Nimble Fingers",
      effect: <>
        Raccoon gets <Success x={1} /> on rolls to interact 
        with deployed equipment and objectives.
      </>
    }
  ],
  retirement: [],
  tags: ['NOCTERNAL'],
};

const leaftailGecko: Skritter = {
  name: "Leaftail Gecko",
  description: "A Leaftail Gecko",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { },
    defense: { dice: [new Dice('d4')] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Natural Disguise",
      effect: <>
        During <Spring /> and <Summer /> you have the ability to <Cloak x={3} /> as an <Action />. During <Autumn />, 
        you can <Cloak x={2} /> on a 1d6 <Check />. A failure does not use an <Action />.
      </>
    }
  ],
  retirement: [],
  tags: ['COLD-BLOODED'],
};

const chameleon: Skritter = {
  name: "Chameleon",
  description: "A Chameleon",
  stats: {
    movement: 5,
    ranged: { },
    brawl: { dice: [new Dice('1d6')] },
    weave: { },
    defense: { dice: [new Dice('d6')] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Camoflage",
      effect: <>
        <Action />: Chameleon can <Cloak x={3} />.
      </>
    },
    {...tongueLash}
  ],
  retirement: [],
  tags: ['COLD-BLOODED'],
};

const swampToad: Skritter = {
  name: "Swamp Toad",
  description: "A Swamp Toad",
  stats: {
    movement: 5,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { dice: [new Dice('1d6')] },
    defense: { dice: [new Dice('d6')] },
    health: 5,
    size: "Medium",
  },
  abilities: [
    {
      name: "Croak of Cloak",
      effect: <>
        Swamp Toad may <Cloak x={2} /> as an <Action />. During <Winter />, this adds a <FrostMarker />.
      </>
    }
  ],
  retirement: [],
  tags: ['WATERFOND', 'CONCENTRATION', 'COLD-BLOODED'],
};

const badger: Skritter = {
  name: "Badger",
  description: "A Badger",
  stats: {
    movement: 6,
    ranged: { },
    brawl: { dice: [new Dice('1d8'), d1d6] },
    weave: { nilout: true },
    defense: { dice: [new Dice('1d6')] },
    health: 6,
    size: "Large",
  },
  abilities: [
    {
      name: "Big Guy",
      effect: <>
        Small Skritters get <MinusSize x={1} /> and <Success x={-1} /> 
        on <BrawlAttack /> against Badger.
      </>
    }
  ],
  retirement: [],
  tags: [],
};

const battleBat: Skritter = {
  name: "Battle Bat",
  description: "A Battle Bat",
  stats: {
    movement: 6,
    ranged: { nilout: true },
    brawl: { dice: [new Dice('2d6')] },
    weave: { },
    defense: { dice: [new Dice('d4')] },
    health: 5,
    size: "Small",
  },
  abilities: [
    {...flitterAbout},
    {...echolocate},
  ],
  retirement: [],
  tags: ['FLIGHTY'],
};

const vampireBat: Skritter = {
  name: "Vampire Bat",
  description: "A Vampire Bat",
  stats: {
    movement: 6,
    ranged: { nilout: true },
    brawl: { dice: [new Dice('2d4')] },
    weave: { dice: [new Dice('1d4')] },
    defense: { dice: [new Dice('d4')] },
    health: 4,
    size: "Small",
  },
  abilities: [
    {...flitterAbout},
    {...echolocate},
    {
      name: "Blood Draw",
      effect: <>
        Each damage dealt by Vampire Bat with a <BrawlAttack /> heals the Vampire Bat by the same amount.
      </>
    }
  ],
  retirement: [],
  tags: ['FLIGHTY'],
};

const busyBeaver: Skritter = {
  name: "Busy Beaver",
  description: "A Busy Beaver",
  stats: {
    movement: 5,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('1d4')] },
    weave: { nilout: true },
    defense: { dice: [new Dice('d6')] },
    health: 5,
    size: "Large",
  },
  abilities: [
    {
      name: "Dammed Up",
      effect: <>
        Place <Cover x={2} /> that are 2" in length at the start of the mission.
      </>
    },
    {
      name: "Builder",
      effect: <>
        Spend 2 <Action plural /> to build a 1" <Cover /> within 1". For 1 
        additional <Action /> make it 3" long.
      </>
    }
  ],
  retirement: [],
  tags: ['WATERFOND'],
};

const veneratedCardinal: Skritter = {
  name: "Venerated Cardinal",
  description: "A Venerated Cardinal",
  stats: {
    movement: 6,
    ranged: { },
    brawl: { nilout: true },
    weave: { successes: [1] },
    defense: { dice: [new Dice('d4')] },
    health: 5,
    size: "Medium",
  },
  abilities: [
    {
      name: "Divine Chance",
      effect: <>
        Get a <Lucky /> resource at the start of the mission.
      </>
    },
    {
      name: "Divine Intervention",
      effect: <>
        At turn start, may heal someone within 2" with a 1d8 <WeaveAction /> or 
        make a 1d6 <WeaveAttack /> against someone or something with.
      </>
    }
  ],
  retirement: [],
  tags: ['FLIGHTY'],
};

const prairieDog: Skritter = {
  name: "Prairie Dog",
  description: "A Prairie Dog",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d4')] },
    brawl: { nilout: true },
    weave: { dice: [new Dice('1d6')] },
    defense: { dice: [new Dice('d4')] },
    health: 5,
    size: "Medium",
  },
  abilities: [
    {...burrows},
    {
      name: "Improved Healing",
      effect: <>
        Whenever Prairie Dog heals a Skritter, they gain <Success x={2} /> on the <Check type="Heal" />.
      </>
    }
  ],
  retirement: [],
  tags: ['HELPFUL'],
};

const luckyDuck: Skritter = {
  name: "Lucky Duck",
  description: "A Lucky Duck",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('2d4')] },
    brawl: { dice: [new Dice('2d4')] },
    weave: { dice: [new Dice('2d4')] },
    defense: { dice: [new Dice('1d6'), new Dice('1d4')] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Lucky, Lucky",
      effect: <>
        Start the mission with a <Lucky /> and <Adaptive /> resource.
      </>
    }
  ],
  retirement: [],
  tags: ['FLIGHTY', 'WATERFOND'],
};

const guardianTurtle: Skritter = {
  name: "Guardian Turtle",
  description: "A Guardian Turtle",
  stats: {
    movement: 5,
    ranged: { dice: [new Dice('1d4')] },
    brawl: { dice: [d1d6, new Dice('1d4')] },
    weave: { nilout: true },
    defense: { dice: [new Dice('1d6')] },
    health: 6,
    size: "Medium",
  },
  abilities: [
    {
      name: "Bearer of the Shield",
      effect: <>
        The Guardian Turtle gains the benefit of a <Weapon>Bottlecap Shield</Weapon> due to its hardened shell if it is 
        weilding no other shields. This shield does not take a hand to wield nor does it count against 
        your equipment limit. If you choose to take a different shield for the Guardian Turtle, 
        it does count against your equipment limit but still does not take a hand to wield.
      </>
    },
    {
      name: "Defender",
      effect: <>
        At the start of the mission, Guardian Turtle gives a <Hardy /> resource to one other Skritter on your team.
      </>
    }
  ],
  retirement: [],
  tags: ['STEADY', 'HELPFUL', 'COLD-BLOODED'],
};

const harvestMouse: Skritter = {
  name: "Harvest Mouse",
  description: "A Harvest Mouse",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { },
    defense: { dice: [new Dice('d6')] },
    health: 4,
    size: "Small",
  },
  abilities: [
    {
      name: "Scurry Scurry!",
      effect: <>
        This Skritter can swap weapons as part of a <Action type="Movement" />.
      </>
    },
    {
      name: "Prehensile Tail",
      effect: prehensileTail
    },
    {
      name: "Harvester",
      effect: <>
        Whenever Harvest Mouse collects one or more resources, it collects an additional <Ready /> resource.
      </>
    }
  ],
  retirement: [],
  tags: ['SCOUT', 'HELPFUL'],
};

const monkeyTailedSkink: Skritter = {
  name: "Monkey-Tailed Skink",
  description: "A Monkey-Tailed Skink",
  stats: {
    movement: 6,
    ranged: { dice: [new Dice('1d6')] },
    brawl: { dice: [new Dice('1d6')] },
    weave: { },
    defense: { dice: [new Dice('d4')] },
    health: 4,
    size: "Medium",
  },
  abilities: [
    {
      name: "Prehensile Tail",
      effect: prehensileTail
    }
  ],
  retirement: [],
  tags: ['COLD-BLOODED'],
};

const skritters = {
  porcupine,
  armordilloKnight,
  scouterVole,
  blueJay,
  gecko,
  squirrel,
  flyingSquirrel,
  frogWizard,
  trenchRat,
  houseMouse,
  raccoon,
  leaftailGecko,
  chameleon,
  swampToad,
  badger,
  battleBat,
  vampireBat,
  busyBeaver,
  veneratedCardinal,
  prairieDog,
  luckyDuck,
  guardianTurtle,
  harvestMouse,
  monkeyTailedSkink,
};

export default skritters;