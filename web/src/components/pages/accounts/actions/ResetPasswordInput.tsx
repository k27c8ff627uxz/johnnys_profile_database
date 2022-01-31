import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

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
        <Stack>
          <TextField
            label='パスワード'
            type='password'
            variant='standard'
            fullWidth
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          /> 
          <TextField
            label='パスワード(確認用)'
            type='password'
            variant='standard'
            fullWidth
            value={passwordConfirm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              type='submit'
              variant='contained'
              disabled={checkVerify()}
            >
              パスワード設定
            </Button>
          </Box>
        </Stack>
      </form>
    </React.Fragment>
  );
};

export default ResetPasswordInput;
