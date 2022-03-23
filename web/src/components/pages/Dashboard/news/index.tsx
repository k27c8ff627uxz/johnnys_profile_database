import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
} from '@mui/material';
import { getFunctions } from 'firebase/functions';
import { getNews } from 'utils/firebaseFunctions';

interface NewsProps {
  beginLoading: () => void;
  finishLoading: () => void;
}

const News = (props: NewsProps) => {
  const { beginLoading, finishLoading } = props;
  const [news, setNews] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      beginLoading();
      try {
        const result = await getNews(getFunctions())();
        setNews(result.data);
      } catch(e) {
        console.error(e);
      } finally {
        finishLoading();
      }
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
