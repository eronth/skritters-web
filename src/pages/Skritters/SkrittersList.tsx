import { useState } from "react";
import Header from "../../common/Header";
import SkritterComponent from "../../common/SkritterDisplay/SkritterComponent";
import skritters from "../../data/skritter-data";
import { Skritter } from "../../types/types";
import './SkrittersList.css';

export default function SkrittersList() {
  const [searchTerm, setSearchTerm] = useState('');

  const skrits: Skritter[] = [
    ...Object.values(skritters)
  ].sort((a, b) => a.name.localeCompare(b.name));
  
  // Filter skritters based on search term
  const filteredSkritters = skrits.filter(skritter => 
    skritter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skritter.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    skritter.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="skritters-page">
      <Header selectedTab={"skritters"} />
      
      <div className="main-container">
        
        {/* Search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search skritters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* Skritters list */}
        <div className="skritters-grid">
          {filteredSkritters.length > 0 ? (
            filteredSkritters.map((skritter, index) => (
              <SkritterComponent key={index} skritter={skritter} />
            ))
          ) : (
            <div className="no-results">
              No skritters found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}