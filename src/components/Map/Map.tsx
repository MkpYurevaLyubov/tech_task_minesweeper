import React from 'react';
import ShowMap from "./ShowMap/ShowMap";
import { IMapProps } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { sendMessage } from '../../app/slices/mapSlice';
import styles from './map.module.scss';

const Map: React.FC<IMapProps> = ({ value, isStartGame }) => {
  const dispatch = useAppDispatch();
  const style = {
    gridTemplateColumns: `repeat(${value[0]?.length}, 1fr)`,
    gridTemplateRows: `repeat(${value.length}, 1fr)`
  };

  const handleClickCell = (x: number, y: number): void => {
    if (!isStartGame) return;
    dispatch(sendMessage({ content: `open ${x} ${y}` }));
  };

  return (
    <div className={styles.table}>
      <div
        className={styles.table_grid}
        style={style}
      >
        <ShowMap value={value} onClickCell={handleClickCell} />
      </div>
    </div>
  );
};

export default Map;
