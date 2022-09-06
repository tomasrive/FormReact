import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const URI = 'http://localhost:3000/api/ordenMatriceria/';

export const useDate = () => {
  const [, setSeconds] = useState(0);
  const { id } = useParams();

  dayjs.locale('es');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  const date = dayjs().format('DD/MM/YYYY');
  const hour = dayjs().format('HH:mm:ss');

  const setDate = async () => {
    await axios.put(URI + id, {
      fechaVisualizado: date,
      horaVisualizado: hour,
      estado: 'verificado',
    });
  };

  return { date, hour, setDate };
};
