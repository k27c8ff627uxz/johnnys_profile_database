import React, { useState } from 'react';
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
} from '@mui/material';
import { MyErrorMessages } from 'utils/mycomponents';
import { ButtonWithProgress } from 'utils/mycomponents';
import FrameworkViewContainer from 'models/frameworkView';
import UserEditorContainer from './UserEditorContainer';
import { RowItem } from './types';

export interface EditUserModalProps {
  row: RowItem;
  onClose: () => void;
}

const EditUserModal = (props: EditUserModalProps) => {
  const { row, onClose } = props;
  const { beginLoading, finishLoading, isLoading } = FrameworkViewContainer.useContainer();
  const { updateCustomClaim } = UserEditorContainer.useContainer();
  const customClaim = row.customClaim;
  const [editData, setEditData] = useState(customClaim.editData);
  const [userManage, setUserManage] = useState(customClaim.userManage);
  const [errorState, setErrorState] = useState<'error' | 'unauthenticated' | null>(null);

  const onSubmit = async () => {
    beginLoading();
    if (row === undefined) {
      throw new Error('Unreach');
    }
    const result = await updateCustomClaim(
      row.id,
      {
        version: '1.0.0',
        editData,
        userManage,
      },
    );
    switch (result) {
    case 'success':
      setErrorState(null);
      onClose();
      break;
    case 'unauthenticated':
      setErrorState('unauthenticated');
      break;
    case 'error':
      setErrorState('error');
      break;
    }
    finishLoading();
  };

  return (
    <Stack spacing={2} sx={{m: 3}}>
      <MyErrorMessages
        errorState={errorState}
        texts={{
          error: ['実行中にエラーが発生しました。'],
          unauthenticated: ['ユーザーを編集する権限がありません。'],
        }}
      />
      <Box>
        <FormControlLabel
          control={
            <Switch checked={editData} onChange={(e) => setEditData(e.target.checked)} disabled={isLoading} />
          }
          label='このユーザーをデータ編集可能にする'
        />
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Switch checked={userManage} onChange={(e) => setUserManage(e.target.checked)} disabled={isLoading} />
          }
          label='このユーザーを他ユーザーの権限を編集可能にする'
        />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <ButtonWithProgress
          type='submit'
          variant='contained'
          isLoading={isLoading}
          disabled={isLoading}
          onClick={onSubmit}
        >
          変更
        </ButtonWithProgress>
      </Box>
    </Stack>
  );
};

export default EditUserModal;
