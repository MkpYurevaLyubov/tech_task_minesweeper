import React, {useEffect, useState} from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import { useChannelQuery, useSendMessageMutation } from './app/api';
import styles from './app.module.scss';

const App: React.FC = () => {
  const [level, setLevel] = useState<string>('1');
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

  return (
    <div className={styles.main}>
      {!data?.map?.length && <h1>Устанавливается соединение...</h1>}
      {data?.map?.length &&
        <div className={styles.container}>
          <Header level={level} onChangeLevel={handleChangeLevel} />
          <Map value={data?.map} />
        </div>
      }
    </div>
  );
}

export default App;
