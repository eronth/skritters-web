import Bsp from "../common/Formatting/bsp";
import Action from "../common/Keywords/rules/action/Action";
import Attack from "../common/Keywords/rules/action/Attack";
import Check from "../common/Keywords/rules/check/Check";
import Cloak from "../common/Keywords/rules/cloak/Cloak";
import Adaptive from "../common/Keywords/rules/resources/Adaptive";
import Dazzle from "../common/Keywords/rules/resources/Dazzle";
import Focus from "../common/Keywords/rules/resources/Focus";
import Hardy from "../common/Keywords/rules/resources/Hardy";
import Ready from "../common/Keywords/rules/resources/Ready";
import Rush from "../common/Keywords/rules/resources/Rush";
import Vigor from "../common/Keywords/rules/resources/Vigor";
import Whimsy from "../common/Keywords/rules/resources/Whimsy";
import MinusSize from "../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../common/Keywords/rules/roll-modifiers/PlusSize";
import Success from "../common/Keywords/rules/roll-modifiers/Success";
import Day from "../common/Keywords/times/Day";
import Night from "../common/Keywords/times/Night";
import VictoryPoint from "../common/Keywords/VictoryPoint/VictoryPoint";
import Match from "../common/Match";
import SkritterCard from "../common/SkritterDisplay/SkritterCard";
import { Dice, Scenario, Skritter } from "../types/types";

const d1d4 = new Dice('1d4');
const d1d6 = new Dice('1d6');
const d2d6 = new Dice('2d6');
const d1d8 = new Dice('1d8');

const hound: Skritter = {
  name: 'Hound',
  description: "",
  stats: {
    movement: 5,
    ranged: { nilout: true },
    brawl: { dice: [d1d8, d2d6] },
    weave: { nilout: true },
    defense: { dice: [d2d6] },
    health: 10,
    size: 'Large',
  },
  abilities: [
    {
      name: 'Hard to Beat',
      effect: <>
        Whenever a Hound takes damage, it is moved that many inches by the non-controlling player.
        <br />
        If a Hound is ever reduced to 0 Health, it retreats into the Dog House. It cannot take any more actions this round and must use an action next round to recover, which sets the Hound back to 10 health and allows it to exit the Dog House. Exit the Dog House by placing the Hound next to it, touching. 
      </>,
    },
    {
      name: 'Go Home',
      effect: <>
        A Hound can use two actions to return to the Dog House. This is not the same as retreating to the Dog House, and so does not prevent further actions . The Dog is immediately placed touching the Dog House.
      </>,
    },
    {
      name: 'Snooze',
      effect: <>
        While within 2” of the Dog House, a Hound can use an action to heal 3 Health.
      </>
    }
  ],
  retirement: [],
  tags: [],
}

const basicDeployment = <>basicDeployment</>;
const rolledDeployment = <>
  For this Scenario, randomly select one of the 
  generic deployment styles.
</>;

