import { timeToHHMMSS } from './timer';

export const getLocalResult = () => {
  try {
    const bestResult = JSON.parse(localStorage.getItem('bestResult') || '{}');
    return typeof bestResult !== 'object' ? timeToHHMMSS(bestResult) : '-';
  } catch (err) {
    return null;
  }
};
