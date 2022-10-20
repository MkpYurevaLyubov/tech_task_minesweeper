import React, {useEffect, useState} from 'react';
import Map from './components/Map/Map';
import Header from './components/Header/Header';
import ModalWindow from './components/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { sendMessage, startConnecting } from './app/slices/mapSlice';
import { emptySelectedArr } from './app/slices/selectedCellsSlice';
import { IGame, IInitialOpenModal } from './types';
import styles from './app.module.scss';

const initialOpenModal: IInitialOpenModal = { open: false, text: '' };
const initialStopGame: IGame = { start: false, stopTimer: true };
const initialStartGame: IGame = { start: true, stopTimer: false };
const levelItem = JSON.parse(localStorage.getItem('level') || '{}');
const levelFromLocal = typeof levelItem !== 'object' ? levelItem : '1';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { map, message } = useAppSelector(state => state.map);
  const [level, setLevel] = useState<string>(levelFromLocal);
  const [startGame, setStartGame] = useState<IGame>(initialStopGame);
  const [openModal, setOpenModal] = useState<IInitialOpenModal>(initialOpenModal);
  const { open, text } = openModal;
  const { start, stopTimer } = startGame;

  useEffect((): void => {
    dispatch(startConnecting());
  }, []);

  useEffect((): void => {
    if (message === 'You lose' || message === 'You win.') {
      const text = message === 'You lose' ? 'Вы проиграли' : 'Вы выиграли';
      setOpenModal({ open: true, text: text });
      setStartGame(initialStopGame);
    }
  }, [message]);

  const handleChangeLevel = (value: string): void => {
    dispatch(sendMessage({ content: `new ${value}` }));
    localStorage.setItem('level', JSON.stringify(value));
    setLevel(value);
    setStartGame(initialStopGame);
  };

  const handleClickStartBtn = (): void => {
    if (start) {
      dispatch(sendMessage({ content: `new ${level}` }));
      dispatch(emptySelectedArr());
      return setStartGame(initialStopGame);
    }
    setStartGame(initialStartGame);
  };

  const handleClickBtnInModal = (isRestart: boolean = false): void => {
    dispatch(sendMessage({ content: `new ${level}` }));
    dispatch(emptySelectedArr());
    setOpenModal(initialOpenModal);

    if (isRestart) {
      setStartGame(initialStartGame);
    }
  };

  return (
    <div className={styles.main}>
      {!map?.length && <h1>Устанавливается соединение...</h1>}
      {!!map?.length &&
        <div className={styles.container}>
          <Header
            isStartGame={start}
            isStopTimer={stopTimer}
            onClickStartBtn={handleClickStartBtn}
            level={level}
            onChangeLevel={handleChangeLevel}
          />
          <Map value={map} isStartGame={start} />
        </div>
      }
      <ModalWindow
        open={open}
        title={text}
        onClickBtn={handleClickBtnInModal}
      />
    </div>
  );
};

export default App;
