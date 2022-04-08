import React from 'react';
import {
  Box,
  Stack,
} from '@mui/material';
import FrameworkViewContainer from 'models/frameworkView';
import News from './news';
import TodayNews from './todayNews';

const Dashboard: React.FC = () => {
  const { news } = FrameworkViewContainer.useContainer();

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={3}>
        <News news={news} />
        <TodayNews />
      </Stack>
    </Box>
  );
};

export default Dashboard;
