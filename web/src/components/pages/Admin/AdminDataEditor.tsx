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
import { getAllData, setAllData } from 'utils/firebaseFunctions';

const AdminDataEditor = () => {
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [dataText, setDataText] = useState('');
  const [executeResult, setExecuteResult] = useState<null | 'success' | 'error'>(null);

  const functions = getFunctions();

  useEffect(() => {
    roadData();
  }, []);

  const roadData = async () => {
    beginLoading();
    const func = getAllData(functions);
    const apiData = await func();
    setDataText(JSON.stringify(apiData.data, null, 2));
    finishLoading();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateData(); 
  };

  const updateData = async () => {
    beginLoading();
    const func = setAllData(functions);
    const apiResult = await func(dataText);
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
        Data Editor
      </Typography>
      {executeResult === 'success' && <Typography>Success</Typography>}
      {executeResult === 'error' && <MyErrorMessage text={['error']} />}
      <TextField
        multiline
        fullWidth
        value={dataText}
        onChange={e => setDataText(e.target.value)}
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

export default AdminDataEditor;
