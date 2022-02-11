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
  row: RowItem;
  onClose: () => void;
}

const EditUserModal = (props: EditUserModalProps) => {
  const { row, onClose } = props;
  const { beginLoading, finishLoading, isLoading } = FrameworkViewContainer.useContainer();
  const customClaim = row.customClaim;
  const [editData, setEditData] = useState(customClaim.editData);
  const [userManage, setUserManage] = useState(customClaim.userManage);

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
