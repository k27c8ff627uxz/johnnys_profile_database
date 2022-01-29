import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ResetField = styled(TextField)(() => ({
  margin: '10px',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '10px',
}));

const ResetPasswordInput: React.FC<{
  onSetPassword: (password: string) => void,
  isLoading: boolean,
}> = ({onSetPassword, isLoading}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const checkVerify = () => {
    if (!password || !passwordConfirm) {
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetPassword(password);
  };

  return (
    <React.Fragment>
      <Typography sx={{m: 2}}>
        メールの確認が正常に完了しました。
      </Typography>
      <Typography sx={{m: 2}}>
        以下に新しいパスワードを入力して下さい。
      </Typography>
      <form onSubmit={onSubmit}>
        <ResetField
          label='パスワード'
          type='password'
          variant='standard'
          fullWidth
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        /> 
        <ResetField
          label='パスワード(確認用)'
          type='password'
          variant='standard'
          fullWidth
          value={passwordConfirm}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(event.target.value)}
        />
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <SubmitButton
            type='submit'
            variant='contained'
            disabled={checkVerify()}
          >
            パスワード設定
          </SubmitButton>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default ResetPasswordInput;
