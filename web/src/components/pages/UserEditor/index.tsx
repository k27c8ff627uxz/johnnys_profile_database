import React, { useState, useEffect } from 'react';
import {
  Container,
} from '@mui/material';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import UserTable, { RowItem } from './UserTable';

const UserEditor: React.FC = () => {
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [rows, setRows] = useState<RowItem[]>([]);
  const [alreadyLoad, setAlreadyLoad] = useState(false);
  const functions = getFunctions();
  const call = httpsCallable<GetUserProfileRequest, GetUserProfileResponse>(functions, 'getUserProfile');

  const reloadData = () => {
    beginLoading();
    call({}).then(apiResult => {
      const result = apiResult.data;
      switch (result.result) {
      case 'success':
        setRows(result.data.map((item, index) => ({
          id: index,
          name: item.name,
          email: item.email,
        })));
        break;
      case 'error':
        console.error(result.errorMessage);
        break;
      case 'notAuthenticated':
        throw new Error('Unreach');
      }
    }).catch(e => {
      console.error(e);
      setRows([]);
    }).finally(() => {
      finishLoading();
    });
  };

  useEffect(() => {
    if (!alreadyLoad) {
      reloadData();
      setAlreadyLoad(true);
    }
  }, [alreadyLoad]);
  
  return (
    <Container sx={{textAlign: 'center'}}>
      <UserTable
        rowData={rows}
      />
    </Container>
  );
};

export default UserEditor;
