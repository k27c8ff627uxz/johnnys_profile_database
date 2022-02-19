import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { MyModal } from 'utils/mycomponents';
import ProfileListContainer from './ProfileListContainer';
import ProfileTable from './ProfileTable';
import AddUserEditor from './AddUserEditor';

const Component: React.FC = () => {
  const { profileList, isLoading } = ProfileListContainer.useContainer();
  const [addProfileModal, setAddProfileModal] = useState(false);

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={1}>
        <Box style={{display: 'flex'}}>
          <TextField
            label='検索'
            variant='standard'
            fullWidth
          />
          <IconButton size='large' onClick={() => setAddProfileModal(true)}>
            <AddCircleIcon color='primary' fontSize='large' />
          </IconButton>
        </Box>
        <ProfileTable rowData={profileList} />
      </Stack>
      <MyModal
        isLoading={isLoading}
        open={addProfileModal}
        onClose={() => setAddProfileModal(false)}
        title='メンバーの追加'
      >
        <AddUserEditor />
      </MyModal>
    </Box>
  );
};

const ProfileList: React.FC = () => (
  <ProfileListContainer.Provider>
    <Component />
  </ProfileListContainer.Provider>
);

export default ProfileList;
