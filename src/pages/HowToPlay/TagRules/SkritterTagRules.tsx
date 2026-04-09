import SkritterTag from '../../../common/Tags/SkritterTag';
import '../../../common/Tags/Tags.css';
import './TagRules.css';

export default function SkritterTagRules() {
  return (<>
    <h3>Tags for Skritters</h3>
    <p>
      Skritter tags make them Skrit.
    </p>
    <div className="tag-rules-grid">
      <span><SkritterTag tag="HELPFUL" /></span>
      <span className="tag-rule-description"> — This Skritter can spend its own resources to aid another Skritter within 2”, even if it isn’t their activation.</span>
      <span><SkritterTag tag="FLIGHTY" /></span>
      <span className="tag-rule-description">— This Skritter is not affected by difficult terrain, and climbs with +2 successes</span>
      <span><SkritterTag tag="WATERFOND" /></span>
      <span className="tag-rule-description">— This Skritter enjoys rain and puddles.</span>
      <span><SkritterTag tag="NOCTERNAL" /></span>
      <span className="tag-rule-description">— This Skritter is not affected by the nighttime penalties. This does not include seasonal effects that only happen at night.</span>
      <span><SkritterTag tag="SCOUT" /></span>
      <span className="tag-rule-description"> — This Skritter treats their deployment zone as if it was 1” bigger in all directions for the purposes of deployment.</span>
      <span><SkritterTag tag="COLD-BLOODED" /></span>
      <span className="tag-rule-description"> — Harsher winter effects. Can steal an allied action.</span>
      <span><SkritterTag tag="DISTRACTED" /></span>
      <span className="tag-rule-description"> — This Skritter gets -1DICE on any actions it has already attempted this activation. This penalty stacks. Additionally, this unit cannot use Focus resources for themselves.</span>
      <span><SkritterTag tag="CONCENTRATION" /></span>
      <span className="tag-rule-description"> — This Skritter gets +1SIZE on actions it has already attempted this activation. This bonus stacks. Additionally, this unit cannot use Whimsical resources for themselves.</span>
      <span><SkritterTag tag="MEEK" /></span>
      <span className="tag-rule-description"> — This Skritter gets +1SIZE Defense against Weave attacks AND +1SIZE Defense against attacks from Large Skritters. This Skritter Additionally, this unit cannot use Vigorous resources for themselves.</span>
      <span><SkritterTag tag="STEADY" /></span>
      <span className="tag-rule-description"> — This Skritter is not affected by difficult terrain (any? most?). Additionally, this unit cannot use Rush resources.</span>
      <span><SkritterTag tag="POINTED" /></span>
      <span className="tag-rule-description"> — </span>
      <span><SkritterTag tag="FEROCIOUS" /></span>
      <span className="tag-rule-description"> — This Skritter gains +1DICE when Vigorous resources are used to boost their Brawl attack instead of the normal bonus.</span>
      <span><SkritterTag tag="SHARP-EYED" /></span>
      <span className="tag-rule-description"> — This Skritter gains +1DICE when Focus resources are used to boost their Ranged attack instead of the normal bonus.</span>
      <span><SkritterTag tag="DREAMER" /></span>
      <span className="tag-rule-description"> — This Skritter gains +1DICE when Whimsical resources are used to boost their Weave attack instead of the normal bonus.</span>
    </div>
  </>);
}