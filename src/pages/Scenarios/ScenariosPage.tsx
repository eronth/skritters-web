import Bsp from "../../common/Formatting/bsp";
import Page from "../Page";
import scenarios from "../../data/scenario-data";
import './ScenariosPage.css';

export default function ScenariosPage() {
  const indexUnify = {
    joinTo: 5,
    joinOf: 6
  };

  const rollableTable = <>
    {scenarios.map((scenario, index) => {
      if (indexUnify.joinOf == index) { return null; }

      let nameLink = (
        <a href={'#scenario-' + index}>
          {scenario.name}    
          </a>
      );
      if (indexUnify.joinTo == index) {
        const joinedNameLink = (
          <a href={'#scenario-' + indexUnify.joinOf}>
            {scenarios[indexUnify.joinOf].name}
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
  </>;

  return (<Page tab="scenarios">
    <p>
      Below is the list of possible scenarios you can
      play in a game of Skritters. You can select a
      scenario by rolling a dice, or by choosing one
      that interests you.
    </p>
    <p>
      Each scenario provides a unique set of challenges
      and objectives for players to navigate. Scenarios
      are broken into sections for easier understanding.
    </p>
    <p>
      Setup — This details any additional setup needed
    </p>
    <div>
      // TODO: DEPLOYMENT ZONES
    </div>
    <div className="roll-table">
      {rollableTable}
    </div>
    {scenarios.map((scenario, index) => (
      <div key={index} className="scenario">
        <h1 id={'scenario-' + index}>{scenario.name}</h1>
        <h2>Setup</h2>
        <p>{scenario.setup}</p>
        <h2>Deployment</h2>
        <p>{scenario.deployment}</p>
        <h2>End Conditions</h2>
        <p>{scenario.endConditions}</p>
        <h2>Scoring</h2>
        <p>{scenario.scoring}</p>
        <h2>Additional Rules</h2>
        <p>{scenario.extraRules}</p>
      </div>
    ))}
  </Page>);
}
