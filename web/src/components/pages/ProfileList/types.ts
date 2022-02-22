import { UncertainDate } from 'common/types/UncertainDate';
import { SortDir } from 'utils/types';

export interface RowItem {
  id: string;
  name: string;
  furigana: string;
  dateOfBirth: Date;
  bloodType: 'A' | 'B' | 'O' | 'AB';
  enter: UncertainDate;
  retire?: UncertainDate;
}

export interface ColData {
  id: string;
  label: string;
  width?: number | string;
  sort?: (dir : SortDir) => (item1: RowItem, item2: RowItem) => number;
}