const captureTheFlag: Scenario = {
  name: 'Capture the Flag', type: 'neutral',
  setup: <>
    Each player places a Pedestal model in their
    deployment zone, at least 3” from any battlefield
    edge. Each player then places their Flag token on
    top of their Pedestal.
  </>,
  deployment: rolledDeployment,
  scoring: <>
    Grab the opponent's flag and bring it back to your
    Pedestal for <VictoryPoint x={1} /> each time.
  </>,
  endConditions: <>At the end of the 5th round, the <Match /> ends.</>,
  extraRules: <>
    <b>High Intensity</b>: All <Attack plural/>
    <Bsp />get <PlusDice dice={d1d6} /><PlusDice dice={d1d4} />.
    <br /><br />
    <Action type='Grab Flag' />: A Skritter within 1” of
    an opponent's flag may use an action to Grab it.
    Place it on that Skritter's rule card.
    Flags grabbed this way must be on the Pedestal
    or ground — you <i>cannot</i> grab a flag from
    another Skritter this way.
    <br /><br />
    <Action type='Pass!' />: A Skritter can use an action to pass
    the flag to another Skritter. This cannot be used to pass the
    flag to any active Skritter.
    <br /><br />
    <b>Capture</b>: If a Skritter carrying an opponent's
    flag ends their movement within 1” of
    their <b>own</b> Pedestal, they gain <VictoryPoint x={1} />. 
    Then they return the flag to their
    opponent, who places it back on the Pedestal. 
    When the opponent places the Flag on the Pedestal, 
    they may move the Pedestal by 2” in any direction.
    <br /><br />
    <b>Protect the Flag!</b>: While an opponent's
    Skritter has your flag, your units get +2” to Movement.
    <br /><br />
    <b>Back in Action</b>: If a Skritter would be forced to retreat,
    it is instead fully healed then placed on the edge of
    the battlefield inside their deployment zone at the start
    of the next round. Skritters do not need to worry about
    Defeat and Retreat in this Scenario.
    <br /><br />
    <b>Dropped Flag</b>: If a Skritter carrying a flag is 
    is defeated, the flag is placed where the Skritter was
    standing when they were defeated. The flag cannot be
    grabbed or moved by the owner.
  </>
};

const threeLeggedRace: Scenario = {
  name: '3-Legged Race', type: 'neutral',
  setup: <>
    Place 4 Checkpoint tokens in the corners of the map, 
    labelled 1 through 4. Put the “Active” marker on the token labelled 1.
    <br /><br />
    Each player groups all of their Skritters together in pairs of 2.
  </>,
  deployment: <>
    Paired Skritters are deployed with their bases touching, 
    and cannot separate for any reason.
    <br />
    Each player must deploy their paired Skritters such that at least one
    of them is within 2” of the Checkpoint token labelled 4.
  </>,
  endConditions: <>
    The <Match /> ends when one player has <VictoryPoint x={4} />, or
    at the end of the 5th round.
  </>,
  scoring: <>
    When a Skritter ends their their movement within 1” of the
    active Checkpoint, that player gains <VictoryPoint x={1} />. 
    The Checkpoint becomes inactive and the next one becomes 
    active (if 4 was active, then 1 is next, otherwise it is 
    numerical order).
    <br /><br />
    A Skritter pair cannot collect the same Checkpoint twice in a row.
  </>,
  extraRules: <>
    When one Skritter is activated, their paired partner is also
    activated at the same time. If you want to move your paired
    Skritters, you need to spend actions from BOTH Skritters.
    Skritters cannot move further than the slowest of the two,
    and if Skritters move beyond half of the movement of the Fastest,
    they must roll a SuCheck(1d6). On a failure, they stumble and 
    stop moving, ending the action.
    <br /><br />
    If a Skritter would be forced to retreat, they do not retreat unless 
    their partner would also forced to retreat.
  </>,
};

const raidTheSupplyHouse: Scenario = {
  name: 'Raid the Supply House', type: 'neutral',
  setup: <>
    Each player takes turn choosing buildings
    (approx 3”x3” each) that are not inside their
    own deployment zone to serve as a Supply House.
    Do this until there are 4 total Supply Houses
    on the battlefield.
    <br /><br />
    Create a pile of 15 Supply tokens next to the play area.
  </>,
  deployment: rolledDeployment,
  endConditions: <>
    If the number of Supply tokens reaches 0 during a round,
    the match ends at the end of that round.
    <br /><br />
    At the end of the 5th round, the match ends.
  </>,
  scoring: <>
    Successfully Raid a house to gain <VictoryPoint x={1} />.
    <br/><br/>
    Whichever player has the most Supply tokens
    at the end of the match gains an additional
    <Bsp /><VictoryPoint x={1} />.
  </>,
  extraRules: <>
    <Action type='Raid' />: If inside a Supply House, you may use an action
    to Raid it. Roll a 1d6+1d4 <Check type='Raid' />, with
    <Bsp /><MinusSize x={1} /> for each enemy Skritter in the
    same building. You gain one resource per <Success />.
    <br />
    Choose between <Focus />, <Vigor />, <Whimsy />, and
    <Bsp /><Hardy /> resources, up to one of each. If you
    had <Success x={3} />, you may instead take one<Bsp />
    <Ready /> resource. Reduce the number of Supply Tokens
    by the number of <Success plural /> you rolled, regardless
    of how many (or which kinds) of resources you claimed.
    <br /><br />
    If you gained at least 1 Supply token this way, this way,
    you gain <VictoryPoint x={1} />, and neither you nor your
    opponent may attempt to Raid the same Supply House again
    this round.
    <br /><br />
    If a single Supply House has been successfully Raided 3
    times, mark it as “Exhausted”, and it cannot be Raided
    any more by any players.
  </>,
};

