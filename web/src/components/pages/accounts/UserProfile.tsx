import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';
import { updateAccountRequest, updateAccountResult } from 'common/api/account/updateAccount';

const ProfileTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '10px',
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.error.main,
}));

const UserProfile: React.FC = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const { userInfo, reload } = AccountContainer.useContainer();
  if (userInfo === null) {
    throw new Error('Unreach');
  }
  const [name, setName] = useState(userInfo.name);
  const [errorState, setErrorState] = useState<'APIError' | 'AccessError' | null>(null);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

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
    const call = httpsCallable<updateAccountRequest, updateAccountResult>(functions, 'updateAccount');
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
      {errorState === 'APIError' && (
        <>
          <ErrorMessage>
            プロフィールの更新に失敗しました。
          </ErrorMessage>
          <ErrorMessage>
            更新内容をもう一度ご確認ください。
          </ErrorMessage>
        </>
      )}
      {errorState === 'AccessError' && (
        <ErrorMessage>
          プロフィール更新タスクの呼び出しに失敗しました。
        </ErrorMessage>
      )}
      <form onSubmit={onSubmit}>
        <ProfileTextField
          label='メールアドレス'
          variant='filled'
          fullWidth
          value={userInfo.email}
        />
        <ProfileTextField
          label='ニックネーム'
          variant='standard'
          fullWidth
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <SubmitButton
            type='submit'
            variant='contained'
            disabled={checkVerify()}
          >
            更新
          </SubmitButton>
        </Box>
      </form>
      <Snackbar open={isSuccessOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        <Alert onClose={() => setSuccessOpen(false)} severity='success' sx={{ width: '100%' }}>
          正常に更新されました。
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
