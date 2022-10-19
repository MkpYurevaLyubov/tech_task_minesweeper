import React, {useEffect, useState} from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import ModalWindow from './components/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { sendMessage, startConnecting } from './app/slices/mapSlice';
import styles from './app.module.scss';

const initialOpenModal = {
  open: false,
  text: '',
};
const levelItem = JSON.parse(localStorage.getItem('level') || '{}');
const levelFromLocal = typeof levelItem !== 'object' ? levelItem : '1';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { map, message } = useAppSelector(state => state.map);
  const [level, setLevel] = useState<string>(levelFromLocal);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(initialOpenModal);
  const { open, text } = openModal;

  useEffect((): void => {
    dispatch(startConnecting());
  }, []);

  useEffect(() => {
    if (message) {
      setOpenModal({ open: true, text: message });
    }
  }, [message]);

  const handleChangeLevel = (value: string): void => {
    dispatch(sendMessage({ content: `new ${value}` }));
    localStorage.setItem('level', JSON.stringify(value));
    setLevel(value);
    setStartGame(false);
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
      <ModalWindow
        open={open}
        title={text}
        handleClose={() => setOpenModal(initialOpenModal)}
        handleRestart={console.log}
      />
    </div>
  );
}

export default App;
