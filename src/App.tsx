import React, { useState } from 'react';
import Map from "./components/Map/Map";
import { useChannelQuery } from '../src/app/api';
import styles from "./app.module.scss";

const App: React.FC = () => {
  const [level, setLevel] = useState<number>(1);
  const { data } = useChannelQuery(`new ${level}`);

  return (
    <div className={styles.main}>
      {!data?.map?.length && <h1>Устанавливается соединение...</h1>}
      {data?.map?.length && <Map value={data?.map[0]} sendMessage={console.log} />}
    </div>
  );
}

export default App;
