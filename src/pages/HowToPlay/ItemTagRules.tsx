import Action from "../../common/Keywords/rules/action/Action";
import Check from "../../common/Keywords/rules/check/Check";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import ItemTag from "../../common/Tags/ItemTag";
import '../../common/Tags/Tags.css';

export default function ItemTagRules() {
  return (<>
    <p>
      Many Item Tags do not have a direct effect, but might interact with other abilities or effects.
    </p>
    <ul>
      <li>
        <ItemTag tag='PLANT' /> — 
      </li>
      <li>
        <ItemTag tag='METAL' /> — 
      </li>
      <li>
        <ItemTag tag='FLAME' /> — 
      </li>
      <li>
        <ItemTag tag='FROST' /> — 
      </li>
      <li>
        <ItemTag tag='WATER' /> — 
      </li>
      <li>
        <ItemTag tag='GEM' /> — 
      </li>
      <li>
        <ItemTag tag='ZAP' /> — Items with this keyword
        get <PlusSize x={1} /> to <Check plural /> involving them for each
        <ItemTag tag='METAL' /> item that the target has.
      </li>
      <li>
        <ItemTag tag='DEPLOYABLE' /> — Items with this keyword start
        packed in a Skritter's supplies and cannot be used.
        <br />
        Deploy <Action />: Deploy the item to a location 
        within 1” of the Skritter carrying it. 
        A deployed item cannot be moved, but can now be used.
      </li>
    </ul>
  </>);
}