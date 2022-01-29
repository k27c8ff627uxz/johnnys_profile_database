import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
} from '@mui/material';
import VerifyEmail from './actions/VerifyEmail';
import ResetPassword from './actions/ResetPassword';

const Action: React.FC = () => {
  const searchParams = useSearchParams()[0];

  switch(searchParams.get('mode')) {
  case 'verifyEmail':
    return (
      <Container sx={{textAlign: 'center'}}>
        <VerifyEmail
          code={searchParams.get('oobCode')}
        />
      </Container>
    );
  case 'resetPassword':
    return (
      <Container sx={{textAlign: 'center'}}>
        <ResetPassword
          code={searchParams.get('oobCode')}
        />
      </Container>
    );
  default:
    return (
      <Container sx={{textAlign: 'center'}}>
        <Typography sx={{m: 2}}>
          不明なアクションです。
        </Typography>
      </Container>
    );
  }
};

export default Action;
