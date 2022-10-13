import React, {ReactFragment, useEffect, useState} from 'react';
import styles from './map.module.scss';

interface IMapProps {
  value: any,
  sendMessage: (message: string) => void,
}

const Map: React.FC<IMapProps> = ({ value, sendMessage }) => {
  const [cells, setCells] = useState<any>([]);
  // const [style, setStyle] = useState({});

  useEffect((): void => {
    showMap(value);
  }, [value]);

  const onClickCell = (x: number, y: number) => {
    const text = `open ${x} ${y}`;
    sendMessage(text);
  };

  const showMap = (map: string[]): void => {
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
      color = color === "cell_color_1" ? "cell_color_2" : "cell_color_1";
    }

    setCells(cellsArr);
  };

  return (
    <div className={styles.table}>
      <div className={styles.table_grid}>
        {cells.map((cell: ReactFragment, idx: number) =>
          <div key={idx} className={styles.cell}>{cell}</div>
        )}
      </div>
    </div>
  );
};

export default Map;
