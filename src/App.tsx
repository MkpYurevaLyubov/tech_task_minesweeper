import React, {useEffect, useState} from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { sendMessage, startConnecting } from './app/slices/mapSlice';
import styles from './app.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { map } = useAppSelector(state => state.map);
  const [level, setLevel] = useState<string>('1');
  const [startGame, setStartGame] = useState<boolean>(false);

  useEffect((): void => {
    const levelItem = localStorage.getItem('level');

    if (!!levelItem) {
      setLevel(JSON.parse(levelItem))
    }

    dispatch(startConnecting());
  }, []);

  const handleChangeLevel = (value: string): void => {
    dispatch(sendMessage({ content: `new ${value}` }));
    localStorage.setItem('level', JSON.stringify(value));
    setLevel(value);
  };

  const handleClickStartBtn = (): void => {
    setStartGame(prevState => !prevState);
  };

  return (
    <div className={styles.main}>
      {!map?.length && <h1>Устанавливается соединение...</h1>}
      {!!map?.length &&
        <div className={styles.container}>
          <Header
            isStartGame={startGame}
            onClickStartBtn={handleClickStartBtn}
            level={level}
            onChangeLevel={handleChangeLevel}
          />
          <Map value={map} isStartGame={startGame} />
        </div>
      }
    </div>
  );
}

export default App;
