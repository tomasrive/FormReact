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
} from '../../elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CompInput from '../../Components/CompInput';
import dayjs from 'dayjs';

const URI = 'http://192.168.11.139:4001/api/armado/users';

const FormCreateArmado = () => {
  const [seconds, setSeconds] = useState(0);
  const [name, setName] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    lider: /^[a-zA-ZÀ-ÿ\s]{4,16}$/,
    problema: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
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

  fetch(URI)
    .then((response) => response.json())
    .then((data) => datos(data));



  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('_________Formulario Crear Armado_______________');

    const dataJson = JSON.stringify({
      Lider: name.campo,
      Mensaje: message.campo,
    });

    console.log(dataJson);

    console.log(date);
    console.log(hour);
    console.log(name.campo);
    console.log(message.campo);

    if (name.valido === 'true' && message.valido === 'true') {
      setFormValidate(true);
      setName({ campo: '', valido: null });
      setMessage({ campo: '', valido: null });

      await timeout(2000);
      navigate('/');
    } else {
      setFormValidate(false);
    }
  };


  const datos = (data) => {
    data.map((dato) => {
      console.log(dato);


      
    });
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
          InputState={name}
          InputSetState={setName}
          inputType='text'
          inputLabel='Lider a cargo'
          inputPlaceholder='Julian Lopez'
          inputName='name'
          inputError='El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.lider}
        />

        <CompInput
          InputState={message}
          InputSetState={setMessage}
          inputType='text'
          inputLabel='F0-07-02-32 - Sector Mantenimiento de Armado - Descripcion de rotura/problema:'
          inputPlaceholder='Se quedo perno'
          inputName='message'
          inputError='La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.problema}
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

    </>
  );
};

export default FormCreateArmado;
