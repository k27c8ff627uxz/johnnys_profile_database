import React from 'react';
import {
  Box,
} from '@mui/material';
import ProfileTable, { RowItem } from './ProfileTable';

const rowData: RowItem[] = 
  [...Array(38)].map((_, i) => ({
    id: `${i}`,
    name: `item${i}-1`,
    furigana: `item${i}-2`,
    bloodType: 'A',
    dateOfBirth: '2020/1/1',
    entire: '1991/3/4',
    retire: '-',
  }));

const ProfileList: React.FC = () => {

  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <ProfileTable rowData={rowData} />
    </Box>
  );
};

export default ProfileList;
