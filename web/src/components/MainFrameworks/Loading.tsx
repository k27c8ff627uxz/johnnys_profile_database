import React from 'react';
import {
  Box,
  CircularProgress,
} from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
