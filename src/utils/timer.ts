const checkSizeTime = (time: number): string => {
  return time > 9 ? String(time) : `0${time}`;
};

export const timeToHHMMSS = (second: number): string => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second - (hours * 3600)) / 60);
  const seconds = second - (hours * 3600) - (minutes * 60);

  return `${checkSizeTime(hours)}:${checkSizeTime(minutes)}:${checkSizeTime(seconds)}`;
};
