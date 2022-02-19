import { UncertainDate } from 'common/types/UncertainDate';

export interface RowItem {
  id: string;
  name: string;
  furigana: string;
  dateOfBirth: Date;
  bloodType: string;
  enter: UncertainDate;
  retire?: UncertainDate;
}

export interface ColData {
  id: string;
  label: string;
  width?: number | string;
}
