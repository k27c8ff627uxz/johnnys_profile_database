import sortUncertainDate from '../sortUncertainDate';
import { UncertainDate } from 'common/types/UncertainDate';

describe('sortUncertainDate', () => {

  const date220302: UncertainDate = {
    type: 'exact',
    year: 2022,
    month: 3,
    day: 2,
  };
  
  const date220401: UncertainDate = {
    type: 'exact',
    year: 2022,
    month: 4,
    day: 1,
  };

  const date2203: UncertainDate = {
    type: 'year_month_only',
    year: 2022,
    month: 3,
  };

  test('certain case', () => {
    expect(sortUncertainDate('asc', date220302, date220401) < 0).toBeTruthy();
    expect(sortUncertainDate('desc', date220302, date220401) > 0).toBeTruthy();
    expect(sortUncertainDate('asc', date220401, date220302) > 0).toBeTruthy();
    expect(sortUncertainDate('desc', date220401, date220302) < 0).toBeTruthy();
  });

  test('year_month_only', () => {
    expect(sortUncertainDate('asc', date220302, date2203) < 0).toBeTruthy();
    expect(sortUncertainDate('desc', date220302, date2203) < 0).toBeTruthy();
    expect(sortUncertainDate('asc', date220401, date2203) > 0).toBeTruthy();
    expect(sortUncertainDate('desc', date220401, date2203) < 0).toBeTruthy();
  });

  // TODO: Add More Test Case
});
