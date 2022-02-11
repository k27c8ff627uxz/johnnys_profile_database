import React from 'react';
import { IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
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

  const columns: GridColDef[] = [
    {
      field: 'edit',
      headerName: '',
      width: iconWidth,
      renderCell: (params) => editCell(params.row),
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
