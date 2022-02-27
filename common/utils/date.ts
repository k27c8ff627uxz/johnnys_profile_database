
export function dateToString(d: Date, separator = '/') {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}${separator}${month}${separator}${day}`;
}
