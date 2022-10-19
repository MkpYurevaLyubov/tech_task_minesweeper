import React from 'react';
import ShowMap from "./ShowMap/ShowMap";
import { IMapProps } from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { sendMessage } from '../../app/slices/mapSlice';
import { addFlag } from '../../app/slices/selectedCellsSlice';
import styles from './map.module.scss';

const Map: React.FC<IMapProps> = ({ value, isStartGame }) => {
  const { selectedArr } = useAppSelector(state => state.selectedCells);
  const dispatch = useAppDispatch();
  const style = {
    gridTemplateColumns: `repeat(${value[0]?.length}, 1fr)`,
    gridTemplateRows: `repeat(${value.length}, 1fr)`
  };

  const handleClickCell = (x: number, y: number): void => {
    if (!isStartGame) return;

    if (selectedArr.includes(`${x} ${y}`)) return;

    dispatch(sendMessage({ content: `open ${x} ${y}` }));
  };

  const handleContextMenuCell = (event: any, x: number, y: number): void => {
    event.preventDefault();
    if (!isStartGame) return;
    dispatch(addFlag({ selected: `${x} ${y}` }))
  }

  return (
    <div className={styles.table}>
      <div
        className={styles.table_grid}
        style={style}
      >
        <ShowMap
          value={value}
          onClickCell={handleClickCell}
          onContextMenu={handleContextMenuCell}
        />
      </div>
    </div>
  );
};

export default Map;
