import React from 'react';
import {
  Container,
} from '@mui/material';
import FrameworkViewContainer from 'models/frameworkView';
import { MyModal } from 'utils/mycomponents';
import UserEditorContainer from './UserEditorContainer';
import UserTable from './UserTable';
import EditUserModal from './EditUserModal';

const Component: React.FC = () => {
  const { rows, selectedRow, setSelectedRow, reload } = UserEditorContainer.useContainer();
  const { isLoading } = FrameworkViewContainer.useContainer();

  const onModalClose = () => {
    setSelectedRow(null);
  };
  
  return (
    <Container sx={{textAlign: 'center', height: '100%', boxSizing:'border-box', paddingY: 3}}>
      <UserTable
        rowData={rows}
      />
      <MyModal
        open={selectedRow !== null}
        onClose={onModalClose}
        title={selectedRow === null ? '' : `${selectedRow.name}(${selectedRow.email})`}
        isLoading={isLoading}
      >
        {selectedRow &&
          <EditUserModal row={selectedRow} onSuccess={() => {onModalClose(); reload(); } } />
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
