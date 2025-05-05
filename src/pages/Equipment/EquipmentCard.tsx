import { useState } from "react";
import { calculateModifiersAverage, formatModifiers } from "../../common/utilities";
import { Equipment } from "../../types/types";
import ItemTagsComponent from "../../common/Tags/ItemTagsComponent";
import './EquipmentCard.css';

type Props = {
  item: Equipment;
};

export default function EquipmentCard({ item }: Props) {
  const [showAverage, setShowAverage] = useState(true);

  return (<div className="equipment-card">
    <div className="card-header">
      <h3 className="equipment-name">{item.name}</h3>
      {((item.tags?.length ?? 0) > 0)
        && <ItemTagsComponent tags={item.tags!} />
      }
    </div>
    
    <div className="stats-grid">
      <div>
        <span className="stat-label">Range:</span> {item.range}"
      </div>
      <div>
        {item.bonus && (
          <div>
            <span className="stat-label">Bonus:</span>
            {formatModifiers(item.bonus)}
            {showAverage && (
              <span className="average-bonus">
                ({calculateModifiersAverage(item.bonus)})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
    
    <div className="effect-section">
      <span className="effect-label">Effect:</span> 
      <p className="effect-text">{item.effect}</p>
    </div>
  </div>);
};
