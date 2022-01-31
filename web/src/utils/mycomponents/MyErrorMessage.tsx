import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.error.main,
}));

const MyErrorMessage: React.FC<{text: string[]}> = ({text}) => {
  return (
    <React.Fragment>
      {
        text.map((line, index) => (
          <ErrorMessage key={index}>
            {line}
          </ErrorMessage>
        ))
      }
    </React.Fragment>
  );
};

export default MyErrorMessage;
