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

export {
  formatModifiers
};
