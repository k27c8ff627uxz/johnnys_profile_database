import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
} from '@mui/material';
import { getFunctions } from 'firebase/functions';
import { getNews } from 'utils/firebaseFunctions';

const News = () => {
  const [news, setNews] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const result = await getNews(getFunctions())();
      setNews(result.data);
    })();
  }, []);

  if (news === undefined || news.length === 0) {
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
