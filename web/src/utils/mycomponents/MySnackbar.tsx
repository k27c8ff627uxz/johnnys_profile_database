import React, { PropsWithChildren } from 'react';
import {
  Alert,
  Snackbar,
} from '@mui/material';

export interface MySnackbarProps {
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

export const MySuccessSnackbar: React.FC<PropsWithChildren<MySnackbarProps>> = (props) => {
  const {
    open,
    onClose,
    autoHideDuration,
    children,
  } = props;

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity='success'>
        {children}
      </Alert>
    </Snackbar>
  );
};

export const MyErrorSnackbar: React.FC<PropsWithChildren<MySnackbarProps>> = (props) => {
  const {
    open,
    onClose,
    autoHideDuration,
    children,
  } = props;

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity='error'>
        {children}
      </Alert>
    </Snackbar>
  );
};

