import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { IModalWindowProps } from "../../types";
import styles from './modalWindow.module.scss';

const ModalWindow: React.FC<IModalWindowProps> = ({
  open,
  title,
  onClickBtn,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClickBtn}
      maxWidth='lg'
      className={styles.modal}
    >
      <DialogContent>
        <h1>{title}</h1>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => onClickBtn(true)}>Начать заново</Button>
        <Button variant='contained' onClick={() => onClickBtn(false)}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
