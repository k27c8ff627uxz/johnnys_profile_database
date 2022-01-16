import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const LoginTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '10px',
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.error.main,
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    const auth = getAuth();

    signInWithEmailAndPassword(
      auth,
      email,
      password,
    ).then(
    ).catch(() => {
      setLoginError(true);
      setLoading(false);
    });
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        Login
      </Typography>
      {loginError && (
        <ErrorMessage>
          Fail to Login !!
        </ErrorMessage>
      )}
      <form onSubmit={onSubmit}>
        <LoginTextField
          label='E-mail'
          variant='standard'
          fullWidth
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
        <LoginTextField
          label='Password'
          type='password'
          variant='standard'
          fullWidth
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        />
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <SubmitButton
            type='submit'
            variant='contained'
            disabled={!email || !password || isLoading}
          >
            Login
          </SubmitButton>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
