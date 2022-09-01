import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Formulario,
  Label,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  MensajeExito,
  GroupInputDate,
  InputDate,
  BotonInicio,
} from '../elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CompInput from '../Components/CompInput';
import dayjs from 'dayjs';
import { CompTableInyectoras } from '../Components/CompTableInyectoras';

const FormCreateInyectoras = () => {
  const [seconds, setSeconds] = useState(0);
  const [maquinas, setMaquinas] = useState({ campo: '', valido: null });
  const [name, setName] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    maquinas: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,
    lider: /^[a-zA-ZÀ-ÿ\s]{4,16}$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
  };

  dayjs.locale('es');
  const date = dayjs().format('DD/MM/YYYY');
  const hour = dayjs().format('HH:mm');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('_________Formulario Crear Inyectoras_______________');

    const dataJson = JSON.stringify({
      Maquinas: maquinas.campo,
      Lider: name.campo,
      Mensaje: message.campo,
    });

    console.log(dataJson);

    console.log(date);
    console.log(hour);
    console.log(maquinas.campo);
    console.log(name.campo);
    console.log(message.campo);

    if (
      maquinas.valido === 'true' &&
      name.valido === 'true' &&
      message.valido === 'true'
    ) {
      setFormValidate(true);
      setMaquinas({ campo: '', valido: '' });
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
      <Formulario action='' onSubmit={onSubmit}>
        <GroupInputDate>
          <div>
            <Label>Fecha</Label>
            <InputDate type='text' value={date} disabled />
          </div>

          <div>
            <Label>Hora</Label>
            <InputDate type='text' value={hour} disabled />
          </div>
        </GroupInputDate>

        <CompInput
          InputState={maquinas}
          InputSetState={setMaquinas}
          inputType='text'
          inputLabel='Maquinas'
          inputPlaceholder='MAM060'
          inputName='molde'
          inputError='El nombre de la maquina tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.'
          inputExp={expresiones.maquinas}
        />
        <CompInput
          InputState={name}
          InputSetState={setName}
          inputType='text'
          inputLabel='Lider a cargo de la maquina'
          inputPlaceholder='Julian Lopez'
          inputName='name'
          inputError='El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.lider}
        />

        <CompInput
          InputState={message}
          InputSetState={setMessage}
          inputType='text'
          inputLabel='F0-07-02-32 - Sector Mantenimiento de Inyectoras - Descripcion de rotura/problema:'
          inputPlaceholder='Se quedo perno'
          inputName='message'
          inputError='La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.mensaje}
        />

        {formValidate === false && (
          <MensajeError>
            <span>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Por favor rellene el formulario correctamente.
            </span>
          </MensajeError>
        )}
        {formValidate === true && (
          <MensajeExito>
            <span>
              <FontAwesomeIcon icon={faCheck} />
              <b>Exito:</b> Formulario enviado exitosamente!
            </span>
          </MensajeExito>
        )}

        <ContenedorBotonCentrado>
          <Link to='/'>
            <BotonInicio type='submit'>Cancelar</BotonInicio>
          </Link>
          <Boton type='submit'>Enviar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>

      <CompTableInyectoras />
    </>
  );
};

export default FormCreateInyectoras;
