import React, { useEffect, useState } from 'react';
import { ReactComponent as TimeIcon } from '../../assets/icons/clock.svg';
import { ITimerProps } from "../../types";
import styles from './timer.module.scss';

const checkSizeTime = (time: number): string => {
  return time > 9 ? String(time) : `0${time}`;
};

const timeToHHMMSS = (second: number): string => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second - (hours * 3600)) / 60);
  const seconds = second - (hours * 3600) - (minutes * 60);

  return `${checkSizeTime(hours)}:${checkSizeTime(minutes)}:${checkSizeTime(seconds)}`;
}

const Timer: React.FC<ITimerProps> = ({ isStartGame }) => {
  const [time, setTime] = useState<number>(0);

  useEffect((): void => {
    if (isStartGame) {
      setInterval(() => {
        setTime(prevState => prevState + 1);
      }, 1000);
    }
  }, [isStartGame]);

  return (
    <div className={styles.timer_block}>
      <TimeIcon className={styles.icon} />
      <p>{timeToHHMMSS(time)}</p>
    </div>
  );
};

export default Timer;
