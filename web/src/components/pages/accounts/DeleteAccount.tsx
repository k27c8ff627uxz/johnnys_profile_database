import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import AccountContainer from 'models/account';
import FrameworkViewContainer from 'models/frameworkView';
import { MyErrorMessage } from 'utils/mycomponents';
import literals from 'utils/literals';

const DeleteAccount: React.FC = () => {
  const { authInfo } = AccountContainer.useContainer();
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [successDelete, setSuccessDelete] = useState(false);
  const [verifyText, setVerifyText] = useState('');

  if (authInfo.state !== 'login') {
    if (successDelete) {
      return (
        <Container maxWidth='sm' sx={{textAlign: 'center', marginY: 2}}>
          <Typography>アカウントは正常に削除されました。</Typography>
          <Typography>またのご利用をお待ちしています。</Typography>
        </Container>
      );
    }
    return <Navigate to={literals.path.account.login} />;
  }

  const checkVerify = verifyText !== authInfo.email;

  const deleteAction = async () => {
    beginLoading();
    setSuccessDelete(true);
    await authInfo.deleteUser();
    finishLoading();
  };

  return (
    <Container maxWidth='sm' sx={{textAlign: 'center', marginY: 2}}>
      <Stack spacing={2}>
        <MyErrorMessage text={[
          `お使いのアカウント「${authInfo.name}」は完全に消去されます。`,
          'この操作は元に戻せません。',
          '削除を了承しましたら、以下にあなたのメールアドレスを入力して「アカウント削除」を押下してください。。',
        ]} />
        <TextField
          label='削除確認'
          variant='standard'
          fullWidth
          value={verifyText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setVerifyText(event.target.value)}
        />
        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginY: 4}}>
          <Button
            type='submit'
            variant='contained'
            color='error'
            disabled={checkVerify}
            onClick={deleteAction}
          >
            アカウント削除
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default DeleteAccount;
