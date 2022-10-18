import React from 'react';
import Select from '../Select/Select';
import Timer from "../Timer/Timer";
import { ReactComponent as StartIcon } from '../../assets/icons/play.svg';
import { ReactComponent as RestartIcon } from '../../assets/icons/repeat.svg';
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

const Header: React.FC<IHeaderProps> = ({
  isStartGame,
  onClickStartBtn,
  level,
  onChangeLevel
}) => {
  const label = levelsList.find((item) => item.id === level);

  return (
    <div className={styles.header_block}>
      <Select
        selected={level}
        label={label?.label || ''}
        levels={levelsList}
        onChange={onChangeLevel}
      />
      {!isStartGame && <StartIcon className={styles.icon_start} onClick={onClickStartBtn} />}
      {isStartGame && <RestartIcon className={styles.icon_start} onClick={onClickStartBtn} />}
      <Timer isStartGame={isStartGame} />
    </div>
  );
};

export default Header;
