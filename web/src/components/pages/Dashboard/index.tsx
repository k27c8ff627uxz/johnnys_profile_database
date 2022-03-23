import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
} from '@mui/material';
import FrameworkViewContainer from 'models/frameworkView';
import News from './news';
import TodayNews from './todayNews';

const Dashboard: React.FC = () => {
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [newsIsLoading, setNewsIsLoading] = useState(false);
  const [todayNewsIsLoading, setTodayNewsIsLoading] = useState(false);

  useEffect(() => {
    if (newsIsLoading || todayNewsIsLoading) {
      beginLoading();
    } else {
      finishLoading();
    }
  }, [newsIsLoading, todayNewsIsLoading]);

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={3}>
        <News
          beginLoading={() => setNewsIsLoading(true)}
          finishLoading={() => setNewsIsLoading(false)}
        />
        <TodayNews
          beginLoading={() => setTodayNewsIsLoading(true)}
          finishLoading={() => setTodayNewsIsLoading(false)}
        />
      </Stack>
    </Box>
  );
};

export default Dashboard;
