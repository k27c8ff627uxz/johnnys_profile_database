import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
} from '@mui/material';
import FrameworkViewContainer from 'models/frameworkView';
import { MyModal } from 'utils/mycomponents';
import UserEditorContainer from './UserEditorContainer';
import UserTable from './UserTable';
import EditUserModal from './EditUserModal';

const Component: React.FC = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const { rows } = UserEditorContainer.useContainer();
  const { isLoading } = FrameworkViewContainer.useContainer();

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

const UserEditor = () => {
  return (
    <UserEditorContainer.Provider>
      <Component />
    </UserEditorContainer.Provider>
  );
};

export default UserEditor;
