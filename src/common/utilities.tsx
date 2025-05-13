import { ReactNode } from "react";
import { Dice, Modifiers } from "../types/types";
import Success from "./Keywords/rules/roll-modifiers/Success";
import MinusSize from "./Keywords/rules/roll-modifiers/MinusSize";
import MinusDice from "./Keywords/rules/roll-modifiers/MinusDice";
import PlusDice from "./Keywords/rules/roll-modifiers/PlusDice";
import PlusSize from "./Keywords/rules/roll-modifiers/PlusSize";

const formatModifiers = (modifiers: Modifiers): ReactNode => {
  if (!modifiers) return null;

  if (modifiers?.nilout) return '-';

  const diceMap = new Map<number, number>();
  let diceList = null;
  if (modifiers.dice) {
    // Foreach loop through the dice to summ dice of the same size.
    for (const die of modifiers.dice) {
      if (diceMap.has(die.sides)) {
        diceMap.set(die.sides, diceMap.get(die.sides)! + die.count);
      } else {
        diceMap.set(die.sides, die.count);
      }
    }

    // Turn the diceMap into a list of elements.
    diceList = Array.from(diceMap.entries()).map(([sides, count], index) => {
      return <PlusDice key={index} dice={new Dice(`${count}d${sides}`)} />;
    });
  }
  
  const rd = modifiers.removeDice?.reduce((sum, value) => sum + value, 0) ?? 0;
  const removeDiceCount = rd ? <> <MinusDice x={rd} /></> : null;
  const sizeList = modifiers.size?.map((size, index) => {
    return size > 0
    ? <span key={'size-'+index}> <PlusSize x={size} /></span>
    : <span key={'size-'+index}> <MinusSize x={size} /></span>
  });
  const sc = modifiers.successes?.reduce((sum, value) => sum + value, 0) ?? 0;
  const successElements = sc ? <span className="test"> +<Success x={sc} /></span> : null;

  return (<>
    {diceList}
    {removeDiceCount}
    {sizeList}
    {successElements}
  </>);
};

const calculateModifiersAverage = (modifiers: Modifiers, bonusSize: number = 0): number => {
  if (modifiers.nilout) return 0;

  let total = 0;
  
  // Calculate average from dice
  if (modifiers.dice) {
    for (const die of modifiers.dice) {
      total += die.count * ((die.sides + 1) / 2);
    }
  }

  // Add size average bonus (1 per size change)
  if (modifiers.size) {
    total += modifiers.size.reduce((sum, val) => sum + val, 0);
  }
  total += bonusSize;


  // Calc average successes so far
  // DO THIS BEFORE ADDING SUCCESSES IN.
  total /= 3;

  // Now add successes
  if (modifiers.successes) {
    total += modifiers.successes.reduce((sum, val) => sum + val, 0);
  }

  // truncate to 3 decimal places
  total = Math.round(total * 1000) / 1000;
  return total;
}

export {
  formatModifiers,
  calculateModifiersAverage
};
