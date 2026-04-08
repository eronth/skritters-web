import Attack from "../../common/Keywords/rules/action/Attack";
import BrawlCheck from "../../common/Keywords/rules/check/BrawlCheck";
import Check from "../../common/Keywords/rules/check/Check";
import RangedCheck from "../../common/Keywords/rules/check/RangedCheck";
import WeaveCheck from "../../common/Keywords/rules/check/WeaveCheck";
import Defense from "../../common/Keywords/rules/Defense";
import Adaptive from "../../common/Keywords/rules/resources/Adaptive";
import Dazzle from "../../common/Keywords/rules/resources/Dazzle";
import Focus from "../../common/Keywords/rules/resources/Focus";
import Hardy from "../../common/Keywords/rules/resources/Hardy";
import Lucky from "../../common/Keywords/rules/resources/Lucky";
import Preserved from "../../common/Keywords/rules/resources/Preserved";
import Ready from "../../common/Keywords/rules/resources/Ready";
import Rush from "../../common/Keywords/rules/resources/Rush";
import Vigor from "../../common/Keywords/rules/resources/Vigor";
import Whimsy from "../../common/Keywords/rules/resources/Whimsy";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import { Dice } from "../../types/types";

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
      The basic resources are listed below:
    </p>
    <ul>
      <li>
        <Focus /> — A <Focus /> resource may be spent to 
        gain <PlusSize x={1} /> to a <RangedCheck plural />.
      </li>
      <li>
        <Vigor /> — A <Vigor /> resource may be used to
        gain <PlusSize x={1} /> to a <BrawlCheck plural />.
      </li>
      <li>
        <Whimsy /> — A <Whimsy /> resource may be used to
        gain <PlusSize x={1} /> to a <WeaveCheck />.
      </li>
      <li>
        <Hardy /> — A <Hardy /> resource may be used when attacked 
        to grant <PlusDice dice={new Dice("1d6")} /> to <Defense />.
      </li>
      <li>
        <Ready /> — A <Ready /> resource may be used to
        gain <PlusSize x={1} /> to any <Check />.
      </li>
      <li>
        <Rush /> — A <Rush /> resource may be used to 
        gain +1” to movement for the rest of the activation.
      </li>
      <li>
        <Dazzle /> — A <Dazzle /> resource may be used at
        the start of any Skritter's activation. Until that
        Skritter's activation ends, the Skritter who used
        the <Dazzle /> resource cannot be targeted with <Attack plural />.
      </li>
      <li>
        <Adaptive /> — An <Adaptive /> resource may be used to
        gain <PlusDice dice={new Dice("1d6")} /> to any <Check />.
      </li>
      <li>
        <Lucky /> — A <Lucky /> resource can be used after rolling a 
        <Check /> to reroll the <Check />. Use wisely,
        because you must keep the new result.
      </li>
      <li>
        <Preserved /> — Used for campaign purposes, they ???
      </li>
    </ul>
  </>);
}