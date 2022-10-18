import React, {useEffect, useState} from 'react';
import { TextField } from "@mui/material";

const checkSizeTime = (time: number): string => {
  return time > 9 ? String(time) : `0${time}`;
};

const timeToHHMMSS = (second: number): string => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second - (hours * 3600)) / 60);
  const seconds = second - (hours * 3600) - (minutes * 60);

  return `${checkSizeTime(hours)}:${checkSizeTime(minutes)}:${checkSizeTime(seconds)}`;
}

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);

  useEffect((): void => {
    setInterval(() => {
      setTime(prevState => prevState + 1);
    }, 1000);
  }, []);

  console.log(timeToHHMMSS(time))
  return (
    <>
      {timeToHHMMSS(time)}
    </>
  );
};

export default Timer;
