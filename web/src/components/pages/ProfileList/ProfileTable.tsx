import React from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { RowItem, ColData } from './types';
import { getUncertainDate } from 'utils/functions';
import { dateToString } from 'common/utils/date';

export interface ProfileTableProps {
  rowData: RowItem[];
  editable: boolean;
  onEditClick: (id: string) => void;
}

const ProfileTable = (props: ProfileTableProps) => {
  const { rowData, onEditClick, editable } = props;

  const colData: ColData[] = [
    ...(editable ? [{
      id: 'edit',
      label: '',
      width: 2,
    }] : []),
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

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {colData.map((val, i) => (
                <TableCell key={i} width={val.width} >
                  {val.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((value, i) => (
              <TableRow key={i}>
                {editable && (
                  <TableCell>
                    <IconButton color='primary' onClick={() => onEditClick(value.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                )}
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
