import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Snackbar,
  Typography,
} from '@mui/material';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';

const SendVerificationEmail: React.FC = () => {
  const { sendEmailVerification } = AccountContainer.useContainer();
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [isSendOpen, setSendOpen] = useState<'none' | 'success'| 'error'>('none');

  const closeSendOpen = () => { setSendOpen('none') ;};

  const onVerifyClick = () => {
    beginLoading();
    sendEmailVerification()
      .then(() => {
        setSendOpen('success');
      }).catch(e => {
        console.log(e);
        setSendOpen('error');
      }).finally(() => {
        finishLoading();
      });
  };

  return (
    <Container maxWidth='sm' sx={{textAlign: 'center'}}>
      <Typography sx={{m: 2}}>
        お使いのアカウントはまだ有効化されていません。
      </Typography>
      <Typography sx={{m: 2}}>
        以下のボタンを押すと確認メールが送信されます。
      </Typography>
      <Button disabled={isLoading} variant='contained' onClick={onVerifyClick}>
        有効化メール送信
      </Button>
      <Snackbar open={isSendOpen === 'success'} autoHideDuration={6000} onClose={closeSendOpen}>
        <Alert onClose={closeSendOpen} severity='success' sx={{ width: '100%' }}>
          確認メールが送信されました。
        </Alert>
      </Snackbar>
      <Snackbar open={isSendOpen === 'error'} autoHideDuration={6000} onClose={closeSendOpen}>
        <Alert onClose={closeSendOpen} severity='error' sx={{ width: '100%' }}>
          確認メールの送信に失敗しました。
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SendVerificationEmail;
