import { Skritter } from "../../types/types";
import CreatureTags from "../Tags/SkritterTagsComponent";
import StatsGrid from "./StatsGrid";
import './SkritterComponent.css';
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";

type Props = SimpleProps | DraggableProps;
type SimpleProps = {
  skritter: Skritter;
  draggable?: false;
  dragData?: never;
  onRemoveSkritter?: () => void;
};
type DraggableProps = {
  skritter: Skritter;
  draggable: true;
  dragData: {
    setDragRef: (node: HTMLElement | null) => void;
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners: SyntheticListenerMap | undefined;
  };
  onRemoveSkritter?: () => void;
};

export default function SkritterComponent({
  skritter,
  draggable,
  // safe: only used when draggable=true
  dragData = {} as DraggableProps['dragData'],
  onRemoveSkritter,
}: Props) {

  return (
    <div className={[
      "skritter-card",
      onRemoveSkritter ? "skritter-card--removable" : "",
    ].filter(Boolean).join(' ')}>
      {onRemoveSkritter && (
        <button
          className="remove-btn skritter-card-remove"
          onClick={onRemoveSkritter}
          title="Remove Skritter"
        >
          ✕
        </button>
      )}
      <div className="skritter-header">
        <h2 className="skritter-title">
          {draggable && (<div
              ref={dragData.setDragRef}
              {...dragData.attributes}
              {...dragData.listeners}
              className="drag-handle"
              title="Drag to remove"
            >⠿</div>)
          }
          {skritter.name}
        </h2>
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