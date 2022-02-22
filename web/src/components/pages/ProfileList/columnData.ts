import sortUncertainDate from 'utils/functions/sortUncertainDate';
import { SortDir } from 'utils/types';
import { ColData } from './types';

export function columnData(editable: boolean): ColData[] {

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
      id: 'name',
      label: '名前',
      sort: (dir) => (item1, item2) => {
        return compareString(dir)(item1.name, item2.name);
      },
    }, {
      id: 'furigana',
      label: 'ふりがな',
      sort: (dir) => (item1, item2) => {
        return compareString(dir)(item1.furigana, item2.furigana);
      },
    }, {
      id: 'dateOfBirth',
      label: '生年月日',
      sort: (dir) => (item1, item2) => {
        return compareDate(dir)(item1.dateOfBirth, item2.dateOfBirth);
      },
    }, {
      id: 'bloodType',
      label: '血液型',
      sort: (dir) => (item1, item2) => {
        const blood2number = (type: 'A' | 'B' | 'O' | 'AB') => {
          switch(type) {
          case 'A': return 1;
          case 'B': return 2;
          case 'O': return 3;
          case 'AB': return 4;
          }
        };
        return (dir === 'asc' ? 1 : -1) * (blood2number(item1.bloodType) - blood2number(item2.bloodType));
      },
    }, {
      id: 'entire',
      label: '入所日',
      sort: (dir) => (item1, item2) => sortUncertainDate(dir, item1.enter, item2.enter),
    }, {
      id: 'retire',
      label: '退所日',
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
    },
  ];

  if (editable) {
    return [
      {
        id: 'edit',
        label: '',
        width: 2,
      },
      ...baseColData,
    ];
  } else {
    return baseColData;
  }
}
