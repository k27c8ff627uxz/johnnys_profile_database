import { useSearchParams } from 'react-router-dom';

export function getToday() {
  const searchParams = useSearchParams()[0];

  const paramToday = searchParams.get('today');
  if (!paramToday) {
    return new Date();
  }

  return new Date(paramToday);
}
