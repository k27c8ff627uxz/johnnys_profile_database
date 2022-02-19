import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Toolbar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export interface MyModalProp {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  isLoading: boolean;
}

const MyModal = (props: MyModalProp) => {
  const { open, onClose, children, isLoading, title } = props;

  const style: React.CSSProperties  = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{overflowY: 'scroll'}}
    >
      <Box style={style}>
        <Paper>
          {title && <>
            <AppBar>
              <Toolbar variant='dense'>
                <IconButton edge='start' onClick={onClose} sx={{padding: 0, mr: 1}} >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
                {title}
              </Toolbar>
            </AppBar>
            <Toolbar variant='dense' />
            {isLoading && <LinearProgress />}
          </>}
          {children}
        </Paper>
      </Box>
    </Modal>
  );
};

export default MyModal;
