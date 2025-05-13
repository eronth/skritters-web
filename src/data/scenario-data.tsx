import Day from "../common/Keywords/times/Day";
import Night from "../common/Keywords/times/Night";
import Match from "../common/Match";
import SkritterComponent from "../common/SkritterDisplay/SkritterComponent";
import { Dice, Scenario, Skritter } from "../types/types";

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
    Each player places a Pedestal
    model in their deployment zone, at least 3” from any battlefield edge. 
    Each player then places their Flag token on top of their Pedestal.
  </>,
  deployment: rolledDeployment,
  scoring: <>Capture flags to score victory points. See extra rules for more details.</>,
  endConditions: <>At the end of the 5th round, the <Match /> ends.</>,
  extraRules: <>
    High Intensity: All attack actions get +1d6+1d4.
    <br />
    Capture: A Skritter within 1” of an opponent’s flag may use an 
    action to collect it. If a Skritter carrying an opponent’s
     flag ends their movement within 1” of
      their own Pedestal, they gain 1 Victory Point. 
      Then they return the flag to their
       opponent, who places it back on the Pedestal. 
       When the opponent places the Flag on the Pedestal, 
       they may move the Pedestal by 1” in any direction.
    <br />
    Reclaim the Flag: While an opponent’s Skritter has your flag, your units get +1” to Movement.
    <br />
    Back in Action: If a Skritter would be forced to retreat, it is instead fully healed then placed on the edge of the battlefield inside their deployment zone. Skritters do not need to worry about retreat in this Scenario.
  </>
};

const threeLeggedRace: Scenario = {
  name: '3-Legged Race', type: 'neutral',
  setup: <>
    Place 4 Checkpoint tokens in the corners of the map, 
    labelled 1-4. Put the “Active” marker on the token labelled 1.
    <br />
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
    The <Match /> ends when one player has 4 Victory Points, or
    at the end of the 5th round.
  </>,
  scoring: <>
    When a Skritter ends their their movement within 1” of the
    active Checkpoint, that player gains 1 Victory point. 
    The Checkpoint becomes inactive and the next one becomes 
    active (if 4 was active, then 1 is next, otherwise it is 
    numerical order). 
    A Skritter pair cannot collect the same Checkpoint twice in a row.
  </>,
  extraRules: <>
    When one Skritter is activated, their paired partner is also activated at the same time. If you want to move your paired Skritters, you need to spend actions from BOTH Skritters. Skritters cannot move further than the slowest of the two, and if Skritters move beyond half of the movement of the Fastest, they must roll a SuCheck(1d6). 
    On a failure, they stumble and stop moving, ending the action.
    <br />
    If a Skritter would be forced to retreat, they do not retreat unless 
    their partner would also forced to retreat.
  </>,
};

const raidTheSupplyHouse: Scenario = {
  name: 'Raid the Supply House', type: 'neutral',
  setup: <>
    Designate four buildings (approx 3”x3”) total as Supply Houses. Each player takes turn choosing houses that are not inside their own deployment zone.
    <br />
    Create a pile of 15 Supply tokens next to the play area.
  </>,
  deployment: rolledDeployment,
  endConditions: <>
    If the number of Supply tokens reaches 0 during a round, the match ends at the end of that round.
    <br />
    At the end of the 5th round, the match ends.
    <br />
    Whichever player has the most Supply tokens at the end of the match gains 1 victory point.
  </>,
  scoring: <></>,
  extraRules: <>
    Raid: If inside a Supply House, you may use an action to Raid it. Roll a 1d6+1d4 Raid Check, with -1SIZE for each opponent in the same building. You gain one resource per success. Choose between Focus, Vigorous, Whimsical, and Hardy resources, up to one of each. If you had 3 successes, you may instead take one Ready resource. Reduce the number of Supply Tokens by the number of successes you rolled, regardless of how many (or which kinds) of resources you claimed.
    <br />
    If you gained at least 1 Supply token this way, this way, you gain 1 victory point, and neither you nor your opponent may attempt to Raid the same Supply House again this round.
    <br />
    If a single Supply House has been successfully Raided 3 times, mark it as “Exhausted”, and it cannot be Raided any more by any players.
  </>,
};

const wellWellWell: Scenario = {
  name: 'The Well, the Well, and the Well', type: 'neutral',
  setup: <>Place an objective marker (approx 1” to 2” diameter) in the center of the map, this represents the Great Well. Then, each player places an objective marker exactly 2” away from the Great Well marker. Each of these represents a lesser Well.</>,
  deployment: rolledDeployment,
  endConditions: <>At the end of the 4th round, the match ends.</>,
  scoring: <></>,
  extraRules: <>
    Any Well can be claimed with an action by a Skritter that is touching it while no enemy Skritters are touching it. When a well is claimed, put a “claimed” token representing that player on it. Wells that are claimed cannot be claimed again.
    <br />
    At the end of the round, you collect all of your “claimed” tokens and gain 1 Victory Point for each. The wells are no longer claimed. Additionally, if a player has at least one Skritter touching the Great Well while their opponent has none, that player gains 1 additional Victory Point.
  </>,
};

