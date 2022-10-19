import React, { useEffect, useState } from 'react';
import { ReactComponent as TimeIcon } from '../../assets/icons/clock.svg';
import { useAppSelector } from '../../app/hooks';
import { ITimerProps } from "../../types";
import styles from './timer.module.scss';

let interval: ReturnType<typeof setInterval>;
const bestResult = JSON.parse(localStorage.getItem('bestResult') || '{}');
const checkSizeTime = (time: number): string => {
  return time > 9 ? String(time) : `0${time}`;
};
export const timeToHHMMSS = (second: number): string => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second - (hours * 3600)) / 60);
  const seconds = second - (hours * 3600) - (minutes * 60);

  return `${checkSizeTime(hours)}:${checkSizeTime(minutes)}:${checkSizeTime(seconds)}`;
};

const Timer: React.FC<ITimerProps> = ({ isStartGame }) => {
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
  }, [isStartGame]);

  useEffect(() => {
    if (message === 'You lose') {
      setTime(0);
    }

    if (message === 'You win.') {
      if (typeof bestResult === 'object' || (typeof bestResult !== 'object' && bestResult < time)) {
        localStorage.setItem('bestResult', JSON.stringify(time));
      }
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
