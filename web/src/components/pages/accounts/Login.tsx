import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { AuthInfoLogout, AuthInfoNotVerify } from 'models/auth';
import FrameworkViewContainer from 'models/frameworkView';
import { ButtonWithProgress, MyErrorMessage } from 'utils/mycomponents';
import literals from 'utils/literals';

const AdditionalMessage = styled(Typography)(() => ({
  margin: '5',
  textAlign: 'center',
  fontSize: 'small',
}));

const Login: React.FC<{authInfo: AuthInfoLogout | AuthInfoNotVerify}> = (props) => {
  const { authInfo } = props;
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    beginLoading();

    authInfo.login(email, password).then((credential) => {
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
    <Container maxWidth='sm' sx={{textAlign: 'center'}}>
      <Typography variant='h4' sx={{m: 2}}>
        ログイン
      </Typography>
      {loginError && <MyErrorMessage text={[
        'ログインに失敗しました。',
        'もう一度メールアドレスとパスワードを確認して下さい。',
      ]} />}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label='メールアドレス'
            variant='standard'
            fullWidth
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          />
          <TextField
            label='パスワード'
            type='password'
            variant='standard'
            fullWidth
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonWithProgress
              type='submit'
              variant='contained'
              disabled={!email || !password || isLoading}
              isLoading={isLoading}
            >
              ログイン
            </ButtonWithProgress>
          </Box>
        </Stack>
      </form>
      <AdditionalMessage>
        新規アカウント作成は<Link to={literals.path.account.signup}>こちら</Link>へ
      </AdditionalMessage>
      <AdditionalMessage>
        パスワードを忘れてしまった方は<Link to={literals.path.account.resetPassword}>こちら</Link>へ
      </AdditionalMessage>
    </Container>
  );
};

export default Login;
