import React from 'react';
import {
  Box,
} from '@mui/material';
import ProfileListContainer from './ProfileListContainer';
import ProfileTable from './ProfileTable';

const Component: React.FC = () => {
  const { profileList } = ProfileListContainer.useContainer();

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <ProfileTable rowData={profileList} />
    </Box>
  );
};

const ProfileList: React.FC = () => (
  <ProfileListContainer.Provider>
    <Component />
  </ProfileListContainer.Provider>
);

export default ProfileList;
