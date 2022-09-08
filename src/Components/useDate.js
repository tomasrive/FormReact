import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const useDate = () => {
  const [, setSeconds] = useState(0);

  dayjs.locale('es');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  const date = dayjs().format('DD/MM/YYYY');
  const hour = dayjs().format('HH:mm');

  return { date, hour };
};
