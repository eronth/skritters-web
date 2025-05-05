import { Modifiers } from "../types/types";

const formatModifiers = (modifiers: Modifiers): string => {
  const nilout = modifiers.nilout;
  const diceStr = modifiers.dice?.map(d => `${d.count}d${d.sides}`).join(' + ');
  const successStr = modifiers.successes?.length ? `+${modifiers.successes.join('+')} Successes` : null;
  const sizeStr = modifiers.size?.length ? `+${modifiers.size.join('+')} size` : null;
  
  const retVal = (nilout)
    ? '-'
    : [diceStr, successStr, sizeStr].filter(s => s).join(' ');

  return retVal.trim() || '0'; 
};

const calculateModifiersAverage = (modifiers: Modifiers): number => {
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
