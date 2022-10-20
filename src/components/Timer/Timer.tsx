import React, { useEffect, useState } from 'react';
import { ReactComponent as TimeIcon } from '../../assets/icons/clock.svg';
import { useAppSelector } from '../../app/hooks';
import { timeToHHMMSS } from '../../utils/timer';
import { ITimerProps } from '../../types';
import styles from './timer.module.scss';

let interval: ReturnType<typeof setInterval>;
const bestResult = JSON.parse(localStorage.getItem('bestResult') || '{}');

const Timer: React.FC<ITimerProps> = ({ isStartGame, isStopTimer }) => {
  const { message } = useAppSelector(state => state.map);
  const [time, setTime] = useState<number>(0);

  useEffect((): void => {
    if (isStartGame) {
      interval = setInterval(() => {
        setTime(prevState => prevState + 1);
      }, 1000);
    }

    if (!isStartGame) {
      clearInterval(interval);
    }

    if (isStopTimer) {
      setTime(0);
    }
  }, [isStartGame, isStopTimer]);

  useEffect(() => {
    if (message === 'You win.') {
      if (typeof bestResult === 'object' || (typeof bestResult !== 'object' && bestResult > time)) {
        localStorage.setItem('bestResult', JSON.stringify(time));
      }
      localStorage.setItem('yourResult', JSON.stringify(time));
    }
  }, [message]);

  return (
    <div className={styles.timer_block}>
      <TimeIcon className={styles.icon} />
      <p>{timeToHHMMSS(time)}</p>
    </div>
  );
};

export default Timer;
