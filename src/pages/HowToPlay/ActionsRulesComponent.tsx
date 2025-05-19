import './ActionRulesComponent.css';

export default function ActionsRulesComponent() {
  return (<>
    <h2>Actions and Maneuvers</h2>
    <p>
      Each Skritter can perform three actions in a turn once they are activated.
    </p>
    <h3>Movement Actions</h3>
    <h4>Basic Movement Rules</h4>
    <p>
      The Measurement String — When moving a model, use a measurement string 
      of the right length. Place one end touching the base of the moving model, 
      then, weaving up down and around terrain, place the string 
      on the battlefield marking out the path you wish to take.
      The model may end up in any location they fit where their
      base touches the string and the model would have physically
      fit any narrow passageways this needs to be cleaned up a ton.
    </p>
    <h4>Movement Modifiers</h4>
    <p>
      These modifiers can be added to any movement attempt, though some may leave very little room for success. Plot the entire route you intend to make before rolling any checks that are called for. If checks do not result in a success, or result in less successes than required, perform your movement until the point of failure, then resolve. If you have multiple Climb modifiers in a single move, you only roll a singular Climb check and distribute the successes as needed. The same is true for other modifiers.
      <br /><br />
      <i>Climbing</i> — Roll a SuCheck(3d6) climb check. You may climb 1” per success. If you are climbing a difficult surface, you must successfully climb all the way to the top in one check or you slide back down to the bottom.
      <br /><br />
      <i>Jump</i> — ??? – Same as climb but 2d6, decided during gameplay. 
      <br /><br />
      <i>Glide</i> —
      <br /><br />
      <i>Fly</i> — 
      <br /><br />
      <i>Intercept</i> — When a Skritter moves within Brawl Threat range of one of your Skritters, you may have your Skritter intercept. To intercept, move your Skritter towards the opponent’s Skritter until you are touching that Skritter (you cannot move further than your Brawl Threat range). The opponent’s Skritter loses the rest of their movement and enters a Scuffle with you. If you choose to intercept, the Skritter you intercepted gets -SIZE to Brawl attacks against you for each inch you moved, rounded to the nearest inch. This penalty lasts until the end of the intercepted Skritter’s turn, or until they exit your Brawl Threat range.
      <br /><br />
      If you attempt to Intercept a Skritter who is using the Charge! Action, you must attempt a 2d6 Intercept Check. If you have more successes than the Charge Check had, you Intercept as normal. If you fail, you still move your Brawl Threat range towards the target, but you do not end their movement nor do you impose any other penalties or effects an Intercept would cause.
    </p>
    <h4>March Action</h4>
    <p>
      Use a measurement string. Move your units inches. Each move action gets -1” for each move you’ve completed before it during this activation.  If you move out of the 1” Scuffle range of a unit, that unit gets a free Brawl attack against you before you complete your movement. (How does AoO work with weapons that have a larger or smaller Threat than 1”??? Should AoO get dropped entirely? Maybe it’s just going to be converted to Threat range, for better or worse.)
    </p>
    <h4>Fall Back Action</h4>
    <p>
      Must be in a Scuffle. You may move 1” in any direction as long as you end more than 1” away from at least one unit you started the action within Scuffle range of. This does not proc AoO and does not permit an Intercept.
    </p>
    <h4>Scamper Action</h4>
    <p>
      1/round If you haven’t attacked: Move your units inches SuCheck(+d4). You can increase dice size up to 3 times. Your next attack this round needs to decrease dice size by the same amount+1.
    </p>
    <h4>Charge Action!</h4>
    <p>
      Make a SuCheck(2d6) and move your movement + successes in a straight line. If you end up in 1”, you’re in a Scuffle! (no longer needed? Updates needed?) Choose an enemy Skritter as a target, then make a 2d6 Charge Check. You may move your full movement stat plus successes from your Charge in a straight line towards the target, and may not make a partial movement. If you end up within your Brawl Threat range, you may close the gap by moving directly towards the target.
      The target of your charge cannot Intercept your charge (unless you fail to get into base2base???).
      (maybe doing a charge gives -DICE to target’s defends based on successes or something????)
    </p>
    <h3>Swapping Weapons Action</h3>
    <p>
      Swap out your currently wielded weapons and/or equipment for other weapons or equipment the character has with them. This is only used to swap what weapons are being wielded (and cannot affect armors or other garb).
    </p>
    <h3>Attack Action</h3>
    <p>
      Roll the dice for the attack you’re making, adding in any relevant bonuses from weapon or equipment. Determine successes (total result divided by 3, discard remainder), each success is a hit! Your target gets to roll defense. Each successful defense blocks a hit, and any unblocked hits deal 1 damage each.
      Brawl attacks can only be used in a Scuffle. You can attempt to Close the Gap immediately before making a Brawl Attack as a free action. (unarmed attack: 0.5”, -4 SIZE)
      Ranged attacks have an effective range. Attacking beyond that range confers -1DICE and -1SIZE for every range beyond the effective range. Ranged attacks can not be used in a Scuffle. (MAYBE THEY ONLY GET -1DICE IN A SCUFFLE).
      Weave attacks cannot be used beyond their max range. However, they often have additional and unusual effects on hits, sometimes replacing damage with some other effect.
      Dual Wielding - If you are wielding two one-handed weapons, you can trigger a dual wield bonus by alternating weapons you use for attacks within a single activation. The first time you alter a weapon you gain +1 SIZE, the second time grants +1 SIZE and so on. The first attack in this sequence does not get this bonus.
    </p>
    <h4>Cover</h4>
    <p>
      If a unit can only see half or less of another unit when making an attack, the targeted unit is considered to have cover. Cover grants -1 SIZE to the attack, and +1 SIZE to the unit’s defence check.
    </p>
  </>);
}