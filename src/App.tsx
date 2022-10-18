import React, {useEffect, useState} from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import { useChannelQuery, useSendMessageMutation } from './app/api';
import styles from './app.module.scss';

const App: React.FC = () => {
  const [level, setLevel] = useState<string>('1');
  const [startGame, setStartGame] = useState<boolean>(false);
  const [sendMessage] = useSendMessageMutation();
  const { data } = useChannelQuery(`new ${level}`);

  useEffect((): void => {
    const levelItem = localStorage.getItem('level');

    if (!!levelItem) {
      setLevel(JSON.parse(levelItem))
    }
  }, []);

  const handleChangeLevel = (value: string): void => {
    sendMessage({ message: `new ${value}` });
    localStorage.setItem('level', JSON.stringify(value));
    setLevel(value);
  };

  const handleClickStartBtn = (): void => {
    setStartGame(prevState => !prevState);
  };

  return (
    <div className={styles.main}>
      {!data?.length && <h1>Устанавливается соединение...</h1>}
      {!!data?.length &&
        <div className={styles.container}>
          <Header
            isStartGame={startGame}
            onClickStartBtn={handleClickStartBtn}
            level={level}
            onChangeLevel={handleChangeLevel}
          />
          <Map value={data[0]} isStartGame={startGame} />
        </div>
      }
    </div>
  );
}

export default App;
