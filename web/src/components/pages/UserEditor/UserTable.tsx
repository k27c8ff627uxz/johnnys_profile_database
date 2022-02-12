import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  PersonAddAlt as PersonAddAltIcon,
} from '@mui/icons-material';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
import UserEditorContainer from './UserEditorContainer';
import { RowItem } from './types';

interface Props {
  rowData: RowItem[];
}

const iconWidth = 55;

const UserTable: React.FC<Props> = ({rowData}) => {
  const { setSelectedRow } = UserEditorContainer.useContainer();

  const editCell = (row: RowItem) => {
    const onClick = () => {
      console.debug(row);
      setSelectedRow(row);
    };
  
    return (
      <IconButton color='primary' onClick={onClick} >
        <EditIcon />
      </IconButton>
    );
  };

  const ifCheckIcon = (check: boolean) => {
    return (
      <React.Fragment>
        {check && <CheckCircleIcon color='success' />}
      </React.Fragment>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'edit',
      headerName: '',
      width: iconWidth,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => editCell(params.row),
    },
    {
      field: 'editData',
      width: iconWidth,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => ifCheckIcon((params.row as RowItem).customClaim.role.editData),
      renderHeader: () => (
        <Tooltip title='データ編集権限' placement='top'>
          <AssignmentIcon />
        </Tooltip>
      ),
    },
    {
      field: 'userManage',
      width: iconWidth,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => ifCheckIcon((params.row as RowItem).customClaim.role.userManage),
      renderHeader: () => (
        <Tooltip title='ユーザー権限' placement='top'>
          <PersonAddAltIcon />
        </Tooltip>
      ),
    },
    {
      field: 'name',
      headerName: 'ニックネーム',
      flex: 3,
      disableColumnMenu: true,
    },
    {
      field: 'email',
      headerName: 'メールアドレス',
      flex: 8,
      disableColumnMenu: true,
    },
  ];

  return (
    <DataGrid
      rows={rowData}
      columns={columns}
      sx={{flexGrow:1}}
    />
  );
};

export default UserTable;
