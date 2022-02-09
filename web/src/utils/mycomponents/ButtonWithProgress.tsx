import React from 'react';
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
} from '@mui/material';

export type ButtonWithProgressProps = ButtonProps & {
  size?: number;
  isLoading: boolean;
};

const ButtonWithProgress = (props: ButtonWithProgressProps) => {
  const size = props.size ?? 24;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttonProps: any = { ...props };
  delete buttonProps.isLoading;
  delete buttonProps.size;

  return (
    <Box sx={{ position: 'relative' }}>
      <Button {...buttonProps}>
        {props.children}
      </Button>
      {props.isLoading && <CircularProgress
        size={size}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: `-${size / 2}px`,
          marginLeft: `-${size / 2}px`,
        }}
      />}
    </Box>
  );
};

export default ButtonWithProgress;
