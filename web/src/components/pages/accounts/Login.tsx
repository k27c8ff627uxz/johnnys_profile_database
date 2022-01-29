import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import FrameworkViewContainer from 'models/frameworkView';
import literals from 'utils/literals';

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
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    beginLoading();
    const auth = getAuth();

    signInWithEmailAndPassword(
      auth,
      email,
      password,
    ).then((credential) => {
      finishLoading();
      if (credential.user.emailVerified) {
        navigate('/');
      } else {
        navigate(literals.path.account.sendVerifying);
      }
    }).catch(() => {
      setLoginError(true);
      finishLoading();
    });
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        ログイン
      </Typography>
      {loginError && (
        <>
          <ErrorMessage>
            ログインに失敗しました。
          </ErrorMessage>
          <ErrorMessage>
            もう一度メールアドレスとパスワードを確認して下さい。
          </ErrorMessage>
        </>
      )}
      <form onSubmit={onSubmit}>
        <LoginTextField
          label='メールアドレス'
          variant='standard'
          fullWidth
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
        <LoginTextField
          label='パスワード'
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
            ログイン
          </SubmitButton>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
