import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import Page from '../Page';
import CrewPanel from './components/CrewPanel/CrewPanel';
import SourcePanel from './components/SourcePanel/SourcePanel';
import { useCrewsState } from './components/useCrewsState';
import { useDragHandlers } from './components/useDragHandlers';
import { useImportExport } from './components/useImportExport';
import './CrewBuilderPage.css';

export default function CrewBuilderPage() {
  const [sourcePanelOpen, setSourcePanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'skritters' | 'equipment'>('skritters');

  const {
    crewsState,
    activeCrew,
    crewSlots,
    allowDuplicateSkritters,
    allowDuplicateEquipment,
    usedSkritterKeys,
    usedEquipmentKeys,
    setCrewSlots,
    updateActiveCrew,
    handleChangeMaxSlots,
    handleChangeGlobalMaxEquipment,
    handleChangeSlotMaxEquipment,
    handleRemoveSkritter,
    handleRemoveUnusedEquipmentSlots,
    handleRemoveEquipment,
    handleRemoveFreeEquipment,
    handleAddCrew,
    handleSwitchCrew,
    handleRenameCrew,
    importState,
  } = useCrewsState();

  const { fileInputRef, handleExport, handleImportClick, handleFileChange } = useImportExport({
    crewsList: crewsState.list,
    activeCrewId: crewsState.activeId,
    onImport: importState,
  });

  const { activeDrag, sensors, handleDragStart, handleDragEnd } = useDragHandlers({
    crewSlots,
    allowDuplicateSkritters,
    allowDuplicateEquipment,
    setCrewSlots,
    handleRemoveSkritter,
    handleRemoveEquipment,
  });

  return (
    <Page tab="crew-builder" className={`crew-builder-page${sourcePanelOpen ? ' source-open' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <p>
        To build your crew, select 4 Skritters to be members. Each member must
        be a different Skritter from others in your crew — no duplicates!
        Then, equip your Skritters with items of your choice; again no duplicates.
        Use the following rules to equip your Skritters:
      </p>
      <ul>
        <li>
          Your first equipped items can either be 2 one-handed items or 1 two-handed item.
          This acts as the items the Skritter is "holding".
        </li>
        <li>
          Beyond the held items, you can equip additional items in up to 2 extra slots.
          These can be any type of item, including more one-handed or two-handed items,
          but any additional -handed items are considered carried by the Skritter, but
          not held in their hands, and thus no benefits are conferred.
        </li>
        <li>
          You can't have more than one of the same garb type (face, head, body, back, special)
          accross these slots per Skritter.
        </li>
      </ul>
      <br /><hr /><br />
      <DndContext sensors={sensors} modifiers={[snapCenterToCursor]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="crew-builder-layout">
          <div className="crew-builder-left">
            <CrewPanel
              crewSlots={crewSlots}
              globalMaxEquipment={activeCrew.globalMaxEquipment}
              allowDuplicateSkritters={allowDuplicateSkritters}
              allowDuplicateEquipment={allowDuplicateEquipment}
              maxSlots={activeCrew.maxSlots}
              crews={crewsState.list.map(c => ({ id: c.id, name: c.name }))}
              activeCrewId={crewsState.activeId}
              crewName={activeCrew.name}
              onToggleDupSkritters={() => updateActiveCrew(c => ({ ...c, allowDuplicateSkritters: !c.allowDuplicateSkritters }))}
              onToggleDupEquipment={() => updateActiveCrew(c => ({ ...c, allowDuplicateEquipment: !c.allowDuplicateEquipment }))}
              onChangeMaxSlots={handleChangeMaxSlots}
              onChangeGlobalMaxEquipment={handleChangeGlobalMaxEquipment}
              onRemoveSkritter={handleRemoveSkritter}
              onRemoveEquipment={handleRemoveEquipment}
              onRemoveFreeEquipment={handleRemoveFreeEquipment}
              onChangeSlotMaxEquipment={handleChangeSlotMaxEquipment}
              onRemoveUnusedEquipmentSlots={handleRemoveUnusedEquipmentSlots}
              onAddCrew={handleAddCrew}
              onSwitchCrew={handleSwitchCrew}
              onRenameCrew={handleRenameCrew}
              onExport={handleExport}
              onImport={handleImportClick}
            />
          </div>
          <SourcePanel
            isOpen={sourcePanelOpen}
            activeTab={activeTab}
            usedSkritterKeys={usedSkritterKeys}
            usedEquipmentKeys={usedEquipmentKeys}
            allowDuplicateSkritters={allowDuplicateSkritters}
            allowDuplicateEquipment={allowDuplicateEquipment}
            onToggleOpen={() => setSourcePanelOpen(p => !p)}
            onChangeTab={setActiveTab}
          />
        </div>
        <DragOverlay>
          {activeDrag?.type === 'skritter' && (
            <div className="drag-overlay-card">{activeDrag.skritter.name}</div>
          )}
          {activeDrag?.type === 'equipment' && (
            <div className="drag-overlay-card">{activeDrag.equipment.name}</div>
          )}
        </DragOverlay>
      </DndContext>
    </Page>
  );
}
