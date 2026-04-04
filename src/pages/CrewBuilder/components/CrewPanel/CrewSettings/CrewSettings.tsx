import { useState } from 'react';
import './CrewSettings.css';

type Props = {
  allowDuplicateSkritters: boolean;
  allowDuplicateEquipment: boolean;
  maxSlots: number;
  globalMaxEquipment: number;
  onToggleDupSkritters: () => void;
  onToggleDupEquipment: () => void;
  onChangeMaxSlots: (value: number) => void;
  onChangeGlobalMaxEquipment: (value: number) => void;
};

export default function CrewSettings({
  allowDuplicateSkritters,
  allowDuplicateEquipment,
  maxSlots,
  globalMaxEquipment,
  onToggleDupSkritters,
  onToggleDupEquipment,
  onChangeMaxSlots,
  onChangeGlobalMaxEquipment,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="crew-settings-wrapper">
      <button
        className="crew-settings-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={`crew-settings-chevron ${open ? 'crew-settings-chevron--open' : ''}`}>▶</span>
        Options
      </button>
      {open && (
        <div className="crew-settings">
          <label className="crew-setting">
            <input
              type="checkbox"
              checked={allowDuplicateSkritters}
              onChange={onToggleDupSkritters}
            />
            Allow duplicate Skritters
          </label>
          <label className="crew-setting">
            <input
              type="checkbox"
              checked={allowDuplicateEquipment}
              onChange={onToggleDupEquipment}
            />
            Allow duplicate Equipment
          </label>
          <label className="crew-setting">
            Crew size:
            <input
              type="number"
              className="settings-number"
              min={1}
              max={20}
              value={maxSlots}
              onChange={e => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 1) onChangeMaxSlots(v);
              }}
            />
          </label>
          <label className="crew-setting">
            Default equipment per Skritter:
            <input
              type="number"
              className="settings-number"
              min={0}
              max={10}
              value={globalMaxEquipment}
              onChange={e => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 0) onChangeGlobalMaxEquipment(v);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
