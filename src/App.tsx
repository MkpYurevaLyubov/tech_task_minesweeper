import React, {useEffect, useRef, useState} from 'react';
import Map from "./components/Map/Map";
import styles from "./app.module.scss";

const App: React.FC = () => {
  const socket = useRef<any>();
  const [connected, setConnected] = useState<boolean>(false);
  const [map, setMap] = useState<string[]>([]);
  const [level, setLevel] = useState<number>(1);

  useEffect((): void => {
    socket.current = new WebSocket('wss://hometask.eg1236.com/game1/');

    socket.current.onopen= (): void => {
      try {
        setConnected(true);
        handleSentMessage(`new ${level}`);
      } catch (e) {
        console.log(e);
      }
    };

    socket.current.onmessage = (event: any): void => {
      const message = event.data;
      const key = message.split('').splice(0, 3).join('');

      if (message === 'new: OK' || message === 'open: OK') {
        handleSentMessage('map');
      }

      if (key === "map") {
        let map = message.split('\n');
        map = map.slice(1, map.length - 1).map((el: string) => el.split(''));
        setMap(map);
      }
    }

    socket.current.onclose = (): void => {
      console.log('Socken закрыт');
    }
    socket.current.onerror = (): void => {
      console.log('Socken произошла ошибка');
    }
  }, []);

  const handleSentMessage = (message: string) => {
    socket.current.send(message);
  };

  return (
    <div className={styles.main}>
      {!connected && <h1>Устанавливается соединение...</h1>}
      {connected && <Map value={map} sendMessage={handleSentMessage} />}
    </div>
  );
}

export default App;
