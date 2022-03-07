import React from 'react';
import {
  IconButton,
} from '@mui/material';import { Edit as EditIcon } from '@mui/icons-material';
import { dateToString } from 'common/utils/date';
import { sortUncertainDate, getUncertainDate, calcDiffDate } from 'utils/functions';
import { SortDir, BloodType } from 'utils/types';
import { ColData } from './types';

// TODO: 引数を見直す
export function columnData(
  today: Date,
  onEdit: ((id: string) => void) | null,
): ColData[] {

  const compareString = (dir: SortDir) => (str1: string, str2: string) => {
    if (str1 < str2) {
      if (dir === 'asc') {
        return -1;
      } else {
        return 1;
      }
    }
    if (str2 < str1) {
      if (dir === 'asc') {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  };

  const compareDate = (dir: SortDir) => (date1: Date, date2: Date) => {
    if (date1 < date2) {
      if (dir === 'asc') {
        return -1;
      } else {
        return 1;
      }
    }
    if (date2 < date1) {
      if (dir === 'asc') {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  };

  const baseColData: ColData[] = [
    {
      id: 'edit',
      label: '',
      show: onEdit !== null,
      width: 2,
      render: (row) => (
        <IconButton color='primary' onClick={() => onEdit?.(row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      id: 'name',
      label: '名前',
      show: true,
      minWidth: 100,
      sort: (dir) => (item1, item2) => {
        return compareString(dir)(item1.name, item2.name);
      },
      render: (row) => <>{row.name}</>,
    }, {
      id: 'furigana',
      label: 'ふりがな',
      show: true,
      minWidth: 130,
      sort: (dir) => (item1, item2) => {
        return compareString(dir)(item1.furigana, item2.furigana);
      },
      render: (row) => <>{row.furigana}</>,
    }, {
      id: 'dateOfBirth',
      label: '生年月日',
      show: true,
      minWidth: 120,
      sort: (dir) => (item1, item2) => {
        return compareDate(dir)(item1.dateOfBirth, item2.dateOfBirth);
      },
      render: (row) => <>{dateToString(row.dateOfBirth)}</>,
    }, {
      id: 'age',
      label: '年齢',
      show: true,
      minWidth: 90,
      sort: (dir) => (item1, item2) => {
        return compareDate(dir)(item1.dateOfBirth, item2.dateOfBirth);
      },
      render: (row) => {
        const diff = calcDiffDate(today, row.dateOfBirth);
        return <>{diff.year}</>;
      },
    }, {
      id: 'bloodType',
      label: '血液型',
      show: true,
      minWidth: 110,
      sort: (dir) => (item1, item2) => {
        const blood2number = (type: BloodType) => {
          switch(type) {
          case 'A': return 1;
          case 'B': return 2;
          case 'O': return 3;
          case 'AB': return 4;
          }
        };
        return (dir === 'asc' ? 1 : -1) * (blood2number(item1.bloodType) - blood2number(item2.bloodType));
      },
      render: (row) => <>{row.bloodType}</>,
    }, {
      id: 'entire',
      label: '入所日',
      show: true,
      minWidth: 110,
      sort: (dir) => (item1, item2) => sortUncertainDate(dir, item1.enter, item2.enter),
      render: (row) => <>{getUncertainDate(row.enter)}</>,
    }, {
      id: 'retire',
      label: '退所日',
      show: true,
      minWidth: 110,
      sort: (dir) => (item1, item2) => {
        const sign = dir === 'asc' ? -1 : 1;
        if (!item1.retire && !item2.retire) {
          return 0;
        }
        if (item1.retire && !item2.retire) {
          return sign;
        }
        if (!item1.retire && item2.retire) {
          return -sign;
        }
        return sortUncertainDate(dir, item1.enter, item2.enter);
      },
      render: (row) => <>{row.retire === undefined ? '-' : getUncertainDate(row.retire)}</>,
    },
  ];

  return baseColData;
}
