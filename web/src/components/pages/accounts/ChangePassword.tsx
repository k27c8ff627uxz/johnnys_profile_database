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
import FrameworkViewContainer from 'models/frameworkView';
import AccountContainer from 'models/account';

const ChangeTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '10px',
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.error.main,
}));

const ChangePassword: React.FC = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const { updatePassword } = AccountContainer.useContainer();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [errorState, setErrorState] = useState<'failCredential' | 'failChange' | null>(null);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    beginLoading();
    const result = await updatePassword(currentPassword, newPassword);
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
    case 'unknown':
      throw new Error('Unreach');
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
      {errorState === 'failChange'  && (
        <ErrorMessage>
          パスワードの変更に失敗しました。
        </ErrorMessage>
      )}
      {errorState === 'failCredential'  && (
        <>
          <ErrorMessage>
            パスワードの変更に失敗しました。
          </ErrorMessage>
          <ErrorMessage>
            再度、パスワードをご確認ください。
          </ErrorMessage>
        </>
      )}
      <form onSubmit={onSubmit}>
        <ChangeTextField
          label='現在のパスワード'
          type='password'
          variant='standard'
          fullWidth
          value={currentPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(event.target.value)}
        /> 
        <ChangeTextField
          label='新しいパスワード'
          type='password'
          variant='standard'
          fullWidth
          value={newPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
        /> 
        <ChangeTextField
          label='新しいパスワード(確認用)'
          type='password'
          variant='standard'
          fullWidth
          value={newPasswordConfirm}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPasswordConfirm(event.target.value)}
        />
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <SubmitButton
            type='submit'
            variant='contained'
            disabled={checkVerify()}
          >
            パスワード変更
          </SubmitButton>
        </Box>
      </form>
      <Snackbar open={isSuccessOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        <Alert onClose={() => setSuccessOpen(false)} severity='success' sx={{ width: '100%' }}>
          パスワードが変更されました。
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ChangePassword;
