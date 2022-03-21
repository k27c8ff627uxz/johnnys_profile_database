import React from 'react';
import {
  Box,
  Card,
  Typography,
} from '@mui/material';
import BirthdayNews from './birthdayNews';
import EnterdayNews from './enterdayNews';
import TodayNewsContainer from './todayNewsContainer';
import { Article } from './types';

const Component = () => {
  const { articleList } = TodayNewsContainer.useContainer();

  const topic = (article: Article) => {
    switch(article.type) {
    case 'birthday':
      return <BirthdayNews article={article} />;
    case 'enterday':
      return <EnterdayNews article={article} />;
    }
  };

  return (
    <React.Fragment>
      <Typography variant='h6'>
        今日のお知らせ
      </Typography>
      <Box>
        {articleList.map((article, index) => 
          <Card key={`article-${index}`} sx={{width: '100%', margin: 2}} >
            {topic(article)}
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
