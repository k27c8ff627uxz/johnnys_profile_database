import { useSearchParams } from 'react-router-dom';
import literals from 'utils/literals';

export function getToday() {
  const searchParams = useSearchParams()[0];

  const paramToday = searchParams.get(literals.queryParam.today);
  if (!paramToday) {
    return new Date();
  }

  return new Date(paramToday);
}
