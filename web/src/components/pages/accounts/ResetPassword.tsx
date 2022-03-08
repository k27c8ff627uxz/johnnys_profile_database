import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ButtonWithProgress, MySuccessSnackbar, MyErrorSnackbar } from 'utils/mycomponents';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';

const ResetPassword: React.FC = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [email, setEmail] = useState('');
  const [isSendOpen, setSendOpen] = useState<'none' | 'success'| 'error'>('none');
  const { sendPasswordResetEmail } = AccountContainer.useContainer();

  const closeSendOpen = () => { setSendOpen('none') ;};

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    beginLoading();
    
    sendPasswordResetEmail(email)
      .then(() => {
        setSendOpen('success');
      }).catch(e => {
        console.error(e);
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
        <Stack spacing={2}>
          <TextField
            label='メールアドレス'
            variant='standard'
            fullWidth
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonWithProgress
              type='submit'
              variant='contained'
              disabled={disabled}
              isLoading={isLoading}
            >
              送信
            </ButtonWithProgress>
          </Box>
        </Stack>
      </form>
      <MySuccessSnackbar open={isSendOpen === 'success'} autoHideDuration={6000} onClose={closeSendOpen}>
        初期化メールが送信されました。
      </MySuccessSnackbar>
      <MyErrorSnackbar open={isSendOpen === 'error'} autoHideDuration={6000} onClose={closeSendOpen}>
        初期化メールの送信に失敗しました。
      </MyErrorSnackbar>
    </Container>
  );
};

export default ResetPassword;
