import React from 'react';
import Select from '../Select/Select';
import { IHeaderProps } from '../../types';

const levelsList = [
  {
    id: '1',
    label: 'Простой',
  },
  {
    id: '2',
    label: 'Средний',
  },
  {
    id: '3',
    label: 'Сложный',
  }
];

const Header: React.FC<IHeaderProps> = ({ level, onChangeLevel }) => {
  const label = levelsList.find((item) => item.id === level);

  return (
    <>
      <Select
        selected={level}
        label={label?.label || ''}
        levels={levelsList}
        onChange={onChangeLevel}
      />
    </>
  );
};

export default Header;
