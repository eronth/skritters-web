import { useState } from "react";
import SkritterComponent from "../../common/SkritterDisplay/SkritterComponent";
import Page from "../Page";
import SearchAndFilter from "../../common/SearchAndFilter/SearchAndFilter";
import { Skritter } from "../../types/types";
import skritters from "../../data/skritter-data";
import './SkrittersListPage.css';

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
    <Page tab={'skritters'} className="skritters-page">
      {/* Search bar */}
      <SearchAndFilter
        searchTermState={[searchTerm, setSearchTerm]}
      />
      
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
    </Page>
  );
}