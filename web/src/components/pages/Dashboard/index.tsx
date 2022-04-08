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

  useEffect(() => {
    if (newsIsLoading) {
      beginLoading();
    } else {
      // TODO: 初期表示時のProfile List取得が終了していないにもかかわらず、ここでLoadingが終わってしまう可能性もあるので、その対処
      finishLoading();
    }
  }, [newsIsLoading]);

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={3}>
        <News
          beginLoading={() => setNewsIsLoading(true)}
          finishLoading={() => setNewsIsLoading(false)}
        />
        <TodayNews />
      </Stack>
    </Box>
  );
};

export default Dashboard;
