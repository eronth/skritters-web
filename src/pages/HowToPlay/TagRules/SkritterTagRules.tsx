import SkritterTag from '../../../common/Tags/SkritterTag';
import '../../../common/Tags/Tags.css';

export default function SkritterTagRules() {
  return (<>
    <h3>Tags for Skritters</h3>
    <p>
      Skritter tags make them Skrit.
    </p>
    <ul>
      <li><SkritterTag tag="HELPFUL" /> — This Skritter can spend its own resources to aid another Skritter within 2”, even if it isn’t their activation.</li>
      <li><SkritterTag tag="FLIGHTY" /> — This Skritter is not affected by difficult terrain, and climbs with +2 successes</li>
      <li><SkritterTag tag="WATERFOND" /> — This Skritter enjoys rain and puddles.</li>
      <li><SkritterTag tag="NOCTERNAL" /> — This Skritter is not affected by the nighttime penalties. This does not include seasonal effects that only happen at night.</li>
      <li><SkritterTag tag="SCOUT" /> — This Skritter treats their deployment zone as if it was 1” bigger in all directions for the purposes of deployment.</li>
      <li><SkritterTag tag="COLD-BLOODED" /> — Harsher winter effects. Can steal an allied action.</li>
      <li><SkritterTag tag="DISTRACTED" /> — This Skritter gets -1DICE on any actions it has already attempted this activation. This penalty stacks. Additionally, this unit cannot use Focus resources for themselves.</li>
      <li><SkritterTag tag="CONCENTRATION" /> — This Skritter gets +1SIZE on actions it has already attempted this activation. This bonus stacks. Additionally, this unit cannot use Whimsical resources for themselves.</li>
      <li><SkritterTag tag="MEEK" /> — This Skritter gets +1SIZE Defense against Weave attacks AND +1SIZE Defense against attacks from Large Skritters. This Skritter Additionally, this unit cannot use Vigorous resources for themselves.</li>
      <li><SkritterTag tag="STEADY" /> — This Skritter is not affected by difficult terrain (any? most?). Additionally, this unit cannot use Rush resources.</li>
      <li><SkritterTag tag="POINTED" /> — </li>
      <li><SkritterTag tag="FEROCIOUS" /> — This Skritter gains +1DICE when Vigorous resources are used to boost their Brawl attack instead of the normal bonus.</li>
      <li><SkritterTag tag="SHARP-EYED" /> —This Skritter gains +1DICE when Focus resources are used to boost their Ranged attack instead of the normal bonus.</li>
      <li><SkritterTag tag="DREAMER" /> — This Skritter gains +1DICE when Whimsical resources are used to boost their Weave attack instead of the normal bonus.</li>
    </ul>
  </>);
}