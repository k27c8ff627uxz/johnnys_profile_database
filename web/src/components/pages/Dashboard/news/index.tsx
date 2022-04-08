import React from 'react';
import {
  Box,
  Card,
  Typography,
} from '@mui/material';

interface NewsProps {
  news: string[]
}

const News = (props: NewsProps) => {
  const { news } = props;

  if (news.length === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Box>
      <Typography variant='h6'>
        💡お知らせ💡
      </Typography>
      <Box>
        {news.map((item, index) => (
          <Card key={`news-${index}`} sx={{width: '100%', margin: 2, padding: 2}} >
            {item}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default News;