const wellWellWell: Scenario = {
  name: 'The Well, the Well, and the Well', type: 'neutral',
  setup: <>
    Place a Great Well marker (approx 1” to 2” diameter)
    in the center of the map. Then, each player places a
    Lesser Well objective marker exactly 2” away from the
    Great Well marker.
  </>,
  deployment: rolledDeployment,
  endConditions: <>At the end of the 4th round, the match ends.</>,
  scoring: <>
    At the end of the round, you collect all of your “claimed”
    tokens and gain <VictoryPoint x={1} /> for each. The wells
    are no longer claimed. Additionally, if a player has at
    least one Skritter touching the Great Well while their
    opponent has none, that player gains 1 additional <VictoryPoint x={1} />.
  </>,
  extraRules: <>
    Any Well can be claimed with an action by a Skritter
    that is touching it while no enemy Skritters are
    touching it. When a well is claimed, put a “claimed”
    token representing that player on it. Wells that are
    claimed cannot be claimed again.
  </>,
};

const treeUponAHill: Scenario = {
  name: 'Tree Upon a Hill', type: 'neutral',
  setup: <>Put a Hillside Tree in the center of the battlefield. This should be on a hilly piece of terrain.</>,
  deployment: basicDeployment,
  endConditions: <>At the end of the 4th round, the player with the least <VictoryPoint plural /> rolls a dice. On a 3+, they choose if there is one more round or not. Otherwise the match ends after rounds.</>,
  scoring: <>At the end of each round, players gain <VictoryPoint x={1} /> for each Skritter they have on the Tree's hill, and an additional <VictoryPoint x={1} /> for each Skritter they have climbed into the Tree.</>,
  extraRules: <>
    A Skritter can use an action to shake the Hillside Tree. That Skritter rolls a Shake Brawl Check. Each Skritter currently in the tree (including friendly Skritters), make a Defense or Brawl check against the result of the Shake Check. If they roll less Successes than the Shake Check result, they fall from the tree to the ground below. A Skritter that falls this way does not take damage from either the check nor the fall.
    <br />
    A Skritter in the tree can use an action to Hold Tight. A Skritter that is Holding Tight gains a +2d4 to any Shake Check. After each Shake Check reduces the Hold Tight bonus by 1 Dice. A Skritter can use a Hold Tight action to reset the bonus.
  </>,
};

