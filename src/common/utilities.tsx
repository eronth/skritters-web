import { Modifiers } from "../types/types";

const formatModifiers = (modifiers: Modifiers): string => {
  const diceStr = modifiers.dice?.map(d => `${d.count}d${d.sides}`).join(' + ') || '';
  const successStr = modifiers.successes?.length ? `+${modifiers.successes.join('+')} successes` : '';
  const sizeStr = modifiers.size?.length ? `+${modifiers.size.join('+')} size` : '';
  
  return [diceStr, successStr, sizeStr].filter(s => s).join(' ');
};

export {
  formatModifiers
};
