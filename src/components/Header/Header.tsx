import React from 'react';
import Select from '../Select/Select';
import Timer from "../Timer/Timer";
import { IHeaderProps } from '../../types';
import styles from './header.module.scss';

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
    <div className={styles.header_block}>
      <Select
        selected={level}
        label={label?.label || ''}
        levels={levelsList}
        onChange={onChangeLevel}
      />
      <Timer />
    </div>
  );
};

export default Header;
