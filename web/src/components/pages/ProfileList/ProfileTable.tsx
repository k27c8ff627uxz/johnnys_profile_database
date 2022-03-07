import React, { useState } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import FrameworkViewContainer from 'models/frameworkView';
import { RowItem } from './types';
import { columnData } from './columnData';
import { getUncertainDate, calcDiffDate } from 'utils/functions';
import { SortDir } from 'utils/types';
import { dateToString } from 'common/utils/date';
import { calcIsRetireNow } from './utils';

const CustomTableRow = styled(TableRow)<{isEnable: boolean}>(({isEnable, theme}) => ({
  background: isEnable ? theme.palette.grey[400] : undefined,
}));

export interface ProfileTableProps {
  rowData: RowItem[];
  editable: boolean;
  onEditClick: (id: string) => void;
  onSort: (compareFunc: (item1: RowItem, item2: RowItem) => number) => void;
  rowFilter: (row: RowItem) => boolean;
}

interface SortState {
  by: string;
  dir: SortDir;
}

const ProfileTable = (props: ProfileTableProps) => {
  const { rowData, onEditClick, editable, onSort, rowFilter } = props;
  const [sortState, setSortState] = useState<SortState>({by: 'name', dir: 'asc'});
  const { getToday } = FrameworkViewContainer.useContainer();

  const today = getToday();

  const colData = columnData(editable);

  const onSortClick = (
    headerId: string,
    compareFunc: (dir: SortDir) => (item1: RowItem, item2: RowItem) => number
  ) => {
    const newState: SortState = (() => {
      if (sortState.by === headerId) {
        return {
          ...sortState,
          dir: sortState.dir === 'desc' ? 'asc' : 'desc',
        };
      }
      
      return {
        by: headerId,
        dir: 'asc',
      };
    })();

    setSortState(newState);
    onSort(compareFunc(newState.dir));
  };

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {colData.filter(val => val.show).map((val, i) => (
                val.sort !== undefined ? (
                  <TableCell
                    key={i}
                    width={val.width}
                    sortDirection={sortState.by === val.id ? sortState.dir : undefined}
                    sx={{minWidth: val.minWidth}}
                  >
                    <TableSortLabel
                      active={sortState.by === val.id}
                      direction={sortState.by === val.id ? sortState.dir : undefined}
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      onClick={() => onSortClick(val.id, val.sort!)}
                    >
                      {val.label}
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell
                    key={i}
                    width={val.width}
                    sx={{minWidth: val.minWidth}}
                  >
                    {val.label}
                  </TableCell>
                )
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.filter(row => rowFilter(row)).map((value, i) => (
              <CustomTableRow key={i} isEnable={calcIsRetireNow(today, value.retire)}>
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
                  {(() => {
                    const diff = calcDiffDate(today, value.dateOfBirth);
                    return diff.year;
                  })()}
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
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProfileTable;
