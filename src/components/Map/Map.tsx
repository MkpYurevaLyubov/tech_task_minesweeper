import React from 'react';
import ShowMap from "./ShowMap/ShowMap";
import { useSendMessageMutation } from '../../app/api';
import { IMapProps } from '../../types';
import styles from './map.module.scss';

const Map: React.FC<IMapProps> = ({ value, isStartGame }) => {
  const [sendMessage] = useSendMessageMutation();
  const style = {
    gridTemplateColumns: `repeat(${value[0]?.length}, 1fr)`,
    gridTemplateRows: `repeat(${value.length}, 1fr)`
  };

  const handleClickCell = (x: number, y: number): void => {
    if (!isStartGame) return;
    sendMessage({ message: `open ${x} ${y}` });
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