const bewareOfDogs: Scenario = {
  name: 'Beware of Dogs', type: 'neutral',
  setup: <>
    This is a <Day /> <Match />.
    If you select this <Match /> during a <Night />,
    play <a href={'#scenario-midnight-prowl'}>
      Midnight Prowl
    </a> instead.
    <br /><br />
    Place a Dog House in the center of the battlefield.
    Each player gets one Hound they control, and places
    it within 1” of the Dog House. Make sure to clearly
    designate each Hound so you remember which is
    controlled by which player. 
    <br /><br />
    Next, each player places 3 Trinket tokens around the
    battlefield within 8” of the Dog House.
  </>,
  deployment: rolledDeployment,
  endConditions: <>The match ends after 4 rounds.</>,
  scoring: <>
    Whenever a Skritter picks up a Trinket, the controlling
    player gets <VictoryPoint x={1} />. The controlling player
    gets an additional <VictoryPoint x={1} /> if the opponent-controlled
    Hound is within 2” of the Trinket or Skritter.
  </>,
  extraRules: <>
  <h3>The Trinkets</h3>
  <p>
    A Skritter can use an action to pick up a Trinket within 1”.
    When they do, they gain one Focus, <Vigor />, <Whimsy />, or
    <Bsp /><Hardy /> resource. If the opponent-controlled Hound
    is within a certain distance of the Trinket or Skritter,
    they can choose to gain one of the following resources:

    <br />Within 2” -  May choose a <Ready /> or <Rush /> resource instead.
    <br />Within 1” - May choose a <Dazzle /> or <Adaptive /> resource instead.
    <br /><br />
    After picking up a Trinket (and gaining your <VictoryPoint plural />),
    hand it to your opponent. They immediately place it anywhere
    on the battlefield that is at least 4” from any Skritter
    or Trinket (it does not need to be 4” from any Hounds).
    If no such location exists, or the opponent does not wish
    to use any of the valid locations, the Trinket may be
    placed within 1” of the Dog House.
  </p>
  
  <h3>The Hounds</h3>
  Each player controls one of the Hounds. Instead of having their own activation, a Hound has 3 actions that can be used after another model finishes its activation. You may use one action this way at a time. The Hound you control is not considered an ally, and therefore cannot be given any bonuses or benefits (such as resources) from your team.

  The Hounds will never attack each other.

  A Hound has the following stats.
  <SkritterCard skritter={hound} />
</>,
};

const midnightProwl: Scenario = {
  name: 'Midnight Prowl', type: 'neutral',
  setup: <>
    This is a <Night /> <Match />.
    If you select this <Match /> during a <Day />,
    play <a href={'#scenario-beware-of-dogs'}>
      Beware of Dogs
    </a> instead.
    <br /><br />
    Each player places two Prowl tokens in the middle of the field. One is a Hunter token and the other is a Shadow token.
  </>,
  deployment: basicDeployment,
  endConditions: <>idk</>,
  scoring: <>idk</>,
  extraRules: <>idk</>,
};

const crossingPaths: Scenario = {
  name: 'Crossing Paths', type: 'neutral',
  setup: <>
  Place one Focus, Vigorous, Whimsical, or Hardy resource on each of your Skritters. Also place a Ready resource and a Basic resource on each Skritter. Basic resources cannot be used to modify dice rolls.
</>,
  deployment: <>Player deployment zones are not across from each-other as normal. Instead, they are two edges forming a right angle on the board (e.g., and L shape) with one edge per player. Designate the edge across from your deployment zone as your destination.</>,
  endConditions: <>
    At the end of the 4th round, the match ends.
  </>,
  scoring: <>Each time one of your Skritters enters your destination for the first time, you gain <VictoryPoint x={1} />.</>,
  extraRules: <>
  While your Skritter is in your destination during your activation, you may choose to have it immediately stash any resources they carry as Stored resources.

When a Skritter retreats, they drop all resources they are currently carrying at their location in a pile. A pile can be picked up by a Skritter by using an action.

  </>,
};

const leadership: Scenario = {
  name: 'Leadership', type: 'neutral',
  setup: <>Each player secretly picks one of their Skritters to be their Leader. Mark this choice down in secret (e.g., on a face-down piece of paper).</>,
  deployment: <></>,
  endConditions: <>At the end of the 4th round, the match ends.</>,
  scoring: <>At the end of the match, reveal your secretly chosen Leader. You gain <VictoryPoint x={1} /> for every Skritter your Leader caused to retreat, and you gain <VictoryPoint x={2} /> if your opponent's Leader retreated.</>,
  extraRules: <></>,
};

