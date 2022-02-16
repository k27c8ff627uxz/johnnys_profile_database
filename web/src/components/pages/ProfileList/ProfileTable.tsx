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
import { RowItem, ColData } from './types';
import { getUncertainDate } from './utils';
import { dateToString } from 'common/utils/date';

export interface ProfileTableProps {
  rowData: RowItem[];
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
                  {dateToString(value.dateOfBirth)}
                </TableCell>
                <TableCell>
                  {value.bloodType}
                </TableCell>
                <TableCell>
                  {getUncertainDate(value.enter)}
                </TableCell>
                <TableCell>
                  {value.retire === undefined ? '-' : getUncertainDate(value.retire)}
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
