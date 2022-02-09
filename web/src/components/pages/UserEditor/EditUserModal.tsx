import React, { useState } from 'react';
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
} from '@mui/material';
import { ButtonWithProgress } from 'utils/mycomponents';
import FrameworkViewContainer from 'models/frameworkView';
import { RowItem } from './types';

export interface EditUserModalProps {
  rows: RowItem;
  onClose: () => void;
}

const EditUserModal = (props: EditUserModalProps) => {
  const { beginLoading, finishLoading, isLoading } = FrameworkViewContainer.useContainer();
  const customClaim = props.rows.customClaim;
  const [editData, setEditData] = useState((() => {
    switch(customClaim.version) {
    case '0.0.0':
      return false;
    case '1.0.0':
      return customClaim.editData;
    }
  })());
  const [userManage, setUserManage] = useState((() => {
    switch(customClaim.version) {
    case '0.0.0':
      return false;
    case '1.0.0':
      return customClaim.userManage;
    }
  })());

  const onSubmit = () => {
    beginLoading();
    // TODO: onSubmit
    console.log('submit');
    finishLoading();
  };

  return (
    <Stack spacing={2} sx={{m: 3}}>
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
