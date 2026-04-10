import Bsp from "../../common/Formatting/bsp";
import Page from "../Page";
import scenarios from "../../data/scenario-data";
import Match from "../../common/Match";
import VictoryPoint from "../../common/Keywords/VictoryPoint/VictoryPoint";
import { ScenarioCategory } from "../../types/types";
import './ScenariosPage.css';

export default function ScenariosPage() {
  const indexUnify = {
    joinTo: 5,
    joinOf: 6
  };

  const nameToId = (name: string) => 
    name.replaceAll(' ', '-').toLowerCase();

  const categoryToText = (type: ScenarioCategory) => {
    switch (type) {
      case 'neutral':
        return '';
      case 'assault&guard':
        return '(Guard & Assault)';
      case 'faceoff':
        return '(Face-Off)';
      default:
        return '(Unknown)';
    }
  };


  const rollableTable = <div className="roll-table">
    <div className="roll-table-header">
      Roll a 1d12 to determine which mission to play
    </div>
    <div className="roll-table-body">
      {scenarios.map((scenario, index) => {
        if (indexUnify.joinOf == index) { return null; }

        let nameLink = (
          <a href={'#scenario-' + nameToId(scenario.name)}>
            {scenario.name}    
          </a>
        );
        if (indexUnify.joinTo == index) {
          const nameOfJoinOf = scenarios[indexUnify.joinOf].name;
          const joinedNameLink = (
            <a href={'#scenario-' + nameToId(nameOfJoinOf)}>
              {nameOfJoinOf}
            </a>
          );
          nameLink = <>{nameLink} / {joinedNameLink}</>
        }

        const tableCount = (
          (index > indexUnify.joinTo)
          ? index-1
          : index
        );

        return (
          <div key={index} className="roll-table-row">
            <div className="number">
              {tableCount+1}
            </div>
            <div>
              —<Bsp />{nameLink}
            </div>
          </div>
        )
      })}
    </div>
  </div>;

  return (<Page tab="scenarios">
    <p>
      A scenario outlines a set of rules and objectives
      when playing a <Match /> of Skritters. The ultimate
      goal of any scenario is to score more<Bsp />
      <VictoryPoint plural /> than your opponent.
      Each scenario provides a unique set of challenges
      and objectives for players to navigate, along with
      detailing the scenario-specific way to score
      your <VictoryPoint plural />.
    </p>
    <p>
      Some scenarios require an "assaulting" player and
      a "guarding" player. In these cases, you can randomly
      decide which player will take on which role. Alternatively,
      if both players agree, you can decide which roles make
      more narrative sense.
    </p>
    <p>
      Scenarios are broken into sections for easier understanding.
    </p>
    <div>
      <div>
        Setup — This details any additional setup needed
        beyond the default rules. It might include additional
        terrain, markers, or simply choosing already set
        up stuff to be <Match /> related.
      </div>
      <div>
        Deployment — This will detail the valid types of
        deployment zones for the mission. Follow the
        deployment rules to select the deployment zone,
        keeping any restrictions from here in mind.
      </div>
      <div>
        End Conditions — The end conditions list the criteria
        that cause the scenario, and thus <Match /> to conclude.
        Sometimes this simply lists a number of turns before 
        the <Match /> is brought to an end. In other cases,
        there may be additional conditions that can also
        cause the end of a <Match />. After a match is concluded,
        do any final scoring.
      </div>
      <div>
        Scoring — This outlines how a team earns<Bsp />
        <VictoryPoint plural /> through the <Match />.
        Sometimes <VictoryPoint plural /> are tallied 
        only at the end of a <Match />, other times you
        will keep a running tally throughout the duration
        of the <Match />.
      </div>
      <div>
        Additional Rules — This section contains any other 
        special rule you need to know or follow for the
        scenario. Pay attention to these, since this is
        the section that really makes scenarios different
        from one another.
      </div>
    </div>
    <div>
      // TODO: DEPLOYMENT ZONES
    </div>

    <p>
      Below is the list of possible scenarios you can
      play in a game of Skritters. You can select a
      scenario by rolling a dice, or by choosing one
      that interests you.
    </p>
    {rollableTable}

    {scenarios.map((scenario, index) => (
      <div key={index} className="scenario">
        <h1 id={'scenario-' + nameToId(scenario.name)}>
          {scenario.name}
          <span className="category">{categoryToText(scenario.type)}</span>
        </h1>

        <div className="inline-data">
          <h2>Setup</h2>
          <h2>Scoring</h2>
          <p>{scenario.setup}</p>
          <p>{scenario.scoring}</p>
        </div>

        <div className='inline-data'>
          <h2>Deployment</h2>
          <h2>End Conditions</h2>
          <p>{scenario.deployment}</p>
          <p>{scenario.endConditions}</p>
        </div>

        <h2>Additional Rules</h2>
        <p>{scenario.extraRules}</p>
      </div>
    ))}
  </Page>);
}
