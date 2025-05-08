import Keyword from "../../common/Keywords/Keyword";
import Action from "../../common/Keywords/rules/action/Action";
import Attack from "../../common/Keywords/rules/action/Attack";
import BrawlAttack from "../../common/Keywords/rules/action/BrawlAttack";
import RangedAttack from "../../common/Keywords/rules/action/RangedAttack";
import WeaveAttack from "../../common/Keywords/rules/action/WeaveAttack";
import Check from "../../common/Keywords/rules/Check";
import Defense from "../../common/Keywords/rules/Defense";
import Focus from "../../common/Keywords/rules/resources/Focus";
import Preserved from "../../common/Keywords/rules/resources/Preserved";
import Vigor from "../../common/Keywords/rules/resources/Vigor";
import Whimsy from "../../common/Keywords/rules/resources/Whimsy";
import MinusSize from "../../common/Keywords/rules/roll-modifiers/MinusSize";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import Success from "../../common/Keywords/rules/roll-modifiers/Success";
import Autumn from "../../common/Keywords/times/Autumn";
import Day from "../../common/Keywords/times/Day";
import Night from "../../common/Keywords/times/Night";
import Spring from "../../common/Keywords/times/Spring";
import Summer from "../../common/Keywords/times/Summer";
import Winter from "../../common/Keywords/times/Winter";
import Tag from "../../common/Tags/Tag";
import { Dice } from "../../types/types";
import Page from "../Page";

