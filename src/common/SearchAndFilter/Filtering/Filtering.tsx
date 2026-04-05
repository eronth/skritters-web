import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Filter } from "../../../types/types";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import './Filtering.css';

type Props = {
  filters?: Filter[];
  stacked?: boolean;
};

export default function Filtering({ filters, stacked }: Props) {
  const toggleFilterOption = (filter: Filter, option: string) => {
    if (!filter) return;
    
    filter.setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option) 
        : [...prev, option]
    );
  };

  return (<div className={`filters-grid${stacked ? ' stacked' : ''}`}>
    {filters ? filters.map((filter, index) => (
      <div key={index} className="filter-section">
        <h3>
          <FontAwesomeIcon icon={faGear} />
          <span className="description-text">Filter by {filter.name}:</span>
        </h3>
        <div className="filter-options">
          {filter.allOptions.map(type => (
            <button
              key={type}
              onClick={() => toggleFilterOption(filter, type)}
              className={`filter-button ${type.toLowerCase()} ${filter.selectedOptions.includes(type) ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
          {filter.selectedOptions.length > 0 && (<>
            <button 
              onClick={() => filter.setSelectedOptions([])}
              className={"filter-button clear"}
            >
              Clear
            </button>
          </>
          )}
        </div>
      </div>
    )) : null}
    </div>)
}