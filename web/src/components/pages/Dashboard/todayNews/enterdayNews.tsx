import React from 'react';
import {
  Avatar,
  CardHeader,
  CardContent,
} from '@mui/material';
import { EnterdayArticle } from './types';
import { Celebration as Celebration } from '@mui/icons-material';

export interface EnterdayNewsProps {
  article: EnterdayArticle;
}

const EnterdayNews = ({ article }: EnterdayNewsProps) => {

  const enterdayMessage = (name: string, year: number) => {
    return `今日は${name}さんが入所して${year}年目になります💮`;
  };

  return (
    <React.Fragment>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title='入所日のお知らせ'
        avatar={
          <Avatar aria-label="recipe">
            <Celebration />
          </Avatar>
        }
      />
      <CardContent>
        {enterdayMessage(article.name, article.year)}
      </CardContent>
    </React.Fragment>
  );
};

export default EnterdayNews;
