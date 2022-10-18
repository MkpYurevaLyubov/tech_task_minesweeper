import React, { useState } from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import { useChannelQuery, useSendMessageMutation } from './app/api';
import styles from './app.module.scss';

const levelItem = JSON.parse(localStorage.getItem('level') || '') || '1';

const App: React.FC = () => {
  const [level, setLevel] = useState<string>(levelItem);
  const [sendMessage] = useSendMessageMutation();
  const { data } = useChannelQuery(`new ${level}`);

  const handleChangeLevel = (value: string) => {
    sendMessage({ message: `new ${value}` });
    localStorage.setItem('level', JSON.stringify(value));
    setLevel(value);
  };

  console.log('data', data);
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
