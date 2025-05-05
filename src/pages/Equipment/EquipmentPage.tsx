import { useState } from "react";
import Page from "../Page";
import equipment from "../../data/equipment-data";
import { Equipment } from "../../types/types";

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showRanged, setShowRanged] = useState<boolean>(true);
  const [showBrawl, setShowBrawl] = useState<boolean>(true);
  const [showWeave, setShowWeave] = useState<boolean>(true);
  const [showGarb, setShowGarb] = useState<boolean>(true);
  const [showWorn, setShowWorn] = useState<boolean>(true);
  const [showHeld, setShowHeld] = useState<boolean>(true);

  const equips: Equipment[] = [
    ...Object.values(equipment)
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (<Page tab="equipment">
    {/* Search bar and filter options can be added here */}
    <div className="search-container">
      <input
        type="text"
        placeholder="Search equipment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <input
        type="checkbox"
        id="show-ranged"
        name="show-ranged"
        className="filter-checkbox"
        checked={showRanged}
        onChange={() => setShowRanged(!showRanged)}
      />
      <label htmlFor="show-ranged">Show Ranged</label>
      <input
        type="checkbox"
        id="show-brawl"
        name="show-brawl"
        className="filter-checkbox"
        checked={showBrawl}
        onChange={() => setShowBrawl(!showBrawl)}
      />
      <label htmlFor="show-brawl">Show Brawl</label>
      <input
        type="checkbox"
        id="show-weave"
        name="show-weave"
        className="filter-checkbox"
        checked={showWeave}
        onChange={() => setShowWeave(!showWeave)}
      />
      <label htmlFor="show-weave">Show Weave</label>
      <input
        type="checkbox"
        id="show-garb"
        name="show-garb"
        className="filter-checkbox"
        checked={showGarb}
        onChange={() => setShowGarb(!showGarb)}
      />
      <label htmlFor="show-garb">Show Garb</label>
      <input
        type="checkbox"
        id="show-worn"
        name="show-worn"
        className="filter-checkbox"
        checked={showWorn}
        onChange={() => setShowWorn(!showWorn)}
      />
      <label htmlFor="show-worn">Show Worn</label>

    </div>


    <h1>Equipment Page</h1>
    <p>This is the Equipment page where you can manage your equipment.</p>
    {/* Add more content and components related to the equipment here */}
  </Page>);
}
