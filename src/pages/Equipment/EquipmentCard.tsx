import { useState } from "react";
import { calculateModifiersAverage, formatModifiers } from "../../common/utilities";
import { Equipment } from "../../types/types";
import ItemTagsComponent from "../../common/Tags/ItemTagsComponent";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";
import './EquipmentCard.css';

type Props = SimpleProps | DraggableProps;
type SimpleProps = {
  item: Equipment;
  draggable?: false;
  dragData?: never;
  onRemove?: () => void;
};
type DraggableProps = {
  item: Equipment;
  draggable: true;
  dragData: {
    setDragRef: (node: HTMLElement | null) => void;
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners: SyntheticListenerMap | undefined;
  };
  onRemove?: () => void;
};

export default function EquipmentCard({
  item,
  draggable,
  // safe: only used when draggable=true
  dragData = {} as DraggableProps['dragData'],
  onRemove,
}: Props) {
  const [showAverage] = useState(false);

  const rangeDisplay = () => {
    if (item.range) {
      const rangeText = Array.isArray(item.range)
      ? `${item.range[0]} / ${item.range[1]}"`
      : `${item.range}"`;
      return <><label className="stat-label">Range:</label>
        <div className="stat-value">{rangeText}</div>
      </>
    } else {
      return null;
    }
  };

  const bonusDisplay = () => {
    if (item.bonus) {
      return <>
        {item.bonus && (
          <div>
            <label className="stat-label">Bonus:</label>
            <div>
              {formatModifiers(item.bonus)}
              {showAverage && (<>
                <br />
                <span className="average-bonus">
                  (
                    {calculateModifiersAverage(item.bonus)}, {calculateModifiersAverage(item.bonus, (item.slot == 'one-handed' ? 1 : 0))}, {calculateModifiersAverage(item.bonus, (item.slot == 'one-handed' ? 2 : 0))}
                  )
                </span>
              </>)}
            </div>
          </div>
        )}
      </>
    } else {
      return null;
    }
  }

  return (<div className={[
    "equipment-card",
    onRemove ? "equipment-card--removable" : "",
  ].filter(Boolean).join(' ')}>
    {onRemove && (
      <button
        className="remove-btn equipment-card-remove"
        onClick={onRemove}
        title="Remove Equipment"
      >
        ✕
      </button>
    )}
    <div className="card-header">
      <div>
        <h3 className="equipment-name">
            {draggable && (<div
                ref={dragData.setDragRef}
                {...dragData.attributes}
                {...dragData.listeners}
                className="drag-handle"
                title="Drag to remove"
              >⠿</div>)
            }
          {item.name}
        </h3>
      </div>
      {((item.tags?.length ?? 0) > 0)
        && <ItemTagsComponent tags={item.tags!} />
      }
    </div>
    
    <div className="stats-grid">
      <div>
        <label className="stat-label">Equip Slot: </label>
        <div className="equip-slot-stat">
          {
            item.slot == 'onetwo-handed' 
            ? 'One / Two-Handed'
            : item.slot
            }
        </div>
      </div>
      <div className="range">{rangeDisplay()}</div>
      <div>{bonusDisplay()}</div>
    </div>
    
    <div className="effect-section">
      <span className="effect-label">Effect:</span> 
      <div className="effect-text">{item.effect}</div>
    </div> 
  </div>);
};
