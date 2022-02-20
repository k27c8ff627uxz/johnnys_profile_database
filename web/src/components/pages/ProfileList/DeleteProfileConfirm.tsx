import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { getFunctions } from 'firebase/functions';
import { ButtonWithProgress, MyErrorMessages } from 'utils/mycomponents';
import FrameworkViewContainer from 'models/frameworkView';
import { deleteProfile } from 'utils/firebaseFunctions';

interface DeleteProfileConfirmProps {
  id: string;
  deletingName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteProfileConfirm = (params: DeleteProfileConfirmProps) => {
  const { id, deletingName, onClose, onSuccess } = params;
  const { isLoading, beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [errorState, setErrorState] = useState<'error' | 'unauthenticated' | null>(null);

  const onSubmit = async () => {
    beginLoading();
    const functions = getFunctions();
    
    try {
      const apiResult = await deleteProfile(functions)({
        id,
      });

      const data = apiResult.data;
      switch(data.result) {
      case 'success':
        setErrorState(null);
        onSuccess();
        break;
      case 'unauthenticated':
        setErrorState('unauthenticated');
        break;
      case 'error':
        setErrorState('error');
        console.error(data.errorMessage);
        break;
      }
      
    } catch(e) {
      setErrorState('error');
      console.error(e);
    } finally {
      finishLoading();
    }
  };

  return (
    <Box sx={{p: 2}}>
      <Typography>
        本当に「{deletingName}」のデータを削除して宜しいですか？
      </Typography>
      <MyErrorMessages
        errorState={errorState}
        texts={{
          error: ['実行中にエラーが発生しました。'],
          unauthenticated: ['データを編集する権限がありません'],
        }}
      />
      <Stack direction='row' justifyContent='flex-end' spacing={2}>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          color='error'
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => onSubmit()}
        >
          削除
        </ButtonWithProgress>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => onClose()}
        >
          キャンセル
        </ButtonWithProgress>
      </Stack>
    </Box>
  );
};

export default DeleteProfileConfirm;
