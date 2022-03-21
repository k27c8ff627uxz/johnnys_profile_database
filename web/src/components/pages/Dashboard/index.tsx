import React from 'react';
import {
  Box,
  Stack,
} from '@mui/material';
import News from './news';
import TodayNews from './todayNews';
import DashboardContainer from './dashboardContainer';

const Component: React.FC = () => {
  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={3}>
        <News />
        <TodayNews />
      </Stack>
    </Box>
  );
};

// TODO: コンテナを使わずにLoading処理をする
const Dashboard = () => {
  return (
    <DashboardContainer.Provider>
      <Component />
    </DashboardContainer.Provider>
  );
};
export default Dashboard;
