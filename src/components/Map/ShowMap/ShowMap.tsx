import React from 'react';
import { IShowMapProps } from '../../../types';
import styles from './showMap.module.scss';

const ShowMap: React.FC<IShowMapProps> = ({ value, onClickCell }) => {
  const cellsArr = [];
  const cellSize = value.length > 20 ? styles.cell_3x : value.length > 10 ? styles.cell_2x : '';
  let color = 'color_1';

  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < value[i].length; j++) {
      color = color === 'color_1' ? 'color_2' : 'color_1';
      const openCell = value[i][j] === '□' ? null : 'open_cell';
      cellsArr.push(
        <div
          onClick={() => onClickCell(j, i)}
          className={openCell ? styles[openCell] : styles[color]}
        >
          <p>
            {value[i][j] === '□' ? '' : value[i][j]}
          </p>
        </div>
      );
    }
    color = color === 'color_1' ? 'color_2' : 'color_1';
  }

  return (
    <>
      {cellsArr.map((cell: JSX.Element, idx: number) =>
        <div
          key={idx}
          className={`${styles.cell} ${cellSize}`}
        >
          {cell}
        </div>
      )}
    </>
  );
};

export default ShowMap;
