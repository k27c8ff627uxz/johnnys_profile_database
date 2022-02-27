import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { getFunctions } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { ButtonWithProgress, MyErrorMessage } from 'utils/mycomponents';
import { attachRolesToAdmin } from 'utils/firebaseFunctions';

const Workaround = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [executeResult, setExecuteResult] = useState<null | 'success' | 'error'>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    beginLoading();
    const functions = getFunctions();
    const call = attachRolesToAdmin(functions);
    const apiResult = await call();
    if (apiResult.data) {
      setExecuteResult('success');
    } else {
      setExecuteResult('error');
    }

    finishLoading();
  };

  return (
    <Container sx={{textAlign: 'center', paddingY: 3}}>
      <Typography variant='h4' sx={{m: 2}}>
        Adminユーザーにフル権限を与える
      </Typography>
      {executeResult === 'success' && <Typography>Success</Typography>}
      {executeResult === 'error' && <MyErrorMessage text={['error']} />}
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          disabled={isLoading}
          isLoading={isLoading}
          onClick={onSubmit}
        >
          実行
        </ButtonWithProgress>
      </Box>
    </Container>
  );
};

export default Workaround;
