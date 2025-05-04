import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Action from "../../common/Keywords/rules/action/Action";
import PlusDice from "../../common/Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "../../common/Keywords/rules/roll-modifiers/PlusSize";
import { Dice } from "../../types/types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MinusSize from "../../common/Keywords/rules/roll-modifiers/MinusSize";
import Success from "../../common/Keywords/rules/roll-modifiers/Success";

export default function DiceAndTestsComponent() {
  const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
  return (<>
    <h2>Dice</h2>
      <p>
        Skritters uses dice to determine the outcome of many things. These dice can have different 
        numbers of sides, and can be rolled in different combinations. Any time you see a notation like "2d6", it means to roll 
        two six-sided dice. The number before the "d" indicates how many dice to roll, and the number 
        after the "d" indicates how many sides each die has. Skritters can make use of d4, d6, d8, d10, and d12 dice, though 
        you'll only need d4s and d6s most of the time. The <PlusDice /> icon indicates dice of any size.
      </p>
    <h2>Tests and Checks</h2>
      <p>
        The game uses a simple dice system to resolve <Action plural />. When
        required to roll a test (sometimes referred to as a check), you assemble all Dice
        and modifiers that apply to the test, and roll them all at once. Once you've rolled
        the dice, sum the results of all of the dice and divide the total by 3 to determine the number of
        succeess.
      </p>
      <h3>Modifiers</h3>
      <p>
        When rolling a test, there are a number of modifiers that can apply to the roll. 
        These modifiers are applied before making your roll, and are applied in the order 
        shown in the table below. The following modifiers are used in Skritters:
      </p>
      <ol>
        <li>
          +XdY<PlusDice /> means to add X dice with Y sides to the roll. For 
          example <PlusDice dice={new Dice('2d4')} /> means you should add two 
          four-sided dice to the total number of dice you will be rolling for the check.
        </li>
        <li>
          -X<PlusDice /> indicates that you should remove X dice from the roll. This modifier
          does not indicate specific dice to remove, but rather the total number of dice to remove.
          The player making the roll selects which dice are to be removed unless otherwise specified.
        </li>
        <li>
          +X<PlusSize noVal /> indicates that you should increase the "size" of your dice X times. You do not
          need to pick the same dice for each of these increases, and you cannot increase a dice beyond
          a d12. Each time you increase the size of your dice, you bump to the next dice in
          the chain as follows:
          <ul>
            <li>d4 {rightArrow} d6</li>
            <li>d6 {rightArrow} d8</li>
            <li>d8 {rightArrow} d10</li>
            <li>d10 {rightArrow} d12</li>
          </ul>
        </li>
        <li>
          -X<MinusSize noVal /> indicates that you should decrease the "size" of your dice X times. You do not
          need to pick the same dice for each of these decreases, and decreasing below a d4 removes the
          dice entirely. Each time you decrease the size of your dice, you drop to the next dice in
          the chain as follows:
          <ul>
            <li>d12 {rightArrow} d10</li>
            <li>d10 {rightArrow} d8</li>
            <li>d8 {rightArrow} d6</li>
            <li>d6 {rightArrow} d4</li>
            <li>d4 {rightArrow} No dice</li>
          </ul>
        </li>
        <li>
          +X <Success noVal /> indicates that you should add X successes to the final
          result after calculating the successes from your roll.
        </li>
        <li>
          -X <Success noVal /> indicates that you should subtract X successes from the final
          result after calculating the successes from your roll.
        </li>
      </ol> 
  </>)
}