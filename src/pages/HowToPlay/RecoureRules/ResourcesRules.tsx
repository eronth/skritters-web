import Bsp from "../../../common/Formatting/bsp";
import Attack from "../../../common/Keywords/rules/action/Attack";
import WeaveAttack from "../../../common/Keywords/rules/action/WeaveAttack";
import BrawlCheck from "../../../common/Keywords/rules/check/BrawlCheck";
import Check from "../../../common/Keywords/rules/check/Check";
import RangedCheck from "../../../common/Keywords/rules/check/RangedCheck";
import WeaveCheck from "../../../common/Keywords/rules/check/WeaveCheck";
import Defense from "../../../common/Keywords/rules/Defense";
import Adaptive from "../../../common/Keywords/rules/resources/Adaptive";
import Dazzle from "../../../common/Keywords/rules/resources/Dazzle";
import Focus from "../../../common/Keywords/rules/resources/Focus";
import Hardy from "../../../common/Keywords/rules/resources/Hardy";
import Lucky from "../../../common/Keywords/rules/resources/Lucky";
import Preserved from "../../../common/Keywords/rules/resources/Preserved";
import Ready from "../../../common/Keywords/rules/resources/Ready";
import Rush from "../../../common/Keywords/rules/resources/Rush";
import Vigor from "../../../common/Keywords/rules/resources/Vigor";
import Whimsy from "../../../common/Keywords/rules/resources/Whimsy";
import PlusDice from "../../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../../common/Keywords/rules/roll-modifiers/PlusSize";
import { Dice } from "../../../types/types";
import './RecourcesRules.css';

export default function ResourcesRules() {
  return (<>
    <h2>Resources</h2>
    <p>
      Some abilities or effects cause you to gain resources.
      Any resources gained by a specific Skritter are placed
      on that Skritter's card (or wherever we designate Skritter
      specific stuff). Otherwise, the resource is set aside near
      your team's info. Resources owned by a Skritter may only
      be used by that Skritter to affect their own actions.
    </p>
    <p>
      Spend resources to gain a bonus. The basic resources
      and their effects are listed below:
    </p>
    <div className="resources-grid">
      <span><Focus /></span>
      <span>— Gain <PlusSize x={1} /> or +3" to effective range to a <RangedCheck />.</span>
      <span><Vigor /></span>
      <span>— Gain <PlusSize x={1} /> to a <BrawlCheck /> or you can, like,
        idk move right before you attack even though you already can..</span>
      <span><Whimsy /></span>
      <span>— Gain <PlusSize x={1} /> to a <WeaveCheck /> or treat your
        <Bsp /><WeaveAttack /> as though it has an effective range instead
        of a max range. Use the rules in Ranged Attacks for range increment
        penalties.
      </span>
      <span><Hardy /></span>
      <span>— Grant <PlusDice dice={new Dice("1d6")} /> to <Defense />.</span>
      <span><Ready /></span>
      <span>— Gain <PlusSize x={1} /> to any <Check />.</span>
      <span><Adaptive /></span>
      <span>— Gain <PlusDice dice={new Dice("1d6")} /> to any <Check />.</span>
      <span><Rush /></span>
      <span>— Gain +1” to movement for the rest of the activation.</span>
      <span><Dazzle /></span>
      <span>— A <Dazzle /> resource may be used at
      the start of <b>any other</b> Skritter's activation.
      Until that Skritter's activation ends, the Skritter
      who used the <Dazzle /> resource cannot be targeted 
      by <Attack plural />.</span>
      <span><Lucky /></span>
      <span>— Spend after rolling a <Check /> to
      reroll the <Check />. Use wisely, because you
      must keep the new result.</span>
      <span><Preserved /></span>
      <span>— Used for campaign purposes, they ???</span>
    </div>
  </>);
}