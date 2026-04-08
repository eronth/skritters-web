import Bsp from "../../common/Formatting/bsp";
import Scuffle from "../../common/Keywords/rules/Scuffle";


export default function ScuffleRules() {
  return (
    <>
      <h2>Scuffle!</h2>
      <h3>What makes a Scuffle?</h3>
      <p>
        A<Bsp /><Scuffle /><Bsp />forms when an enemy Skritter is within
        range of at least one of your Skritter's wielded Brawl weapons.
        Both Skritters are part of that<Bsp /><Scuffle />. A Scuffle does
        not form <i>during</i> any movement actions, only after the movement
        actions have been completed.
      </p>
      <p>
        A<Bsp /><Scuffle /><Bsp />can grow! If any Skritter already in 
        a<Bsp /><Scuffle /><Bsp />is also within range of  another enemy's
        wielded Brawl weapon and/or has another enemy in range of their
        own wielded Brawl weapon, that enemy joins the same <Scuffle />.
        This happens even if they aren't in range of every other Skritter in it.
      </p>
            {/* <p>
        When opposing Skritters are close enough to each other,
        they are in a<Bsp /><Scuffle />. When an enemy Skritter
        is within range of at least one of your Skritter's wielded
        Brawl weapons, those two Skritters are "Scrapping" with
        each other.
      </p>
      <p>
        Skritters who are "Scrapping" with each other form a<Bsp /><Scuffle />.
        Any Skritter that is "Scrapping" with another Skritter that is already
        in a<Bsp /><Scuffle /><Bsp />is also part of the same Scuffle, even
        if they aren't directly "Scrapping" with all other Skritters in the
        <Bsp /><Scuffle />.
      </p> */}
      <p>
        A<Bsp /><Scuffle /><Bsp />keeps growing this way until no Skritters
        on its edges are in range of any new enemies.
        A<Bsp /><Scuffle /><Bsp />can contain any number of Skritters from either
        team, and there can be any number of separate<Bsp /><Scuffle plural />
        <Bsp />on the battlefield at once.
      </p>
      {/* Scuffle Range */}
      <h4>Scuffle Range</h4>
      <p>
        Scuffle Range is a term used to describe when an enemy Skritter is within
        at least one your Skritter's wielded Brawl weapons.
      </p>

      {/* Moving in a Scuffle */}
      <h3>Moving in a Scuffle</h3>
      <p>
        Skritters in a <Bsp /><Scuffle /><Bsp />do not have as
        much freedom of movement as those outside of one.
        Instead of the normal movement actions, a Skritter in a
        <Bsp /><Scuffle /><Bsp />has access to the following
        movement actions:
      </p>
      <h4>Reposition <span className="heh">Action</span></h4>
      <p>
        Move some sort of distance but stay in the
        <Bsp /><Scuffle /><Bsp />.
      </p>
      <h4>Flee! <span className="heh">Action</span></h4>
      <p>
        Move up to your max movement. For each Skritter whose
        Brawl Threat range you move outside of, they may make
        a free Brawl attack against you.
      </p>
      <h4>Fall Back <span className="heh">Action</span></h4>
      <p>
        Must be in a Scuffle. You may move 1” in any direction 
        as long as you end at least 1” away from at least one
        enemy Skritter you started the action within Scuffle
        range of. This does not permit an Intercept.
      </p>
      <h4>Intercept <span className="heh">Special Free Action</span></h4>
      <p>
        When a Skritter moves within Scuffle Range of
        one of your Skritters, you may have your Skritter
        intercept. To intercept, move your Skritter towards
        the opponent's Skritter until you are touching
        that Skritter (you cannot move further than your
        Brawl Threat range). The opponent's Skritter loses
        the rest of their movement and enters a Scuffle with
        you. The Skritter you
        intercepted gets -SIZE to Brawl attacks against
        you for each inch you moved, rounded to the nearest
        inch. This penalty lasts until the end of the
        intercepted Skritter's turn, or until they exit
        your Brawl Threat range.
      </p>
      <p>
        If you attempt to Intercept a Skritter who is using
        the Charge! Action, you must attempt a 2d6 Intercept
        Check. If you have more successes than the Charge
        Check had, you Intercept as normal. If you fail,
        you still move your Brawl Threat range towards the
        target, but you do not end their movement nor do
        you impose any other penalties or effects an
        Intercept would cause. (Since this does not end the
        target Skritter's movement, they do not immeditately
        enter a Scuffle with you.)
      </p>
      <h4>"Close the Gap" <span className="heh">Special Free Action</span></h4>
      <p>
        When you make a Brawl Action while in a Scuffle, you
        may use the "Close the Gap" Special Action immediately
        before in order to move closer to your target. Move
        up to .5" towards the target of your Brawl Action.
      </p>
      <p>
        If using "Close the Gap" would potentially put you in
        range of an enemy Skritter in your<Bsp /><Scuffle />
        <Bsp /> you are not already in range of, you may attempt
        to use it. If, for whatever reason, you end "Close the
        Gap" outside of the range of any of your Brawl Actions,
        you still spend an action but gain no other benefits.
      </p>
      <h4>Pile-In <span className="heh">Special Free Action</span></h4>
      <p>
        If a Skritter in a<Bsp /><Scuffle /><Bsp />is Defeated
        or otherwise removed from the Mission, each Skritter in
        that<Bsp /><Scuffle /><Bsp />can Pile-In. Players take
        turns, starting with the player whose Skritter was Defeated
        or removed, to select a Skritter to Pile-In with. A<Bsp />
        <Scuffle /><Bsp />does not gain or lose any members until
        AFTER all Pile-Ins are resolved. A player may choose to
        skip any selected Skritter's Pile-In completely.
      </p>
      <p>
        When a Skritter performs a Pile-In, they move up to 1" towards
        any enemy Skritter in the<Bsp /><Scuffle /><Bsp />. A Skritter
        who does so <i>must</i> end still in Scuffle Range of at least
        one enemy Skritter. If this is not possible, they can move the
        full 1" towards the closest enemy Skritter in the<Bsp /><Scuffle />
        <Bsp />. Pile-Ins do not trigger any Intercepts or other similar
        reactions or effects.
      </p>
      <p>
        Once the Pile-In is resolved, the<Bsp /><Scuffle /><Bsp />updates
        to reflect any new members who have joined or left, or any new<Bsp />
        <Scuffle plural /><Bsp />that have formed.
      </p>
    </>
  );
}