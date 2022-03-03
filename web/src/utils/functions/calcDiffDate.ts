
export type CalcDiffDateResult = {
  year: number;
  month: number;
  day: number;
}

function getNumOfDay(month: number, year: number) {
  switch (month) {
  case 0: return 31;
  case 1: return 31;
  case 2: {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return 29;
      }
      return 28;
    }
    if (year % 4 === 0) {
      return 29;
    }
    return 28;
  }
  case 3: return 31;
  case 4: return 30;
  case 5: return 31;
  case 6: return 30;
  case 7: return 31;
  case 8: return 31;
  case 9: return 30;
  case 10: return 31;
  case 11: return 31;
  default: throw new Error('Unknown');
  }
}

export function calcDiffDate(date1: Date, date2: Date): CalcDiffDateResult {

  const result1 = {
    year: date1.getFullYear() - date2.getFullYear(),
    month: date1.getMonth() - date2.getMonth(),
    day: date1.getDate() - date2.getDate(),
  };

  const result2 = (0 <= result1.day) ? result1 : {
    year: result1.year,
    month: result1.month - 1,
    day: getNumOfDay(date1.getMonth(), date1.getFullYear()) + result1.day,
  };

  const result3 = (0 <= result2.month) ? result2 : {
    year: result2.year - 1,
    month: result2.month + 12,
    day: result2.day,
  };

  return result3;
}
