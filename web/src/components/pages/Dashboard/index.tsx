import React from 'react';
import {
  Box,
  Stack,
} from '@mui/material';
import TodayNews from './todayNews';

const Dashboard: React.FC = () => {
  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={3}>
        <TodayNews />
      </Stack>
    </Box>
  );
};

export default Dashboard;
