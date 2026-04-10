import Action from "../../../common/Keywords/rules/action/Action";
import Check from "../../../common/Keywords/rules/check/Check";
import PlusSize from "../../../common/Keywords/rules/roll-modifiers/PlusSize";
import ItemTag from "../../../common/Tags/ItemTag";
import '../../../common/Tags/Tags.css';
import './TagRules.css';

export default function ItemTagRules() {
  return (<>
    <h3>Tags for Items</h3>
    <p>
      Many Item Tags do not have a direct effect,
      but might interact with other abilities or effects.
    </p>
    <div className="tag-rules-grid">
      <span><ItemTag tag='PLANT' /></span>
      <span className="tag-rule-description"> — </span>
      <span><ItemTag tag='METAL' /></span>
      <span className="tag-rule-description"> — </span>
      <span><ItemTag tag='FLAME' /></span>
      <span className="tag-rule-description"> — </span>
      <span><ItemTag tag='FROST' /></span>
      <span className="tag-rule-description"> — </span>
      <span><ItemTag tag='WATER' /></span>
      <span className="tag-rule-description"> — </span>
      <span><ItemTag tag='GEM' /></span>
      <span className="tag-rule-description"> — </span>
      <span>
        <ItemTag tag='ZAP' /> 
      </span>
      <span className="tag-rule-description">
        — Items with this keyword
        get <PlusSize x={1} /> to <Check plural /> involving them for each
        <ItemTag tag='METAL' /> item that the target has.
      </span>
      <span>
        <ItemTag tag='DEPLOYABLE' />
      </span>
      <span className="tag-rule-description">
        — Items with this keyword start
        packed in a Skritter's supplies and cannot be used.
        <br />
        Deploy <Action />: Deploy the item to a location 
        within 1” of the Skritter carrying it. 
        A deployed item cannot be moved, but can now be used.
      </span>
    </div>
  </>);
}
