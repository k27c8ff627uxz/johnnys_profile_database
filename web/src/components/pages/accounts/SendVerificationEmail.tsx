import React, { useState } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { ButtonWithProgress, MySuccessSnackbar, MyErrorSnackbar } from 'utils/mycomponents';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';
import literals from 'utils/literals';

const SendVerificationEmail: React.FC = () => {
  const { authInfo } = AccountContainer.useContainer();
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [isSendOpen, setSendOpen] = useState<'none' | 'success'| 'error'>('none');

  if (authInfo.state !== 'notVerify') {
    return <Navigate to={literals.path.dashboard} />;
  }

  const closeSendOpen = () => { setSendOpen('none') ;};

  const onVerifyClick = () => {
    beginLoading();
    authInfo.sendEmailVerification()
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
      <ButtonWithProgress disabled={isLoading} variant='contained' onClick={onVerifyClick} isLoading={isLoading}>
        有効化メール送信
      </ButtonWithProgress>
      <MySuccessSnackbar open={isSendOpen === 'success'} autoHideDuration={6000} onClose={closeSendOpen}>
        確認メールが送信されました。
      </MySuccessSnackbar>
      <MyErrorSnackbar open={isSendOpen === 'error'} autoHideDuration={6000} onClose={closeSendOpen}>
        確認メールの送信に失敗しました。
      </MyErrorSnackbar>
    </Container>
  );
};

export default SendVerificationEmail;
