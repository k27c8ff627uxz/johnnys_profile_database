import React from 'react';
import {
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export interface ProfileTableProps {
  rowData: RowItem[];
}

export interface RowItem {
  id: string;
  name: string;
  furigana: string;
  dateOfBirth: string;
  bloodType: string;
  entire: string;
  retire: string;
}

interface ColData {
  id: string;
  label: string;
}

const colData: ColData[] = [
  {
    id: 'name',
    label: '名前',
  }, {
    id: 'furigana',
    label: 'ふりがな',
  }, {
    id: 'dateOfBirth',
    label: '生年月日',
  }, {
    id: 'bloodType',
    label: '血液型',
  }, {
    id: 'entire',
    label: '入所日',
  }, {
    id: 'retire',
    label: '退所日',
  },
];

const style: SxProps = {
  margin: 3,
  width: '80%',
};

const ProfileTable = (props: ProfileTableProps) => {
  const { rowData } = props;
  return (
    <Paper elevation={2} sx={style}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {colData.map((val, i) => (
                <TableCell key={i}>
                  {val.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((value, i) => (
              <TableRow key={i}>
                <TableCell>
                  {value.name}
                </TableCell>
                <TableCell>
                  {value.furigana}
                </TableCell>
                <TableCell>
                  {value.dateOfBirth}
                </TableCell>
                <TableCell>
                  {value.bloodType}
                </TableCell>
                <TableCell>
                  {value.entire}
                </TableCell>
                <TableCell>
                  {value.retire}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProfileTable;
