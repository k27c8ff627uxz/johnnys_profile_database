import React from 'react';
import {
  Box,
  Card,
  Typography,
} from '@mui/material';
import TodayNewsContainer from './todayNewsContainer';

const Component = () => {
  const { articleList } = TodayNewsContainer.useContainer();

  return (
    <React.Fragment>
      <Typography variant='h6'>
        今日のお知らせ
      </Typography>
      <Box>
        {articleList.map((article, index) => 
          <Card key={`article-${index}`} sx={{width: '100%', margin: 2}} >
            {/* TODO: 正書 */}
            {`${article.type}, ${article.name}, ${article.year}`}
          </Card>
        )}
      </Box>
    </React.Fragment>
  );
};

const TodayNews = () => (
  <TodayNewsContainer.Provider>
    <Component />
  </TodayNewsContainer.Provider>
);

export default TodayNews;
