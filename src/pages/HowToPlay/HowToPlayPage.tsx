import Header from "../../common/Header";
import Action from "../../common/Keywords/rules/action/Action";

export default function HowToPlayPage() {
  return (<>
    <Header selectedTab={"how-to-play"} />

    <h1>Overview</h1>
    <p>Welcome to the skirmish game of Skritters! A cute little game where players face off with their squad of Skritters.</p>
    <h2>What's a Skritter?</h2>
    <p>
      Skritters are cute little anthropomorphized critters. Each Skritter has its own unique abilities and characteristics that make them special.
      They are cute-yet-fierce and looking to do what's necessary to protect their little clan.
    </p>
    <h2>What's a Skirmish</h2>
    <h1>How to Play</h1>
    <h2>Dice</h2>
    <p>
      Skritters uses dice to determine the outcome of many things. These dice can have different 
      numbers of sides, and can be rolled in different combinations. Any time you see a notation like "2d6", it means to roll 
      two six-sided dice. The number before the "d" indicates how many dice to roll, and the number 
      after the "d" indicates how many sides each die has. Skritters can make use of d4, d6, d8, d10, and d12 dice, though 
      you'll only need d4s and d6s most of the time.
    </p>
    <h2>Tests and Checks</h2>
    <p>
      The game uses a simple dice system to resolve <Action plural />. When
      required to roll a test (sometimes referred to as a check), you assemble all Dice
      and modifiers that apply to the test, and roll them all at once. Once you've rolled
      the dice, sum the results of the dice and deply the total by 3 to determine the number of
      succeess.
    </p>
    <h3>Modifiers</h3>
    <ul>

    </ul>
  
  </>);
}
