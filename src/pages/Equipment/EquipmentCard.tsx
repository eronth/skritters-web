import { useState } from "react";
import { calculateModifiersAverage, formatModifiers } from "../../common/utilities";
import { Equipment } from "../../types/types";
import ItemTagsComponent from "../../common/Tags/ItemTagsComponent";
import './EquipmentCard.css';

type Props = {
  item: Equipment;
};

export default function EquipmentCard({ item }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAverage, setShowAverage] = useState(true);

  const rangeDisplay = () => {
    if (item.range) {
      const rangeText = Array.isArray(item.range)
      ? `${item.range[0]} / ${item.range[1]}"`
      : `${item.range}"`;
      return <><span className="stat-label">Range: </span>{rangeText}</>
    } else {
      return null;
    }
  };

  const bonusDisplay = () => {
    if (item.bonus) {
      return <>
        {item.bonus && (
          <div>
            <span className="stat-label">Bonus: </span>
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
        )}
      </>
    } else {
      return null;
    }
  }

  return (<div className="equipment-card">
    <div className="card-header">
      <div>
        <h3 className="equipment-name">{item.name}</h3>
      </div>
      {((item.tags?.length ?? 0) > 0)
        && <ItemTagsComponent tags={item.tags!} />
      }
    </div>
    
    <div className="stats-grid">
      <div>
        <span className="stat-label">Equip Slot: </span>
        <span className="equip-slot-stat">{item.slot}</span>
      </div>
      <div>{rangeDisplay()}</div>
      <div>{bonusDisplay()}</div>
    </div>
    
    <div className="effect-section">
      <span className="effect-label">Effect:</span> 
      <p className="effect-text">{item.effect}</p>
    </div>
  </div>);
};
