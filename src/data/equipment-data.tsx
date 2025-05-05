import { Dice, Equipment } from "../types/types";

const d1d4: Dice = { count: 1, sides: 4 };

const pistol: Equipment = {
  name: "Pistol",
  type: "ranged",
  slot: "one-handed",
  range: 8,
  bonus: {
    dice: [{...d1d4}],
  },
  effect: (
    <span>
      A small firearm that can be easily concealed. It has a range of 8 yards and deals 1d4 damage.
    </span>
  ),
};

const equipment = {
  pistol,
};

export default equipment;
