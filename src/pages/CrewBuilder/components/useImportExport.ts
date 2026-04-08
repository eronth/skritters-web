import { useRef, ChangeEvent } from 'react';
import { CrewData } from './crewBuilderTypes';
import { exportCrewsAsJson, importCrewsFromJson } from './crewStorageUtils';

interface UseImportExportParams {
  crewsList: CrewData[];
  activeCrewId: string;
  onImport: (state: { list: CrewData[]; activeId: string }) => void;
}

export function useImportExport({ crewsList, activeCrewId, onImport }: UseImportExportParams) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    exportCrewsAsJson(crewsList, activeCrewId);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const json = ev.target?.result as string;
      const result = importCrewsFromJson(json);
      if (result) {
        onImport(result);
      } else {
        alert('Could not import: invalid or incompatible file.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  return { fileInputRef, handleExport, handleImportClick, handleFileChange };
}
