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
import {
  getAuth,
  sendPasswordResetEmail,
} from 'firebase/auth';
import FrameworkViewContainer from 'models/frameworkView';

const ResetTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '10px',
}));

const ResetPassword: React.FC = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [email, setEmail] = useState('');
  const [isSendOpen, setSendOpen] = useState<'none' | 'success'| 'error'>('none');

  const closeSendOpen = () => { setSendOpen('none') ;};

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    beginLoading();
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSendOpen('success');
      }).catch(e => {
        console.log(e);
        setSendOpen('error');
      }).finally(() => {
        finishLoading();
      });
  };

  const disabled = !email || isLoading;

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        パスワードの再設定
      </Typography>
      <Typography>
        以下にパスワードを初期化するメールアドレスを入力して送信をクリックして下さい。
      </Typography>
      <form onSubmit={onSubmit}>
        <ResetTextField
          label='メールアドレス'
          variant='standard'
          fullWidth
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <SubmitButton
            type='submit'
            variant='contained'
            disabled={disabled}
          >
            送信
          </SubmitButton>
        </Box>
      </form>
      <Snackbar open={isSendOpen === 'success'} autoHideDuration={6000} onClose={closeSendOpen}>
        <Alert onClose={closeSendOpen} severity='success' sx={{ width: '100%' }}>
          初期化メールが送信されました。
        </Alert>
      </Snackbar>
      <Snackbar open={isSendOpen === 'error'} autoHideDuration={6000} onClose={closeSendOpen}>
        <Alert onClose={closeSendOpen} severity='error' sx={{ width: '100%' }}>
          初期化メールの送信に失敗しました。
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResetPassword;
