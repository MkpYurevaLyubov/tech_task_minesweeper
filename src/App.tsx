import React, { useState } from 'react';
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import { useChannelQuery } from '../src/app/api';
import { ILevel } from "./types";
import styles from "./app.module.scss";

const App: React.FC = () => {
  const [level, setLevel] = useState<ILevel>({ id: 1, label: 'Простой' });
  const { data } = useChannelQuery(`new ${level.id}`);

  const handleChangeLevel = (value: string) => {
    console.log('e', e);
  };

  return (
    <div className={styles.main}>
      {!data?.map?.length && <h1>Устанавливается соединение...</h1>}
      {data?.map?.length &&
      <div className={styles.container}>
        <Header level={level} onChangeLevel={handleChangeLevel} />
      <Map value={data?.map[0]} />
      </div>
      }
    </div>
  );
}

export default App;
