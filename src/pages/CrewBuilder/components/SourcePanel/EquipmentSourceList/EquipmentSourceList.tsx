import { useMemo, useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import EquipmentCard from '../../../../../common/EquipmentDisplay/EquipmentCard';
import SearchAndFilter from '../../../../../common/SearchAndFilter/SearchAndFilter';
import {
  Equipment,
  EQUIPMENT_SLOTS,
  EQUIPMENT_TYPES,
  EquipmentSlotType,
  EquipmentType,
  Filter,
} from '../../../../../types/types';
import { ITEM_KEYWORDS, ItemKeyword } from '../../../../../types/keywords';
import equipment from '../../../../../data/equipment-data';
import { DragEquipmentData, DropSourceData } from '../../crewBuilderTypes';

type DraggableProps = {
  equipmentKey: string;
  item: Equipment;
  disabled: boolean;
};

function DraggableEquipmentCard({ equipmentKey, item, disabled }: DraggableProps) {
  const dragData: DragEquipmentData = { type: 'equipment', key: equipmentKey, equipment: item };
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `source-equip-${equipmentKey}`,
    data: dragData,
    disabled,
  });

  return (
    <div
      className={[
        'source-item',
        disabled ? 'source-item--disabled' : '',
        isDragging ? 'source-item--dragging' : '',
      ].filter(Boolean).join(' ')}
    >
      <EquipmentCard
        item={item}
        draggable={true}
        dragData={{ setDragRef: setNodeRef, attributes, listeners }}
      />
    </div>
  );
}

type Props = {
  usedKeys: Set<string>;
  allowDuplicates: boolean;
};

export default function EquipmentSourceList({ usedKeys, allowDuplicates }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<EquipmentType[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<EquipmentSlotType[]>([]);
  const [selectedTags, setSelectedTags] = useState<ItemKeyword[]>([]);

  const dropData: DropSourceData = { type: 'equip-source' };
  const { setNodeRef } = useDroppable({ id: 'equip-source', data: dropData });

  const allEquipment = useMemo(
    () => Object.entries(equipment).sort(([, a], [, b]) => a.name.localeCompare(b.name)),
    []
  );

  const allTypes: EquipmentType[] = Object.values(EQUIPMENT_TYPES);
  const allSlots = Object.values(EQUIPMENT_SLOTS).filter(s => s !== 'onetwo-handed');
  const allTags = Object.values(ITEM_KEYWORDS).filter(t => t !== 'METALORPLANT');

  const filters: Filter[] = [
    { name: 'Type', allOptions: allTypes, selectedOptions: selectedTypes, setSelectedOptions: setSelectedTypes },
    { name: 'Slot', allOptions: allSlots, selectedOptions: selectedSlots, setSelectedOptions: setSelectedSlots },
    { name: 'Tags', allOptions: allTags, selectedOptions: selectedTags, setSelectedOptions: setSelectedTags },
  ];

  const filtered = useMemo(() => {
    let results = allEquipment.map(([key, item]) => ({ key, item }));

    if (searchTerm) {
      results = results.filter(({ item }) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedTypes.length > 0) {
      results = results.filter(({ item }) => selectedTypes.includes(item.type));
    }
    if (selectedSlots.length > 0) {
      results = results.filter(({ item }) => {
        if (item.slot === 'onetwo-handed') {
          return selectedSlots.includes('one-handed') || selectedSlots.includes('two-handed');
        }
        return selectedSlots.includes(item.slot);
      });
    }
    if (selectedTags.length > 0) {
      results = results.filter(({ item }) => {
        const tags = item.tags ?? [];
        return selectedTags.some(tag => {
          if (tag === 'METAL') return tags.includes('METAL') || tags.includes('METALORPLANT');
          if (tag === 'PLANT') return tags.includes('PLANT') || tags.includes('METALORPLANT');
          return tags.includes(tag);
        });
      });
    }
    return results;
  }, [allEquipment, searchTerm, selectedTypes, selectedSlots, selectedTags]);

  return (
    <div ref={setNodeRef} className="source-list">
      <SearchAndFilter
        searchTermState={[searchTerm, setSearchTerm]}
        filters={filters}
        stacked
      />
      <div className="source-grid">
        {filtered.map(({ key, item }) => (
          <DraggableEquipmentCard
            key={key}
            equipmentKey={key}
            item={item}
            disabled={!allowDuplicates && usedKeys.has(key)}
          />
        ))}
        {filtered.length === 0 && <div className="no-results">No equipment found.</div>}
      </div>
    </div>
  );
}