export default function CampaignPage() {
  const d1d4: Dice = { count: 1, sides: 4 };
  const d1d8: Dice = { count: 1, sides: 8 };
  return (<Page tab="campaign">
    <h1>Campaign Rules</h1>
    <p>
      In Skritters, the reccommended way to play is in a campaign. 
      A campaign is best run with a group of players all playing through a campaign together.
      Each player will assemble their own squad of Skritters, and play through a series of missions 
      against each other. The suggested campaign length is 8 missions in the following order:
    </p>
    <ol>
      <li><Spring />; <Day /></li>
      <li><Spring />; <Night /></li>
      <li><Summer />; <Day /></li>
      <li><Summer />; <Night /></li>
      <li><Autumn />; <Day /></li>
      <li><Autumn />; <Night /></li>
      <li><Winter />; <Day /></li>
      <li><Winter />; <Night /></li>
    </ol>
    <p>
      This cycle takes you over the course of a year, with each season having its own
      unique rule adjustements and challenges. More advanced players can choose to play
      longer or shorter campaigns, or even create their own custom campaign rules.
    </p>
    <h2>Day and Night</h2>
    <h3><Day /></h3>
    <p>
      Daytime is the default time of a mission. As such, it has no special rules or
      adjustments. There are some Skritters or abilities that may interact with or 
      change during the day, but those will be noted on the Skritter, weapon, or ability
      itself.
    </p>
    <h3><Night /></h3>
    <p>
      Nighttime comes with some difficulties and limitations for most Skritters.
      The dark night and exhaustion from a long day of play can make it difficult
      to properly execute in the thick of battle.
    </p>
    <ul>
      <li>
        <label className="bolded">Dark Night:</label> All Skritters 
        give -2" to <WeaveAttack plural /> and <RangedAttack plural />.
      </li>
      <li><label className="bolded">Exhaustion:</label> All checks, except checks to interact with
      an objective, have <MinusSize x={1} />. </li>
    </ul>
    <h2>Seasons of the Year</h2>
    <h3><Spring /></h3>
    <p>The vernal season. The spring rains and mud make travel harder, but new growth brings forth 
      plentiful gathering opportunities.
    </p>
    <ul>
      <li>
        <label className="bolded">Very Muddy:</label> Movement through muddy terrain must
        succeed a 1d6 <Check /> or get stuck, losing the rest of 
        the <Action type="Movement" />. If you start your movement in muddy terrain,
        you do not need to make this check unles you move more than 3" through the mud,
        or exit and re-enter mud during your movement.
      </li>
      <li>
        <label className="bolded">Soaked:</label> While a Skritter is not in a location
        that provides protection from the rain above (such as under a tree or a roof),
        it is considered to be soaked. A soaked Skritter has <MinusSize x={1} /> to
        all <RangedAttack plural /> and <BrawlAttack plural />.
      </li>
      <li>
        <label className="bolded">Spring Showers:</label> <Tag tag="WATERFOND" /> Skritters 
        get <PlusSize x={1} /> to all <WeaveAttack plural />.
      </li>
    </ul>
    <h3><Summer /></h3>
    <p>The summer sun brings warmth and light, but also
      heat and exhaustion. Skritters must be careful to avoid overheating.
    </p>
    <ul>
      <li>
        <label className="bolded">Extra Hours:</label> <Day /> mission get an extra round
        before they end.
      </li>
      <li>
        <label className="bolded">Shortened Nights:</label> For the first round of 
        a <Night /> mission, each Skritter get one less <Action />.
      </li>
      <li>
        <label className="bolded">Busywork:</label> The extra daylight brings with it
        opportunities for Skritters to gather and forage. Before a mission, each player
        begins with one <Focus />, <Vigor />, or <Whimsy /> resource.
      </li>
      <li>
        <label className="bolded">Swelter:</label> During <Day /> missions, Skritters 
        spend one action on each of their activations or they <Keyword bold>Overheat</Keyword>.
        When a Skritter <Keyword bold>Overheats</Keyword>, their opponent rolles a 1d6 <Check type="Overheat" /> against them.
        The target takes 1 damage for each success, and does not get to roll a <Defense /> to mitigate
        this damage. The <Check type="Overheat" /> is 2d6 against <Keyword>WATERFOND</Keyword> Skritters.
        <br />
        A skritter that moves through water terrain during their turn and/or a skritter that has equipment that has the <Keyword>WATER</Keyword> or <Keyword>ICE</Keyword> tag
        does not Overheat. Stowed equipment does not count for this (worn does).
      </li>
    </ul>
    <h3><Autumn /></h3>
    <p>
      Vibrant and dying foliage masks dangers as Skritters prepare for the long icy season
      ahead. But before the winter comes, the harvest bounty fuels trade and
      festivities.
    </p>
    <ul>
      <li>
        <label className="bold">Flammable:</label> <Attack plural /> with the <Keyword>FLAME</Keyword> tag
        get <PlusDice dice={d1d4} /> to their roll.
      </li>
      <li>
          <label className="bold">Dreadful Aura:</label> During <Night /> missions, <Action plural /> using items with 
          the <Keyword>GLOOMY</Keyword> tag get <PlusDice dice={d1d8} /> to their roll.
      </li>
    </ul>
    <h3><Winter /></h3>
    <p>
      Bitter cold grips the world in ice and snow, challenging survival but offering new paths across 
      the frozen landscape.
    </p>
    <ul>
      <li>
        <label className="bold">Harsh Chill:</label> On each Skritter's activation, they must consume one
        resource or spend an <Action /> to keep warm. If they do not, they begin freezing at the end of their
        activation. When a Skritter freezes, their opponent rolls a 1d6 <Check type="Freeze" /> against them. 
        The target takes 1 damage for each success, and does not get to roll a <Defense /> to mitigate
        this damage. The <Check type="Freeze" /> is 2d6 against <Keyword>COLD-BLOODED</Keyword> Skritters.
        <br />
        During <Night /> missions, the dice for the <Check type="Freeze" plural/> are d8s instead of d6s.
      </li>
    </ul>
    <h2>Post-Mission Wrap-up</h2>
    <p>
      After each mission, take go through teh following steps to handle what happens after the mission.
    </p>
    <ol>
      <li>
        Convert each unused resource into a <Preserved /> resource. Store these 
        resources until <Winter /> missions, when they can be used to help Skritters
        survive the Harsh Chill.
      </li>
      <li>
        For each Skritter that had to retreat from battle, make a 2d4 <Check type="Recovery" /> for them.
        Consult the following chart to determine what happens:
        <ul>
          <li>
            0 <Success plural />: The Skritter's injuries are too great, and they must retire. Using the
            standard rules for adding a Skritter to your squad, select a new Skritter to replace 
            the retired Skritter. The retired Skritter will provide it's <Keyword>Retirement</Keyword> bonuses
            to your team starting with the next mission.
          </li>
          <li>
            1 <Success />: The Skritter requires a longer recovery, and starts
            the next mission with -2 
          </li>
          <li>
            2 <Success plural />: The skritter makes a full recovery, and no further penalties apply.
          </li>
        </ul>
      </li>
      <li>
        If this was the last mission of a season, you can increase the size of your
        Skritter's squad by one. This can be done by adding a new Skritter to your squad
        following the standard rules for adding a Skritter to your squad. This happens
        even if you had to retire a Skritter in the previous step.
      </li>
    </ol>
  </Page>);
}
