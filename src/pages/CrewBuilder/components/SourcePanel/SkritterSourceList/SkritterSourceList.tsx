import { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import SkritterCard from '../../../../../common/SkritterDisplay/SkritterCard';
import SearchAndFilter from '../../../../../common/SearchAndFilter/SearchAndFilter';
import { Skritter } from '../../../../../types/types';
import skritters from '../../../../../data/skritter-data';
import { DragSkritterData, DropSourceData } from '../../crewBuilderTypes';

type DraggableProps = {
  skritterKey: string;
  skritter: Skritter;
  disabled: boolean;
};

function DraggableSkritterCard({ skritterKey, skritter, disabled }: DraggableProps) {
  const dragData: DragSkritterData = { type: 'skritter', key: skritterKey, skritter };
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `source-skritter-${skritterKey}`,
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
      <SkritterCard
        skritter={skritter}
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

export default function SkritterSourceList({ usedKeys, allowDuplicates }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const dropData: DropSourceData = { type: 'skritter-source' };
  const { setNodeRef } = useDroppable({ id: 'skritter-source', data: dropData });

  const allSkritters = Object.entries(skritters).sort(
    ([, a], [, b]) => a.name.localeCompare(b.name)
  );

  const filtered = allSkritters.filter(
    ([, s]) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={setNodeRef} className="source-list">
      <SearchAndFilter searchTermState={[searchTerm, setSearchTerm]} />
      <div className="source-grid">
        {filtered.map(([key, skritter]) => (
          <DraggableSkritterCard
            key={key}
            skritterKey={key}
            skritter={skritter}
            disabled={!allowDuplicates && usedKeys.has(key)}
          />
        ))}
        {filtered.length === 0 && <div className="no-results">No Skritters found.</div>}
      </div>
    </div>
  );
}
