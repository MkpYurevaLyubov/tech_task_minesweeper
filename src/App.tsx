import React, {useEffect, useRef, useState} from 'react';

const App: React.FC = () => {
  const socket = useRef<any>();
  const [connected, setConnected] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);

  useEffect((): void => {
    socket.current = new WebSocket('wss://hometask.eg1236.com/game1/');

    socket.current.onopen= (): void => {
      try {
        setConnected(true);
        sentMessage();
      } catch (e) {
        console.log(e);
      }
    };

    socket.current.onmessage = (event: any): void => {
      const message = event.data;

      if (message === 'new: OK') {
        sentMessage('map');
      }
    }

    socket.current.onclose = (): void => {
      console.log('Socken закрыт');
    }

    socket.current.onerror = (): void => {
      console.log('Socken произошла ошибка');
    }
  }, []);

  const sentMessage = (message: string = 'new 1') => {
    socket.current.send(message);
  };

  if (!connected) {
    return <h1>Соединение не установлено</h1>;
  }

  return (
    <h1>Hello</h1>
  );
}

export default App;
