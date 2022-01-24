import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SignupTextField = styled(TextField)(() => ({
  margin: '10px',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '10px',
}));

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmit = () => {
    return;
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{textAlign: 'center', m: 2}}>
        アカウント作成
      </Typography>
      <form onSubmit={onSubmit}>
        <SignupTextField
          label='ニックネーム'
          variant='standard'
          fullWidth
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <SignupTextField
          label='メールアドレス'
          variant='standard'
          fullWidth
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
        <SignupTextField
          label='パスワード'
          type='password'
          variant='standard'
          fullWidth
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        /> 
        <SignupTextField
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
            disabled={!name || !email || !password || !passwordConfirm || password !== passwordConfirm}
          >
            アカウント作成
          </SubmitButton>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
