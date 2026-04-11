import DefeatAndRetreat from './DefeatAndRetreat';
import Success from '../../common/Keywords/rules/roll-modifiers/Success';
import MinusDice from '../../common/Keywords/rules/roll-modifiers/MinusDice';
import MinusSize from '../../common/Keywords/rules/roll-modifiers/MinusSize';
import ScuffleRules from './ScuffleRules';
import Scuffle from '../../common/Keywords/rules/Scuffle';
import Bsp from '../../common/Formatting/bsp';
import PlusSize from '../../common/Keywords/rules/roll-modifiers/PlusSize';
import './ActionRulesComponent.css';
import Attack from '../../common/Keywords/rules/action/Attack';
import Defense from '../../common/Keywords/rules/Defense';
import Check from '../../common/Keywords/rules/check/Check';
import { Dice } from '../../types/types';

export default function ActionsRulesComponent() {
  return (<>
    <h2>Actions and Maneuvers</h2>
    <p>
      Each Skritter can perform three actions in a turn
      once they are activated. Take actions one at a time,
      choosing your next action after the previous one
      resolves. A Skritter can perform the same action
      more than once within an activation, but some have
      bonuses or penalties associated with this. Below 
      you will find a number of actions available to all
      Skritters, though some Skritters or equipment may
      list special additional actions associated with 
      that Skritter or item.
    </p>
    <h3>Movement Actions</h3>
    <p>
      Skritters have access to a few movement actions to
      maneuver around the  battlefield. Movement
      action gets -1” for each movement action previously
      completed by the Skritter during this activation.
    </p>
    <h4>Basic Movement Rules</h4>
    <p>
      The Measurement String — When moving a model, use a
      measurement string of the right length. Place one end
      touching the base of the moving model, 
      then, weaving up down and around terrain, place the string 
      on the battlefield marking out the path you wish to take.
      The model may end up in any location they fit where their
      base touches the string and the model would have physically
      fit any narrow passageways. This needs to be cleaned up a ton.
    </p>
    <h4>Movement Modifiers</h4>
    <p>
      These modifiers can be added to any movement attempt,
      though some may leave very little room for success. Plot
      the entire route you intend to make before rolling any
      checks that are called for. If checks do not result in
      a <Success />, or result in less <Success plural /> than required,
      perform your movement until the point of failure, then 
      resolve.
    </p>
    <p>
      If you have multiple Climb modifiers in a single
      move, you only roll a singular Climb check and distribute
      the <Success plural /> as needed. The same is true for other modifiers.
    </p>
    <p>
      <i>Climbing</i> — Roll a <Check dice={new Dice('3d6')} type='Climb' /> climb check. You may
      climb 1” per <Success />. If you don't make it all the way
      to the top in one go, roll a <Check dice={new Dice('1d6')} type='Holding' /> - If you don't
      get at least <Success x={1} />, you fall from where you had
      climbed.
      <br />
      If you are climbing a difficult
      surface, you must successfully climb all the way to the
      top in one check or you fall back down to the bottom
      with no <Check type='Holding' /> required.
      <br /><br />
      <i>Jump Gap</i> — ??? - Same as climb but 2d6, decided during gameplay. 
      <br /><br />
      <i>Fall</i> — If you choose to fall, or fail a Climb/Jump Gap attempt,
      you are moved straight down from higher terrain to lower terrain or the
      ground. When you hit the ground, you are hit by a <Attack type='Falling' /><Bsp />
      that has a number of <Success plural /> equal to twice the distance you
      fell, roll your <Defense /> against the attack, taking damage as normal.
      <br />Falling does not use your normal movement inches.
      <br /><br />
      If you pass within 1" of a ledge while falling, you can 
      attempt a <Check dice={new Dice('1d4')} type='Grab' /> to grab the ledge.
      On a <Success />, you catch the ledge and pull yourself up. Determine the
      <Bsp /><Attack type='Falling' /> based on the reduced distance fallen.

      <br /><br />
      <i>Glide</i> — If you have the ability to glide, you can safely fall
      without risk of damage. When you would fall, if you have an action
      you can spend or
      are already moving, you can choose to glide with your movement. When
      you glide, you move 1" away from where you started falling for each 1"
      you fall down. Gliding must be done in a (relatively) straight line
      diagonally downward.
      <br /><br />
      Each 1" you glide counts against your movement. If you run out of
      movement before reaching the ground, you must spend another action
      to continue gliding (if available), or you begin falling from where
      your glide ended.

      <br /><br />
      <i>Fly</i> — If you can fly, you can measure up and over terrain
      without making climb or jump checks. You must end each movement on
      a solid surface.
    </p>
    <h4>March Action</h4>
    <p>
      Use a measurement string. Move your units inches.
    </p>
    <h4>Scamper Action</h4>
    <p>
      1/round If you haven't attacked: Move your units inches
      <Check dice={new Dice('1d4')} type='Scamper' />.
      You can add up to up to <PlusSize x={3} /> to this check.
      If you do, your next attack this mission gains <MinusSize noVal />
      <Bsp />by the same amount + 1.
      <br /><br />
      You cannot attack in the same round you did this.
    </p>
    <h4>Charge Action!</h4>
    <p>
      Choose an enemy Skritter as a target, then make a
      <Bsp /><Check dice={new Dice('2d6')} type='Charge' />.
      You may move your full movement stat, plus all <Success plural />
      from your Charge, in a straight line towards the target. 
      You cannot make
      a partial movement with this action.
    </p>
    <p>
      If you end up in a<Bsp /><Scuffle /><Bsp />with the target of your
      charge, you may use Close the Gap (shown in<Bsp /><Scuffle />
      <Bsp />rules) by moving directly towards the target.
    </p>
    <h3>Swapping Weapons Action</h3>
    <p>
      Swap out your currently wielded weapons and/or equipment for
      other weapons or equipment the character has with them. This is only
      used to swap what weapons are being wielded (and cannot affect armors or other garb).
    </p>
    <h3>Attack Action</h3>
    <p>
      
    </p>
    <ul>
      <li>Choose which wielded weapon you are attacking with.</li>
      <li>Choose which target you are attacking, within the weapon's range.</li>
      <li>Note which kind of weapon you are using (brawl, ranged, or weave).</li>
      <li>
        Add your Skritter's bonus for that attack type to the bonus for
        the weapon (or other equipment) to determine your total attack roll.
      </li>
      <li>
        Roll your attack and your target rolls their defense. Each success on
        the attack is a hit! (Reminder: Your<Bsp /><Success plural/><Bsp />
        are equal to the total dice result divided by 3, discard remainder.)
      </li>
      <li>
        Your target assembles their defense against your attack.
      </li>
      <li>
        Each success on the defense blocks a hit. Each unblocked hit
        deals 1 damage.
      </li>
    </ul>
    <p>
      Dual Wielding - If you are wielding two one-handed weapons, you can trigger a dual wield bonus by 
      alternating weapons you use for attacks within a single activation. The first time you alter a weapon 
      you gain +1 SIZE, the second time grants +1 SIZE and so on. The first attack in this sequence does not get this bonus.
    </p>

    {/* Different attack types */}
    {/* Brawl Attacks */}
    <h4>Brawl Specific Rules</h4>
    <p>
      Brawl attacks can only be used in a Scuffle.
    </p>
    <p>
      Every Skritter has access to a special Improvised Weapon
      Brawl Attack. This attack is available even when all hands
      are occupied. Imagine kicking, headbuts, or swinging wildly
      with whatever is in your hands. The attack has a range of
      0.5", grants <MinusSize x={4} />, grants a minimum dice
      of d4 (even if penalties would reduce it to less than d4),
      and does not count as one-handed or two-handed for the 
      purposes of any benefits,
    </p>
    {/* Ranged Attacks */}
    <h4>Ranged Specific Rules</h4>
    <p>
      Ranged attacks have an effective range. Attacking
      beyond that range confers<Bsp /><MinusDice x={1} />
      <Bsp />and<Bsp /><MinusSize x={1} /><Bsp />for every
      range increment beyond the effective range.
    </p>
    <p>
      In other words, a Ranged attack with a weapon that
      has a range stat of 6” would get
    </p>
    <ul>
      <li><Bsp /><MinusDice x={1} /><Bsp />and<Bsp /><MinusSize x={1} /><Bsp />against targets at a range of 7"&nbsp;to&nbsp;12”</li>
      <li><Bsp /><MinusDice x={2} /><Bsp />and<Bsp /><MinusSize x={2} /><Bsp />against targets at a range of 13"&nbsp;to&nbsp;18”</li>
      <li>and so on</li>
    </ul>
    <p>
      Ranged attacks can not be used by Skritters who are in a<Bsp /><Scuffle />
      <Bsp />against a target within the same<Bsp /><Scuffle />. Ranged attacks
      can be used against targets outside of the Scuffle, but they get
      <Bsp /><MinusDice x={1} /><Bsp />and<Bsp /><MinusSize x={1} /><Bsp />.
    </p>

    {/* Weave Attacks */}
    <h4>Weave Specific Rules</h4>
    <p>
      Weave attacks cannot be used beyond their max range. However, they often have additional and 
      unusual effects on hits, sometimes replacing damage with some other effect.
    </p>
    <p>
      Weave attacks get<Bsp /><MinusDice x={1} /><Bsp />when used in a <Scuffle />.
    </p>

    <h4>Cover</h4>
    <p>
      If a unit can only see half or less of another unit when
      making an attack, the targeted unit is considered to have cover.
      Cover grants -1 SIZE to the attack, and +1 SIZE to the unit's defence check.
    </p>
    <ScuffleRules />
    <DefeatAndRetreat />
  </>);
}