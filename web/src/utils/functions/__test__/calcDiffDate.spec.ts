import { calcDiffDate } from '../calcDiffDate';

describe('diffDate', () => {
  test('calculate', () => {

    expect(calcDiffDate(new Date('2021/12/24'), new Date('2020/11/12'))).toMatchObject({
      year: 1,
      month: 1,
      day: 12,
    });
    expect(calcDiffDate(new Date('2021/7/7'), new Date('2021/3/23'))).toMatchObject({
      year: 0,
      month: 3,
      day: 14,
    });
    expect(calcDiffDate(new Date('2022/1/5'), new Date('2020/12/23'))).toMatchObject({
      year: 1,
      month: 0,
      day: 13,
    });
    expect(calcDiffDate(new Date('2022/3/5'), new Date('2020/4/5'))).toMatchObject({
      year: 1,
      month: 11,
      day: 0,
    });
    expect(calcDiffDate(new Date('2016/3/10'), new Date('2016/2/15'))).toMatchObject({
      year: 0,
      month: 0,
      day: 24,
    });
    expect(calcDiffDate(new Date('2017/3/10'), new Date('2017/2/15'))).toMatchObject({
      year: 0,
      month: 0,
      day: 23,
    });
    expect(calcDiffDate(new Date('2022/3/10'), new Date('2002/3/10'))).toMatchObject({
      year: 20,
      month: 0,
      day: 0,
    });
    expect(calcDiffDate(new Date('2022/3/9'), new Date('2002/3/10'))).toMatchObject({
      year: 19,
      month: 11,
      day: 27,
    });

  });
});
