import React, {useEffect} from 'react';
import Select from '../Select/Select';
import Timer from '../Timer/Timer';
import { ReactComponent as StartIcon } from '../../assets/icons/play.svg';
import { ReactComponent as RestartIcon } from '../../assets/icons/repeat.svg';
import { useAppSelector } from "../../app/hooks";
import { getLocalResult } from "../../utils/local";
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

let result = getLocalResult();

const Header: React.FC<IHeaderProps> = ({
  isStartGame,
  isStopTimer,
  onClickStartBtn,
  level,
  onChangeLevel
}) => {
  const { message } = useAppSelector(state => state.map);
  const label = levelsList.find((item) => item.id === level);

  useEffect((): void => {
    if (message === 'You win.') {
      result = getLocalResult();
    }
  }, [message]);

  return (
    <div className={styles.header_block}>
      <div className={styles.main}>
        <Select
          selected={level}
          label={label?.label || ''}
          levels={levelsList}
          onChange={onChangeLevel}
        />
        {!isStartGame
          ? <StartIcon className={styles.icon_start} onClick={onClickStartBtn} />
          : <RestartIcon className={styles.icon_start} onClick={onClickStartBtn} />
        }
        <Timer isStartGame={isStartGame} isStopTimer={isStopTimer} />
      </div>
      <p>Лучший результат: {result}</p>
    </div>
  );
};

export default Header;
