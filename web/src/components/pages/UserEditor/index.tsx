import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
} from '@mui/material';
import { getFunctions, httpsCallable } from 'firebase/functions';
import FrameworkViewContainer from 'models/frameworkView';
import { MyModal } from 'utils/mycomponents';
import { GetUserProfileRequest, GetUserProfileResponse } from 'common/api/user/getUserProfile';
import UserTable from './UserTable';
import EditUserModal from './EditUserModal';
import { RowItem } from './types';

const UserEditor: React.FC = () => {
  const { beginLoading, finishLoading, isLoading } = FrameworkViewContainer.useContainer();
  const [queryParams, setQueryParams] = useSearchParams();
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
        setRows(result.data.map(item => ({
          id: item.uid,
          name: item.name,
          email: item.email,
          customClaim: item.customClaim,
          verified: item.verified,
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

  const selectedRows = (() => {
    const selectedUid = queryParams.get('uid');
    if (selectedUid === null) {
      return undefined;
    }

    return rows.find(value => value.id === selectedUid);
  })();

  const onModalClose = () => {
    queryParams.delete('uid');
    setQueryParams(queryParams);
  };
  
  return (
    <Container sx={{textAlign: 'center', height: '100%', boxSizing:'border-box', paddingY: 3}}>
      <UserTable
        rowData={rows}
      />
      <MyModal
        open={selectedRows !== undefined}
        onClose={onModalClose}
        title={selectedRows === undefined ? '' : `${selectedRows.name}(${selectedRows.email})`}
        isLoading={isLoading}
      >
        {selectedRows &&
          <EditUserModal rows={selectedRows} onClose={onModalClose} />
        }
      </MyModal>
    </Container>
  );
};

export default UserEditor;
