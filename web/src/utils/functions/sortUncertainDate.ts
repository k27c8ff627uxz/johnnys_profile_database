import { UncertainDate } from 'common/types/UncertainDate';
import { SortDir } from 'utils/types';

export default function sortUncertainDate(dir: SortDir, date1: UncertainDate, date2: UncertainDate) {
  const sign = dir === 'asc' ? -1 : 1;

  // 年で比較
  {
    if ('year' in date1 && 'year' in date2) {
      if (date1.year < date2.year) {
        return sign;
      }
      if (date2.year < date1.year) {
        return -sign;
      }

    // date2が年が不明
    } else if(('year' in date1) && !('year' in date2) ) {
      return -1;
  
    // date1が年が不明
    } else if(!('year' in date1) && ('year' in date2)) {
      return 1;
    }
  }

  // 月で比較
  {
    if ('month' in date1 && 'month' in date2) {
      if (date1.month < date2.month) {
        return sign;
      }
      if (date2.month < date1.month) {
        return -sign;
      }
    
    // date2が月が不明
    } else if(('momth' in date1) && !('month' in date2) ) {
      return -1;

    // date1が月が不明
    } else if(!('month' in date1) && ('month' in date2)) {
      return 1;
    }
  }

  // 日で比較
  {
    if ('day' in date1 && 'day' in date2) {
      if (date1.day < date2.day) {
        return sign;
      }
      if (date2.day < date1.day) {
        return -sign;
      }
    
    // date2が日が不明
    } else if(('day' in date1) && !('day' in date2) ) {
      return -1;

    // date1が日が不明
    } else if(!('day' in date1) && ('day' in date2)) {
      return 1;
    }
  }

  return 0;
}
