// import React, { useState, useMemo } from 'react';
import { useMemo, useState } from 'react';
import Page from '../Page';
import SearchAndFilter from '../../common/SearchAndFilter/SearchAndFilter';
import EquipmentCard from '../../common/EquipmentDisplay/EquipmentCard';
import { Equipment, EQUIPMENT_SLOTS, EQUIPMENT_TYPES, EquipmentSlotType, EquipmentType, Filter } from '../../types/types';
import equipment from '../../data/equipment-data';
import { ITEM_KEYWORDS, ItemKeyword } from '../../types/keywords';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandBackFist, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import './EquipmentPage.css';

// Main Application Component
export default function EquipmentPage() {
  const equips: Equipment[] = [
    ...Object.values(equipment)
  ].sort((a, b) => a.name.localeCompare(b.name));

  const [searchTerm, setSearchTerm] = useState('');

  // const [sortBy, setSortBy] = useState<'name' | 'type' | 'range'>('name');
  // const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // Toggle sort direction or change sort field
  // const handleSort = (field: 'name' | 'type' | 'range') => {
  //   if (sortBy === field) {
  //     setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortBy(field);
  //     setSortDirection('asc');
  //   }
  // };

  const [selectedTypes, setSelectedTypes] = useState<EquipmentType[]>([]);
  const allTypes: EquipmentType[] = Object.values(EQUIPMENT_TYPES);
  
  const [selectedSlots, setSelectedSlots] = useState<EquipmentSlotType[]>([]);
  const allSlots: EquipmentSlotType[] = Object.values(EQUIPMENT_SLOTS);
  // Remove 'onetwo-handed' from the allSlots array
  const allSlotsWithoutOneTwoHanded = allSlots.filter(slot => slot !== 'onetwo-handed');

  const [selectedTags, setSelectedTags] = useState<ItemKeyword[]>([]);
  const allTags: ItemKeyword[] = Object.values(ITEM_KEYWORDS);
  // Remove METALORPLANT from the allTags array
  const allTagsWithoutMetalOrPlant = allTags.filter(tag => tag !== 'METALORPLANT');

  const filters: Filter[] = [
    {
      name: "Equipment Type",
      allOptions: [...allTypes],
      selectedOptions: selectedTypes,
      setSelectedOptions: setSelectedTypes,
    },
    {
      name: "Equipment Slot",
      allOptions: [...allSlotsWithoutOneTwoHanded],
      selectedOptions: selectedSlots,
      setSelectedOptions: setSelectedSlots,
    },
    {
      name: "Tags",
      allOptions: [...allTagsWithoutMetalOrPlant],
      selectedOptions: selectedTags,
      setSelectedOptions: setSelectedTags,
    },
  ];

  const filteredEquipment = useMemo(() => {
    let results = equips;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) //||
        //item.effect.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (selectedTypes.length > 0) {
      results = results.filter(item => selectedTypes.includes(item.type));
    }
    
    // Apply slot filter
    if (selectedSlots.length > 0) {
      
      results = results.filter(item => {
        if (item.slot == 'onetwo-handed') {
          return selectedSlots.includes('one-handed') || selectedSlots.includes('two-handed');
        }
        return selectedSlots.includes(item.slot)
      }
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      results = results.filter(item => {
        const itemTags = item.tags || [];
        return selectedTags.some(tag => {
          if (tag == 'METAL') {
            return (itemTags.includes('METAL') || itemTags.includes('METALORPLANT'));
          } else if (tag == 'PLANT') {
            return (itemTags.includes('PLANT') || itemTags.includes('METALORPLANT'));
          }
          return itemTags.includes(tag)
        });
      });
    }
    
    // Apply sorting
    const slotSortOrder = {
      'one-handed': 1,
      'onetwo-handed': 2,
      'two-handed': 3,
      'face': 4,
      'head': 5,
      'body': 6,
      'back': 7,
      'special': 8,
      'grenade': 9,
      'deployable': 10
    }
    results = [...results].sort((a, b) => {
      // let compareValue: number;

      // Put 1h before 2h, then sort by name
      if (slotSortOrder[a.slot] < slotSortOrder[b.slot]) return -1;
      if (slotSortOrder[a.slot] > slotSortOrder[b.slot]) return 1;
      return a.name.localeCompare(b.name);
      
      // if (sortBy === 'name') {
      //   compareValue = a.name.localeCompare(b.name);
      // } else if (sortBy === 'type') {
      //   compareValue = a.type.localeCompare(b.type);
      // } else if (sortBy === 'range') {
      //   // Handle range sorting with consideration for dual ranges
      //   const rangeA =  (typeof a.range === 'number')
      //     ? a.range
      //     : (Array.isArray(a.range) ? a.range[0] : 0);
      //   const rangeB =  (typeof b.range === 'number')
      //     ? b.range
      //     : (Array.isArray(b.range) ? b.range[0] : 0);
      //   compareValue = rangeA - rangeB;
      // } else {
      //   compareValue = 0;
      // }
      
      // return sortDirection === 'asc' ? compareValue : -compareValue;
    });
    
    return results;
  }, [
    equips,
    searchTerm,
    selectedTypes,
    selectedSlots,
    selectedTags,
    // sortBy,
    // sortDirection
  ]);

   // Group equipment by type
   const groupedEquipment = useMemo(() => {
    const groups: Record<EquipmentType, Equipment[]> = {
      'ranged': [],
      'brawl': [],
      'weave': [],
      'garb': [],
    };
    
    filteredEquipment.forEach(item => {
      groups[item.type].push(item);
    });
    
    return groups;
  }, [filteredEquipment]);


  const categorySectionIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ranged': return <FontAwesomeIcon icon={faBullseye} />;
      case 'brawl': return <FontAwesomeIcon icon={faHandBackFist} />;
      case 'weave': return <FontAwesomeIcon icon={faWandSparkles} />;
      case 'garb': return null; //<FontAwesomeIcon icon={faShield} />;
      default: return null;
    }
  };


  return (<Page tab={'equipment'}>
    {/* Search and Filters */}
    <SearchAndFilter
      searchTermState={[searchTerm, setSearchTerm]}
      filters={filters}
    />

    {/* Results Stats */}
    <div className="results-stats">
      Showing {filteredEquipment.length} items
      {selectedTypes.length > 0 && ` in ${selectedTypes.length} type categories`}
      {selectedSlots.length > 0 && ` with ${selectedSlots.length} slot types`}
    </div>

    {/* Equipment Display */}
    <div className="equipment-groups">
    {Object.entries(groupedEquipment).map(([type, items]) => {
      if (items.length === 0) return null;
      
      return (
        <div key={type} className="equipment-group">
          <div className="group-header">
            <h2 className="group-title">
              {categorySectionIcon(type)} {type}
            </h2>
            <span className="group-count">{items.length}</span>
          </div>
          
          <div className="equipment-grid">
            {items.map((item, index) => (
              <EquipmentCard key={index} item={item} />
            ))}
          </div>
        </div>
      );
    })}
    
    {filteredEquipment.length === 0 && (
      <div className="no-results">
        <p className="no-results-message">No equipment found matching your search criteria.</p>
        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedTypes([]);
            setSelectedSlots([]);
          }}
          className="clear-all-button"
        >
          Clear all filters
        </button>
      </div>
    )}
  </div>

  </Page>);
};
