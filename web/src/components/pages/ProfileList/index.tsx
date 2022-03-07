import React, { useState } from 'react';
import {
  Box,
  Stack,
} from '@mui/material';
import { MyModal } from 'utils/mycomponents';
import ProfileListContainer from './ProfileListContainer';
import ProfileHeader from './ProfileHeader';
import ProfileTable from './ProfileTable';
import AddUserEditor from './AddUserEditor';
import UpdateUserEditor from './UpdateUserEditor';

const Component: React.FC = () => {
  const { profileList, isLoading, reload, applySort, editable, applyFilter } = ProfileListContainer.useContainer();
  const [addProfileModal, setAddProfileModal] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState<string | null>(null);

  const onEditClick = (id: string) => {
    setUpdateProfileModal(id);
  };

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Stack sx={{margin: 3, width: '80%'}} spacing={1}>
        <ProfileHeader
          onAddProfileClick={() => setAddProfileModal(true)}
        />
        <ProfileTable
          rowData={profileList}
          editable={editable}
          onEditClick={onEditClick}
          onSort={applySort}
          rowFilter={applyFilter}
        />
      </Stack>
      <MyModal
        isLoading={isLoading}
        open={addProfileModal}
        onClose={() => setAddProfileModal(false)}
        title='メンバーの追加'
      >
        <AddUserEditor onSuccess={() => { setAddProfileModal(false); reload(); } } />
      </MyModal>
      <MyModal
        isLoading={isLoading}
        open={updateProfileModal !== null}
        onClose={() => setUpdateProfileModal(null)}
        title='メンバーの編集'
      >
        {updateProfileModal &&
          <UpdateUserEditor id={updateProfileModal} onSuccess={() => { setUpdateProfileModal(null); reload(); } } />
        }
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
