import { UncertainDate } from 'common/types/UncertainDate';
import { dateToUncertainDate } from 'common/utils/date';
import sortUncertainDate from './sortUncertainDate';

export type DuringSpanResult = 'notStart' | 'during' | 'over';

// TODO: test
export default function calcDuringSpan(start: UncertainDate, today: Date, end?: UncertainDate): DuringSpanResult {

  // 開始されてるか確認
  if (sortUncertainDate('desc', start, dateToUncertainDate(today)) < 0) {
    return 'notStart';
  }

  if (end === undefined) {
    return 'during';
  }

  // 過ぎているか確認
  if (sortUncertainDate('desc', dateToUncertainDate(today), end) < 0) {
    return 'over';
  }

  return 'during';
}
