import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { httpsCallable, getFunctions } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { ButtonWithProgress, MyErrorMessage } from 'utils/mycomponents';

const Workaround = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [funcName, setFuncName] = useState('');
  const [executeResult, setExecuteResult] = useState<null | 'success' | 'error'>(null);

  const onSubmit = async () => {
    beginLoading();
    try {
      const functions = getFunctions();
      const call = httpsCallable(functions, `workaround${funcName}`);
      await call();
      setExecuteResult('success');
    } catch(e) {
      console.error(e);
      setExecuteResult('error');
    }
    finishLoading();
  };

  return (
    <Container sx={{textAlign: 'center', paddingY: 3}}>
      <Typography variant='h4' sx={{m: 2}}>
        ワークアラウンド実行
      </Typography>
      {executeResult === 'success' && <Typography>Success</Typography>}
      {executeResult === 'error' && <MyErrorMessage text={['error']} />}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label='function name'
            variant='standard'
            fullWidth
            value={funcName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFuncName(event.target.value)}
          />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonWithProgress
              type='submit'
              variant='contained'
              disabled={!funcName || isLoading}
              isLoading={isLoading}
            >
              execute
            </ButtonWithProgress>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};

export default Workaround;
