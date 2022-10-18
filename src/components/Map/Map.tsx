import React, {useEffect, useState} from 'react';
import { useSendMessageMutation } from '../../app/api';
import { IMapProps } from '../../types';
import styles from './map.module.scss';

const Map: React.FC<IMapProps> = ({ value }) => {
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [sendMessage] = useSendMessageMutation();
  const style = {
    gridTemplateColumns: `repeat(${value[0]?.length}, 1fr)`,
    gridTemplateRows: `repeat(${value.length}, 1fr)`
  };

  useEffect((): void => {
    showMap(value);
  }, [value]);

  const onClickCell = (x: number, y: number) => {
    sendMessage({ message: `open ${x} ${y}` });
  };

  const showMap = (map: Array<string[]>): void => {
    const cellsArr = [];
    let color = 'cell_color_1';

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        color = color === 'cell_color_1' ? 'cell_color_2' : 'cell_color_1';
        const openCell = map[i][j] === '□' ? null : 'open_cell';
        cellsArr.push(
          <div
            onClick={() => onClickCell(j, i)}
            className={openCell ? styles[openCell] : styles[color]}
          >
            <p>
              {map[i][j] === '□' ? '' : map[i][j]}
            </p>
          </div>
        );
      }
      color = color === 'cell_color_1' ? 'cell_color_2' : 'cell_color_1';
    }

    setCells(cellsArr);
  };

  return (
    <div className={styles.table}>
      <div
        className={styles.table_grid}
        style={style}
      >
        {cells.map((cell: JSX.Element, idx: number) =>
          <div
            key={idx}
            className={`${styles.cell} ${value.length > 10 ? styles.cell_2x : ''}`}
          >
            {cell}
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
