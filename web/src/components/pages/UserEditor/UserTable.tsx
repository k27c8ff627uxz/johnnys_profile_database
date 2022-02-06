import React from 'react';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

export interface RowItem {
  id: number;
  name: string;
  email: string;
}

interface Props {
  rowData: RowItem[];
}

const UserTable: React.FC<Props> = ({rowData}) => {
  const columns: GridColDef[] = [
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
      sx={{height: '100%', marginY: 5}}
    />
  );
};

export default UserTable;
