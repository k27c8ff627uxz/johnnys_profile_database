import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { CreateAccountRequest, CreateAccountResponse } from 'common/api/account/createAccount';
import FrameworkViewContainer from 'models/frameworkView';
import { ButtonWithProgress, MyErrorMessage } from 'utils/mycomponents';
import literals from 'utils/literals';

const SignUp: React.FC = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signUpError, setSignUpError] = useState<'alreadyExist' | 'error' | null>(null);
  const [successToCreateAccount, setSuccessToCreateAccount] = useState(false);

  const functions = getFunctions();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const call = httpsCallable<CreateAccountRequest, CreateAccountResponse>(functions, 'createAccount');
    beginLoading();

    // アカウント作成
    try {
      const apiResult = await call({
        email,
        password,
        name,
      });

      finishLoading();
      const result = apiResult.data;
      console.log(result);
      switch (result.result) {
      case 'success':
        setSuccessToCreateAccount(true);
        setSignUpError(null);
        break;
      case 'alreadyExist':
        setSignUpError('alreadyExist');
        break;
      case 'error':
        setSignUpError('error');
        console.error(result.errorMessage);
        break;
      }
    } catch(e) {
      console.log(e);
      setSignUpError('error');
      finishLoading();
      return;
    }
  };

  const checkVerify = () => {
    if (!name || !email || !password) {
      return true;
    }
    if (isLoading) {
      return true;
    }
    if (password !== passwordConfirm) {
      return true;
    }
    if (password.length < 6) {
      return true;
    }
    return false;
  };

  if (successToCreateAccount) {
    return (
      <Container maxWidth='sm'>
        <Typography sx={{textAlign: 'center', m: 2}}>
          アカウントの新規作成に成功しました。
        </Typography>
        <Typography sx={{textAlign: 'center', m: 2}}>
          <Link to={literals.path.account.login}>ログインページ</Link>より、ログインを行って下さい。
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        アカウント作成
      </Typography>
      {signUpError === 'alreadyExist' && <MyErrorMessage text={[
        '指定されたメールアドレスは既にアカウント登録されています。',
      ]} />}
      {signUpError === 'error' && <MyErrorMessage text={[
        'アカウント作成に失敗しました。',
      ]} />}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label='ニックネーム'
            variant='standard'
            fullWidth
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
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
          <TextField
            label='パスワード(確認用)'
            type='password'
            variant='standard'
            fullWidth
            value={passwordConfirm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonWithProgress
              type='submit'
              variant='contained'
              disabled={checkVerify()}
              isLoading={isLoading}
            >
              アカウント作成
            </ButtonWithProgress>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};

export default SignUp;
