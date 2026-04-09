import Cloak from "../../../common/Keywords/rules/cloak/Cloak";
import ItemTagRules from "./ItemTagRules";
import SkritterTagRules from "./SkritterTagRules";


export default function TagRules() {
  return <>
    <h2>Taggies and Keywordies!</h2>
    <SkritterTagRules />
    <ItemTagRules />
    <h3>Keywords</h3>
    <p>
      <b><Cloak /></b> — If
      something tells your unit to <Cloak placeholder />,
      you do the following: Place X Cloak
      models/markers on the battlefield
      touching the unit's base. Make sure
      these Cloak models clearly designate
      which unit they are a Cloak of. Remove
      the unit from the battlefield. The
      unit is now Cloaked!
    </p>
    <ul>
      <li>Whenever you use a move action for
        a Cloaked Skritter, move each Cloak
        model, one at a time, up to the max
        allowed distance for that Skritter.
      </li>
      <li>When a Cloak Skritter is Dismissed, simply remove the Cloak model. This one was not your real Skritter. You cannot choose to Dismiss a Cloak model if it is your last one for that Skritter.</li>
      <li>When a Cloak Skritter is Revealed, replace that Cloak model with the Skritter, and Dismiss other Cloak models for that Skritter.</li>
      <li>Any time a Cloak model is targeted with an attack or ability, you may choose to either Dismiss the Cloak model (negating the effects), or Reveal your Skritter in that location.</li>
      <li>Area attacks that hit all of your Cloaked models and affect them equally still affect your unit, but do not force you to Reveal your unit nor Dismiss Cloaked models.</li>
      <li>At any time, you may Reveal which Cloak model is actually your unit.</li>
      <li>Any time your Cloaked model would suffer damage (such as from falling, crossing dangerous terrain, setting off traps, or otherwise) or needs to interact (such as searching a cache or operating an objective), you either Reveal or Dismiss that Cloak model. Dismissing the Cloak model negates the effect, as usual. A Cloak cannot claim objectives, but you can Reveal the cloak as the real unit to do so.</li>
      <li>If you Reveal your unit immediately before making an attack, that attack is considered a Revealing Attack. A revealing attack gets +1d4.</li>
    </ul>
  </>;
}