import Keyword from "../../common/Keywords/Keyword";
import Attack from "../../common/Keywords/rules/action/Attack";
import BrawlAction from "../../common/Keywords/rules/action/BrawlAction";
import Night from "../../common/Keywords/times/Night";
import Summer from "../../common/Keywords/times/Summer";
import { Equipment } from "../../types/types";

const goggles: Equipment = {
  name: "Goggles",
  type: "garb", slot: "face",
  effect: (<>
    You may equip one extra Face item (this item does nothing).
  </>)
};

const slickShades: Equipment = {
  name: "Slick Shades",
  type: "garb", slot: "face",
  effect: (<>
    (reduce the effects of <Summer /> and somehow make you better 
    because you're slick.)
  </>)
};

const angryEyes: Equipment = {
  name: "Angry Eyes",
  type: "garb", slot: "face",
  effect: (<>
    <BrawlAction plural />
  </>)
};

const studentsSpectacles: Equipment = {
  name: "Students Spectacles",
  type: "garb", slot: "face",
  effect: (<>
    A Skritter wearing these spectacles can be under the effects
    of two <Keyword>Sage Wisdoms</Keyword>.
  </>)
};

const radiantEyepiece: Equipment = {
  name: "Radiant Eyepiece",
  type: "garb", slot: "face",
  effect: (<>
    Ignore penalties to <Attack plural /> during <Night /> missions.
  </>)
};

const equipment = {
  goggles,
  slickShades,
  angryEyes,
  studentsSpectacles,
  radiantEyepiece,
};

export default equipment;
