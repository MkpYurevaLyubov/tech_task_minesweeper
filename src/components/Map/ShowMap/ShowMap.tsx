import React from 'react';
import { ReactComponent as MoonIcon } from "../../../assets/icons/moon.svg";
import { useAppSelector } from '../../../app/hooks';
import { IShowMapProps } from '../../../types';
import styles from './showMap.module.scss';

const getText = (value: string, x: number, y: number, selectedArr: string[]): JSX.Element => {
  if (selectedArr.includes(`${x} ${y}`)) {
    return <MoonIcon />
  }

  const text = (value === '□' || value === '0') ? '' : value;
  return <p>{text}</p>
};

const ShowMap: React.FC<IShowMapProps> = ({ value, onClickCell, onContextMenu }) => {
  const { selectedArr } = useAppSelector(state => state.selectedCells);
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
          onContextMenu={(e) => onContextMenu(e, j, i)}
          className={openCell ? styles[openCell] : styles[color]}
        >
          {getText(value[i][j], j, i, selectedArr)}
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
