import Page from "../Page";
import Match from "../../common/Match";
import CreateYourCrew from "./CreateYourCrew";
import ActionsRulesComponent from "./ActionRulesComponent/ActionsRulesComponent";
import Turns from "./Turns";
import DiceAndTestsComponent from "./DiceAndTestsComponent";
import ResourcesRules from "./RecoureRules/ResourcesRules";
import Terrain from "./Terrain";
import TagRules from "./TagRules/TagRules";
import { Link } from "react-router";
import Bsp from "../../common/Formatting/bsp";
import VictoryPoint from "../../common/Keywords/VictoryPoint/VictoryPoint";

export default function HowToPlayPage() {
  
  return (<Page tab={"how-to-play"}>
    <h1>Overview</h1>
    <p>Welcome to the skirmish game of Skritters! A cute little game where players face off with their squad of Skritters.</p>
    <h2>What's a Skritter?</h2>
    <p>
      Skritters are cute little anthropomorphized critters. Each Skritter has its own unique abilities and characteristics that make them special.
      They are cute-yet-fierce and looking to do what's necessary to protect their little clan.
    </p>
    <h2>What's a Skirmish Game</h2>
    A skirmish game is a type of tabletop game that 
    focuses on small-scale battles between a few units or characters. Players will each
    assemble a squad of Skritters, each with their own unique abilities and stats, and face off against
    each other in a battle to see who can outmaneuver and outsmart their opponent to claim
    the most <VictoryPoint plural /> in a <Match />.

    The game of Skritters favors a campaign-style play, where players will play
    several <Match plural /> over the course of a campaign, building their squad
    more and more as they go.
    
    <h1>How to Play</h1>
    <p>
      Below are the rules you'll need to know to actually play the game of Skritters.
      Once you know these rules, check the <Link to='/scenarios'>Scenarios</Link>
      <Bsp /> section for more information on how to set up and play a <Match />,
      and the <Link to="/campaign">Campaign</Link> section for more information 
      a narrative series of <Match plural />.
    </p>
    <CreateYourCrew />
    <DiceAndTestsComponent />
    <Turns />
    <ActionsRulesComponent />
    <Terrain />
    <ResourcesRules />
    <TagRules />
  </Page>);
}
