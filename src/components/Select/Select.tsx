import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ILevel } from "../../types";

interface ISelectProps {
  selected: ILevel,
  levels: ILevel[],
  onChange: (value: string) => void,
}

const SelectSmall: React.FC<ISelectProps> = ({ selected, levels, onChange }) => {
  const handleChangeSelect = (e: SelectChangeEvent) => {
    console.log(e);
    onChange(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Уровень:</InputLabel>
      <Select
        value={selected.id}
        label={selected.label}
        onChange={handleChangeSelect}
      >
        {levels.map((level, idx) =>
          <MenuItem key={idx} value={level.id}>{level.label}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SelectSmall;
