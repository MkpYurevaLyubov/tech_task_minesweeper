import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import styles from './modalWindow.module.scss';

interface IModalWindowProps {
  open: boolean,
  title: string,
  handleClose: () => void,
  handleRestart: () => void,
}

const ModalWindow: React.FC<IModalWindowProps> = ({
  open,
  title,
  handleClose,
  handleRestart,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='lg'
      className={styles.modal}
    >
      <DialogContent>
        <h1>{title}</h1>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleRestart}>Начать заново</Button>
        <Button variant='contained' onClick={handleClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
