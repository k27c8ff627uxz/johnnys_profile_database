import React from 'react';
import {
  Box,
  Card,
  Typography,
  styled,
} from '@mui/material';
import BirthdayNews from './birthdayNews';
import EnterdayNews from './enterdayNews';
import TodayNewsContainer from './todayNewsContainer';
import { Article } from './types';

const NoArticleMessage = styled(Typography)(({theme}) => ({
  marginLeft: '10px',
  color: theme.palette.text.secondary,
  fontStyle: 'oblique',
  fontSize: 'small',
}));


const Component = () => {
  const { articleList } = TodayNewsContainer.useContainer();

  const noArticleMessage = '今日のお知らせは特にありません';

  const topic = (article: Article) => {
    switch(article.type) {
    case 'birthday':
      return <BirthdayNews article={article} />;
    case 'enterday':
      return <EnterdayNews article={article} />;
    }
  };

  if (articleList === null) {
    return (<React.Fragment></React.Fragment>);
  }

  return (
    <Box>
      <Typography variant='h6'>
        今日のお知らせ
      </Typography>
      <Box>
        {articleList.length === 0 ? (
          <NoArticleMessage>
            {noArticleMessage}
          </NoArticleMessage>
        ) : articleList.map((article, index) => 
          <Card key={`article-${index}`} sx={{width: '100%', margin: 2}} >
            {topic(article)}
          </Card>
        )}
      </Box>
    </Box>
  );
};

const TodayNews = () => (
  <TodayNewsContainer.Provider>
    <Component />
  </TodayNewsContainer.Provider>
);

export default TodayNews;
