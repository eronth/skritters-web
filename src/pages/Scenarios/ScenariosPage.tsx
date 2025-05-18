import Page from "../Page";
import scenarios from "../../data/scenario-data";
import './ScenariosPage.css';

export default function ScenariosPage() {
  return (<Page tab="scenarios">
    {scenarios.map((scenario, index) => (
      <div key={index} className="scenario">
        <h1>{scenario.name}</h1>
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
