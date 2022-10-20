import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useAppSelector } from "../../app/hooks";
import { IModalWindowProps } from "../../types";
import { timeToHHMMSS } from "../../utils/timer";
import styles from './modalWindow.module.scss';

const ModalWindow: React.FC<IModalWindowProps> = ({
  open,
  title,
  onClickBtn,
}) => {
  const { message } = useAppSelector(state => state.map);
  const showResult = message === 'You win.';
  const yourResult = JSON.parse(localStorage.getItem('yourResult') || '{}');

  return (
    <Dialog
      open={open}
      onClose={onClickBtn}
      maxWidth='lg'
      className={styles.modal}
    >
      <DialogContent>
        <h1>{title}</h1>
        {showResult && <p>Ваш результат: {timeToHHMMSS(yourResult)}</p>}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => onClickBtn(true)}>Начать заново</Button>
        <Button variant='contained' onClick={() => onClickBtn(false)}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