const holdTheLine: Scenario = {
  name: 'Hold the Line', type: 'assault&guard',
  setup: <>
  Mark a line 3” from the guarding player's deployment zone (towards the middle of the battlefield). This is “The Line”. The guarding player may deploy two 2” long Walls (2” high) and two 2” long Cover (1” high?) along this line.</>,
  deployment: <></>,
  endConditions: <>
  At the end of the 3rd round, the match ends. The assaulting player gains <VictoryPoint x={1} /> for each of their Skritters that is past The Line, while the guarding player gains <VictoryPoint x={1} /> for each of the assaulting player's Skritters that is NOT past The Line. Skritters that retreated are not considered past The Line.</>,
  scoring: <></>,
  extraRules: <>
  Any time the assaulting player has a Skritter that is past The Line retreat, they must retreat towards the line in as direct of a path as possible, potentially passing back over the line. If a retreat made this way would put that Skritter into a Scuffle with another Skritter, they do so.
  </>,
};

const ambush: Scenario = {
  name: 'Ambush', type: 'assault&guard',
  setup: <>
    The guarding player's deployment zone is a circle in the middle of the board that has a 3” radius. Place 3 Treasure tokens in the guarding player's deployment zone. The assaulting player's Deployment zone is a 1” thick band around all edges of the board.
  </>,
  deployment: <></>,
  endConditions: <>
    At the end of the 4th round, either player can request a dice is rolled. On a 3+, the match lasts one more round, otherwise the match ends.*
  </>,
  scoring: <>
    After the match ends, the assaulting player gains <VictoryPoint x={1} /> for each Treasure token they have at least one Skritter within 1” of, and <VictoryPoint x={2} /> for each Treasure token they Secured. The guarding player gains <VictoryPoint x={1} /> for each Treasure token they have at least one Skritter within 1” of, and <VictoryPoint x={2} /> for each Treasure token that is in their deployment zone.
  </>,
  extraRules: <>
    A Skritter can use an action to move a Treasure token that is within 1” of them. That Skritter can move up to half of their movement, then the player places the Treasure token touching the Skritter.
    <br />
    If you try to move a Treasure token that is currently being touched
    by another Skritter with a Stealing action. To do so, make a
    Brawl check vs that Skritter's Brawl or Defense check. If either
    Skritter is larger than the other, the larger Skritter gets
    <Bsp /><PlusSize x={1} /> to their check.
    <br />
    If you
    have more successes than them, you steal the Treasure and move
    with it. Otherwise, the action fails, and that Skritter
    cannot attempt to move that Treasure token again this round.
    <br />
    No damage is dealt when stealing a treasure token.
    <br />
    If the assaulting player moves a Treasure token into their deployment zone, it becomes Secured and cannot be moved.
  </>,
};

const supplySnatch: Scenario = {
  name: 'Supply Snatch', type: 'assault&guard',
  setup: <>
    Half of the board is designated as the guarding player's
    territory. The back half is their deployment zone and territory.
    The front half is territory, but not deployment zone.
    <br /><br />
    The guarding player starts with 20 Supply tokens, divided into 4
    piles of 5 tokens. The guarding player must deploy all piles on
    their territory, with at least 2” between piles. A maximum of 1
    pile can be placed in their deployment zone, at least 1” from the
    edge of the battlefield, the rest must be outside the deployment zone. 
    <br /><br />
    The guarding player may then place one 2” long piece of cover per pile.
    I recommend placing one near each pile, but this is not required.
    </>,
  deployment: <>{basicDeployment}</>,
  endConditions: <>
    At the end of the 4th round, the assaulting player can choose to
    roll a 1d6. On a 3+, the match lasts one more round. Otherwise
    the match ends.
  </>,
  scoring: <>
    At the end of the <Match />, each player gains <VictoryPoint x={1} />
    <Bsp />per every 2 Supply tokens they currently control.
    <br /><br />
    The assaulting
    player controls all Supply tokens carried by their Skritters and all
    Supply tokens in their Team Stockpile.
    <br /><br />
    The guarding player controls
    all other Supply tokens, including ones that were initially Snatched
    but then dropped for any reason.
  </>,
  extraRules: <>
    If a Skritter is within 1” of a pile of Supply tokens, it may attempt
    a 2d6 Snatch check. That Skritter snatches a number of Supply tokens
    equal to the <Success plural />, take the tokens and put them on the
    Skritter's sheet.
    <br /><br />
    If a Skritter carrying Supply tokens is forced to retreat, it immediately
    drops those tokens in a new pile touching the base prior to being removed
    from the battlefield for retreating.
    <br /><br />
    If at any point a Skritter carrying Supply tokens is outside of the
    guarding player's territory, the player controlling that Skritter can
    immediately take the tokens off that Skritter's card and put them in the
    Team Stockpile (off of the battlefield). These tokens cannot be reclaimed
    in any way.
  </>,
};

