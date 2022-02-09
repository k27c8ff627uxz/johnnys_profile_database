import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FrameworkViewContainer from 'models/frameworkView';
import { AuthInfoLogin } from 'models/auth';
import { ButtonWithProgress, MyErrorMessage, MySuccessSnackbar } from 'utils/mycomponents';

const ChangePassword: React.FC<{authInfo: AuthInfoLogin}> = (props) => {
  const { authInfo } = props;
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [errorState, setErrorState] = useState<'failCredential' | 'failChange' | null>(null);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    beginLoading();
    const result = await authInfo.updatePassword(currentPassword, newPassword);
    finishLoading();
    switch(result) {
    case 'success':
      setErrorState(null);
      setSuccessOpen(true);
      break;
    case 'failChange':
      setErrorState('failChange');
      break;
    case 'failCredential':
      setErrorState('failCredential');
      break;
    }
  };

  const checkVerify = () => {
    if (!currentPassword || !newPassword) {
      return true;
    }
    if (isLoading) {
      return true;
    }
    if (newPassword !== newPasswordConfirm) {
      return true;
    }
    if (newPassword.length < 6) {
      return true;
    }

    return false;
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        パスワード変更
      </Typography>
      {errorState === 'failChange'  && <MyErrorMessage text={[
        'パスワードの変更に失敗しました。',
      ]} />}
      {errorState === 'failCredential'  && <MyErrorMessage text={[
        'パスワードの変更に失敗しました。',
        '再度、パスワードをご確認ください。',
      ]} />}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label='現在のパスワード'
            type='password'
            variant='standard'
            fullWidth
            value={currentPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(event.target.value)}
          /> 
          <TextField
            label='新しいパスワード'
            type='password'
            variant='standard'
            fullWidth
            value={newPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
          /> 
          <TextField
            label='新しいパスワード(確認用)'
            type='password'
            variant='standard'
            fullWidth
            value={newPasswordConfirm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPasswordConfirm(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonWithProgress
              type='submit'
              variant='contained'
              isLoading={isLoading}
              disabled={checkVerify()}
            >
              パスワード変更
            </ButtonWithProgress>
          </Box>
        </Stack>
      </form>
      <MySuccessSnackbar open={isSuccessOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        パスワードが変更されました。
      </MySuccessSnackbar>
    </Container>
  );
};

export default ChangePassword;
