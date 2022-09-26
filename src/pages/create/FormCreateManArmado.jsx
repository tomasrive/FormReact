import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
} from '../../elements/Formularios';
import axios from 'axios';
import { CompDate, CompMessage, CompInput } from '../../Components'
import { useDate } from '../../elements/useDate';

const URI = 'http://localhost:3000/api/ordenArmado';

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export const FormCreateArmado = () => {
  const [, setSeconds] = useState(0);
  const [name, setName] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const { date, hour } = useDate();
  const data = sessionStorage.getItem('lider');

  const navigate = useNavigate();

  const expresiones = {
    problema: /^[a-zA-Z0-9À-ÿ\s]{3,200}$/,
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('_________Formulario Crear Edilicio_______________');

    const dataJson = JSON.stringify({
      Infraestructura: message.campo,
      Lider: name.campo,
    });

    console.log(dataJson);

    console.log(date);
    console.log(hour);
    console.log(name.campo);
    console.log(message.campo);

    if (message.valido === 'true') {
      setFormValidate(true);

      await axios.post(URI, {
        fecha: date,
        hora: hour,
        lider: data,
        descripcion: message.campo,
        recibe: '',
        repara: '',
        fechaFinal: '',
        horaFinal: '',
        estado: 'no-reparado',
      });
      setName({ campo: '', valido: null });
      setMessage({ campo: '', valido: null });

      await timeout(2000);
      navigate('/');
    } else {
      setFormValidate(false);
    }
  };

  return (
    <>
      <Formulario action="" onSubmit={onSubmit}>

        <CompDate date={date} hour={hour} />

        <CompInput
          InputState={data}
          inputType="text"
          inputLabel="Lider a cargo"
          inputName="name"
          inputDis="disable"
        />

        <CompInput
          InputState={message}
          InputSetState={setMessage}
          inputType="text"
          inputLabel="F0-07-02-32 - Sector Mantenimiento de Armado - Descripcion de rotura/problema:"
          inputPlaceholder="Descripcion de rotura/problema"
          inputName="message"
          inputError="La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios."
          inputExp={expresiones.problema}
        />

        <CompMessage verif={formValidate} />

        <ContenedorBotonCentrado>
          <Link to="/">
            <BotonInicio type="submit">Cancelar</BotonInicio>
          </Link>
          <Boton type="submit">Enviar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
