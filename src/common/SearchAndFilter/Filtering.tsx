import { Filter } from "../../types/types";
import './Filtering.css';

type Props = {
  filters?: Filter[];
};

export default function Filtering({ filters }: Props) {
  const toggleFilterOption = (filter: Filter, option: string) => {
    if (!filter) return;
    
    filter.setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option) 
        : [...prev, option]
    );
  };

  return (<div className="filters-grid">
    {filters ? filters.map((filter, index) => (
      <div key={index} className="filter-section">
        <h3>
          <span className="filter-icon">⚙️</span> Filter by {filter.name}:
        </h3>
        <div className="filter-options">
          {filter.allOptions.map(type => (
            <button
              key={type}
              onClick={() => toggleFilterOption(filter, type)}
              className={`filter-button ${filter.selectedOptions.includes(type) ? 'active' : ''}`}
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