const hideAndGoSeek: Scenario = {
  name: 'Hide and Go Seek', type: 'assault&guard',
  setup: <>
    The assaulting player deploys two 4”
    tall Watchlight Towers on their side
    of the battlefield, at least 3” apart.
    <br /><br />
    The guarding player then deploys a
    single 4” tall Lookout Tower in their
    deployment zone if they choose.
  </>,
  deployment: <>
    When deploying units,
    the guarding player deploys one
    (and only one) of their Skritters
    outside of their deployment zone,
    touching it. This will be the first
    hiding Skritter when the <Match />
    <Bsp />begins.
  </>,
  endConditions: <>
    At the end of the 4th round, the guarding player
    may choose to roll a d6. On a 3+, the match lasts
    one more round. Otherwise the match ends.
  </>,
  scoring: <>
    Any time the Hiding Skritter is
    revealed for any reason, the assaulting
    player gains <VictoryPoint x={1} />. At
    the end of a round, if the Hiding player
    is still <Cloak ed/>, the guarding player
    gains <VictoryPoint x={1} />.
  </>,
  extraRules: <>
    <h3>Hiding</h3>
    At the start of each round, if the guarding player
    does not have a Skritter that is Hiding, they
    choose one to Hide. They must choose a Skritter
    that is not in their deployment zone, if they
    control no Skritters outside of their deployment
    zone, they may move a Skritter up to 1” to exit
    the deployment zone. If there are still no Skritters
    outside of the deployment zone, it is treated as
    though a Skritter was immediately revealed (thus 
    awarding a <VictoryPoint x={1} /> to the assaulting
    player).
    <br /><br />
    The hiding Skritter will then <Cloak x={2} />, or
    if it is <Night /> they <Cloak x={3} />. If the
    hiding Skritter is Small, add +1 to the Cloak
    value. Immediately after Cloaking the hiding
    Skritter, the player makes a move action with
    that Skritter. The Hiding Skritter's
    Cloaks cannot enter the guarding player's
    deployment zone for any reason.
    <br /><br />
    The hiding Skritter does take normal turns. Instead,
    immediately before or after the activation of each of
    the guarding player's Skritters, that player may have
    their Hiding Skritter take one action.
    <h3>Towers</h3>
    A Skritter may use an action to move
    1” and climb up or down the entire length of
    a Tower, regardless of their move stat.
    They can make the 1” move either before
    or after they climb.
    <br /><br />
    A Skritter inside a Watchlight Tower can use
    an action to target any Cloak token they can
    see. This Cloak token is then either revealed
    or dismissed as normal.
    The Watchlight Towers have 4 health and a
    Defense of 1d6. If it is destroyed, any Skritter
    inside the tower falls to the ground, then the
    Watchlight Tower is removed.
    <br /><br />
    The Lookout Tower cannot be attacked. A Skritter
    making a Ranged or Weave attack from the Lookout
    tower does not consider height when measuring distance.
  </>,
};


// Vengeance
// Lower VP player choses both units.

// Showdown
// Both players pick their units.

// Bully
// Higher VP player chooses both units.

// Random Meetings
// Each player picks the other's unit.


const scenarios = [
  captureTheFlag,
  raidTheSupplyHouse,
  threeLeggedRace,
  wellWellWell,
  treeUponAHill,
  bewareOfDogs,
  midnightProwl,
  crossingPaths,
  leadership,

  holdTheLine,
  ambush,
  supplySnatch,
  hideAndGoSeek,
];

export default scenarios;
