import { UncertainDate } from 'common/types/UncertainDate';
import { SortDir, BloodType } from 'utils/types';

export interface RowItem {
  id: string;
  name: string;
  furigana: string;
  dateOfBirth: Date;
  bloodType?: BloodType;
  enter: UncertainDate;
  retire?: UncertainDate;
}

export interface ColData {
  id: string;
  label: string;
  render: (row: RowItem) => React.ReactNode;
  width?: number | string;
  minWidth?: number | string;
  sort?: (dir : SortDir) => (item1: RowItem, item2: RowItem) => number;
}
