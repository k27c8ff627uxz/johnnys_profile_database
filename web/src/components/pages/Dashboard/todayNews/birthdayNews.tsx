import React from 'react';
import { BirthdayArticle } from './types';
import {
  Avatar,
  CardHeader,
  CardContent,
} from '@mui/material';
import { Cake as CakeIcon } from '@mui/icons-material';

export interface BirthdayNewsProps {
  article: BirthdayArticle;
}

const BirthdayNews = ({ article }: BirthdayNewsProps) => {

  const birthdayMessage = (name: string, year: number) => {
    return `今日は${name}さんの${year}歳の誕生日です🎂`;
  };

  return (
    <React.Fragment>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title='誕生日のお知らせ'
        avatar={
          <Avatar aria-label="recipe">
            <CakeIcon />
          </Avatar>
        }
      />
      <CardContent>
        {birthdayMessage(article.name, article.year)}
      </CardContent>
    </React.Fragment>
  );
};

export default BirthdayNews;
