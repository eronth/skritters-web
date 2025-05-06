import { Equipment } from "../../types/types";

const archive: Equipment = {
  name: "Archive",
  type: "garb", slot: "back",
  effect: (<>
    When you gain this equipment, pick any Skritter, even one that is not on your team.
    This book becomes an Archive of the chosen Skritter. Any Skritter carrying this book
    gains the Sage Wisdome of the chosen Skritter. This bonus does count against a Skritter's
    Sage Wisdom limit.
  </>),
};

const equipment = {
  archive,
};

export default equipment;
