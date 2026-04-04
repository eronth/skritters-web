import { Skritter } from "../../types/types";
import CreatureTags from "../Tags/SkritterTagsComponent";
import StatsGrid from "./StatsGrid";
import './SkritterComponent.css';

type Props = {
  skritter: Skritter;
};

export default function SkritterComponent({ skritter }: Props) {

  return (
    <div className="skritter-card">
      <div className="skritter-header">
        <h2 className="skritter-title">{skritter.name}</h2>
        <CreatureTags tags={skritter.tags} />
      </div>
      
      <p className="skritter-description">{skritter.description}</p>
      
      <StatsGrid stats={skritter.stats} />
      
      {/* Abilities section */}
      <div>
        <h3 className="section-title">Abilities</h3>
        <div className="abilities-container">
          {skritter.abilities.map((ability, idx) => (
            <div key={idx} className="ability">
              <h4 className="ability-name">{ability.name}</h4>
              <div className="ability-effect">{ability.effect}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Retirement section */}
      {skritter.retirement.length > 0 && (
        <div>
          <h3 className="section-title">Retirement</h3>
          <div className="retirement-container">
            {skritter.retirement.map((effect, id) => (
              <div key={id} className="retirement-effect">{effect}</div>
            ))}
          </div>
          { skritter.sageWisdom
          ? <div className="sage-wisdom-container">
              <h4 className="section-title">{skritter.sageWisdom.type} Sage Wisdom</h4>
              <div className="sage-wisdom-text">
                {skritter.sageWisdom.effect || "No Sage Wisdom available."}
              </div>
            </div>
          : null}
        </div>
      )}
    </div>
  );
}