import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { getFunctions } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { ButtonWithProgress, MyErrorMessage } from 'utils/mycomponents';
import { getAllUserData, setAllUserData } from 'utils/firebaseFunctions';

const CustomClaimEditor = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [userDataText, setUserDataText] = useState('');
  const [executeResult, setExecuteResult] = useState<null | 'success' | 'error'>(null);

  const functions = getFunctions();

  useEffect(() => {
    roadUserData();
  }, []);

  const roadUserData = async () => {
    beginLoading();
    const func = getAllUserData(functions);
    const apiData = await func();
    setUserDataText(JSON.stringify(apiData.data, null, 2));
    finishLoading();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateData(); 
  };

  const updateData = async () => {
    beginLoading();
    const func = setAllUserData(functions);
    const apiResult = await func(userDataText);
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
        CustomClaim Editor
      </Typography>
      {executeResult === 'success' && <Typography>Success</Typography>}
      {executeResult === 'error' && <MyErrorMessage text={['error']} />}
      <TextField
        multiline
        fullWidth
        value={userDataText}
        onChange={e => setUserDataText(e.target.value)}
      />
      <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: 2}}>
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

export default CustomClaimEditor;
