import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ISelectProps } from '../../types';

const SelectSmall: React.FC<ISelectProps> = ({ selected, label, levels, onChange }) => {
  const handleChangeSelect = (e: SelectChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel>Уровень:</InputLabel>
      <Select
        value={selected}
        label={label}
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
