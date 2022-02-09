import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';
import { AuthInfoLogin } from 'models/auth';
import { UpdateAccountRequest, UpdateAccountResponse } from 'common/api/account/updateAccount';
import { ButtonWithProgress, MyErrorMessage, MySuccessSnackbar } from 'utils/mycomponents';
import literals from 'utils/literals';

const UserProfile: React.FC<{authInfo: AuthInfoLogin}> = (params) => {
  const { authInfo } = params;
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const { reload } = AccountContainer.useContainer();

  const [name, setName] = useState(authInfo.name);
  const [errorState, setErrorState] = useState<'APIError' | 'AccessError' | null>(null);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const navigate = useNavigate();

  const checkVerify = () => {
    if (!name) {
      return true;
    }
    return isLoading;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // プロフィール変更
    beginLoading();
    const functions = getFunctions();
    const call = httpsCallable<UpdateAccountRequest, UpdateAccountResponse>(functions, 'updateAccount');
    call({
      name,
    }).then((res) => {
      const data = res.data;
      switch(data.result) {
      case 'success':
        setErrorState(null);
        setSuccessOpen(true);
        reload().then();
        break;
      case 'unauthenticated':
        console.log('unauthenticated!!!');
        throw new Error('Unreach');
      case 'error':
        console.log(data.errorMessage);
        setErrorState('APIError');
        break;
      default:
        throw new Error('Unreach');
      }
    }).catch(e => {
      if (e.message === 'Unreach') {
        throw e;
      }
      console.log(e);
      setErrorState('AccessError');
    }).finally(() => {
      finishLoading();
    });
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        プロフィール設定
      </Typography>
      {errorState === 'APIError' && <MyErrorMessage text={[
        'プロフィールの更新に失敗しました。',
        '更新内容をもう一度ご確認ください。',
      ]} />}
      {errorState === 'AccessError' && <MyErrorMessage text={[
        'プロフィール更新タスクの呼び出しに失敗しました。',
      ]} />}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label='メールアドレス'
            variant='filled'
            fullWidth
            value={authInfo.email}
          />
          <TextField
            label='ニックネーム'
            variant='standard'
            fullWidth
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonWithProgress
              type='submit'
              variant='contained'
              disabled={checkVerify()}
              isLoading={isLoading}
            >
              更新
            </ButtonWithProgress>
          </Box>
        </Stack>
      </form>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', marginY: 4}}>
        <Button
          type='submit'
          variant='contained'
          color='error'
          disabled={checkVerify()}
          onClick={() => navigate(literals.path.account.deleteAccount)}
        >
          アカウント削除
        </Button>
      </Box>
      <MySuccessSnackbar open={isSuccessOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        正常に更新されました。
      </MySuccessSnackbar>
    </Container>
  );
};

export default UserProfile;