const treeUponAHill: Scenario = {
  name: 'Tree Upon a Hill', type: 'neutral',
  setup: <>Put a Hillside Tree in the center of the battlefield. This should be on a hilly piece of terrain.</>,
  deployment: basicDeployment,
  endConditions: <>At the end of the 4th round, the player with the least Victory Points rolls a dice. On a 3+, they choose if there is one more round or not. Otherwise the match ends after rounds.</>,
  scoring: <>At the end of each round, players gain 1 Victory Point for each Skritter they have on the Tree’s hill, and an additional Victory Point for each Skritter they have climbed into the Tree.</>,
  extraRules: <>
    A Skritter can use an action to shake the Hillside Tree. That Skritter rolls a Shake Brawl Check. Each Skritter currently in the tree (including friendly Skritters), make a Defense or Brawl check against the result of the Shake Check. If they roll less Successes than the Shake Check result, they fall from the tree to the ground below. A Skritter that falls this way does not take damage from either the check nor the fall.
    <br />
    A Skritter in the tree can use an action to Hold Tight. A Skritter that is Holding Tight gains a +2d4 to any Shake Check. After each Shake Check reduces the Hold Tight bonus by 1 Dice. A Skritter can use a Hold Tight action to reset the bonus.
  </>,
};

const bewareOfDogs: Scenario = {
  name: 'Beware of Dogs', type: 'neutral',
  setup: <>
    This is a <Day /> mission. 
    If you select this mission during a <Night />, play 
    Midnight Prowl instead.
    <br />
    Place a Dog House in the center of the battlefield. Each player gets one Hound they control, and places it within 1” of the Dog House. Make sure to clearly designate each Hound so you remember which is controlled by which player. 
    <br />
    Next, each player places 3 Trinket tokens around the battlefield within 8” of the Dog House.
  </>,
  deployment: rolledDeployment,
  endConditions: <>The match ends after 4 rounds.</>,
  scoring: <></>,
  extraRules: <>
  Whenever a Skritter picks up a Trinket, the controlling player gets 1 Victory Point. The controlling player gets an additional Victory Point if the opponent-controlled Hound is within 2” of the Trinket or Skritter.
  <h3>The Trinkets</h3>
  A Skritter can use an action to pick up a Trinket within 1”. When they do, they gain one Focus, Vigorous, Whimsical, or Hardy resource. If the opponent-controlled Hound is within a certain distance of the Trinket or Skritter, they can choose to gain one of the following resources:
  Within 2” -  May choose a Ready, Rush, or Dazzling resource instead.
  Within 1” - May choose a Dazzling or Adaptive resource instead.

  After picking up a Trinket, hand it to your opponent. They immediately place it anywhere on the battlefield that is at least 4” from any Skritter or Trinket (it does not need to be 4” from any Hounds). If no such location exists, or the opponent does not wish to use any of the valid locations, the Trinket may be placed within 1” of the Dog House.

  <h3>The Hounds</h3>
  Each player controls one of the Hounds. Instead of having their own activation, a Hound has 3 actions that can be used after another model finishes its activation. You may use one action this way at a time. The Hound you control is not considered an ally, and therefore cannot be given any bonuses or benefits (such as resources) from your team.

  The Hounds will never attack each other.

  A Hound has the following stats.
  <SkritterComponent skritter={hound} />
</>,
};

const midnightProwl: Scenario = {
  name: 'Midnight Prowl', type: 'neutral',
  setup: <>
    This is a <Night /> mission.
    If you select this mission during a <Day />, play
    Beware of Dogs instead.
    <br />
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
  scoring: <>Each time one of your Skritters enters your destination for the first time, you gain 1 Victory Point.</>,
  extraRules: <></>,
};

const leadership: Scenario = {
  name: 'Leadership', type: 'neutral',
  setup: <>Each player secretly picks one of their Skritters to be their Leader. Mark this choice down in secret (e.g., on a face-down piece of paper).</>,
  deployment: <></>,
  endConditions: <>At the end of the 4th round, the match ends.</>,
  scoring: <>At the end of the match, reveal your secretly chosen Leader. You gain 1 Victory Point for every Skritter your Leader caused to retreat, and you gain 2 Victory Points if your opponent’s Leader retreated.</>,
  extraRules: <></>,
};

const scenarios = {
  captureTheFlag,
  raidTheSupplyHouse,
  threeLeggedRace,
  wellWellWell,
  treeUponAHill,
  bewareOfDogs,
  midnightProwl,
  crossingPaths,
  leadership,

}

export default scenarios;
