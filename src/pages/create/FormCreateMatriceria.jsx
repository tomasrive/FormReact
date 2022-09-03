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
import axios from 'axios';

const URI = 'http://localhost:3000/api/ordenMatriceria';

const FormCreateMatriceria = () => {
  const [, setSeconds] = useState(0);
  const [molde, setMolde] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);

  const data = sessionStorage.getItem('lider');

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    molde: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,
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

    console.log('_________Formulario Crear Matriceria_______________');

    const dataJson = JSON.stringify({
      Molde: molde.campo,
      Lider: data,
      Mensaje: message.campo,
    });

    console.log(dataJson);

    if (molde.valido === 'true' && message.valido === 'true') {
      setFormValidate(true);

      await axios.post(URI, {
        fecha: date,
        hora: hour,
        molde: molde.campo,
        lider: data,
        descripcion: message.campo,
        recibe: '',
        repara: '',
        fechaFinal: '',
        horaFinal: '',
        estado: 'no-reparado',
      });

      setMolde({ campo: '', valido: '' });
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
        <GroupInputDate>
          <div>
            <Label>Fecha</Label>
            <InputDate type="text" value={date} disabled />
          </div>

          <div>
            <Label>Hora</Label>
            <InputDate type="text" value={hour} disabled />
          </div>
        </GroupInputDate>

        <CompInput
          InputState={molde}
          InputSetState={setMolde}
          inputType="text"
          inputLabel="Molde"
          inputPlaceholder="Nombre de molde"
          inputName="mayus"
          inputError="El nombre de molde tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
          inputExp={expresiones.molde}
        />

        <CompInput
          InputState={data}
          inputType="text"
          inputLabel="Lider a cargo del molde"
          inputName="name"
          inputError="El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios."
          inputDis="disable"
        />

        <CompInput
          InputState={message}
          InputSetState={setMessage}
          inputType="text"
          inputLabel="F0-07-02-32 - Sector Matriceria - Descripcion de rotura/problema:"
          inputPlaceholder="Descripcion de rotura/problema"
          inputName="message"
          inputError="La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios."
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
          <Link to="/">
            <BotonInicio type="submit">Cancelar</BotonInicio>
          </Link>
          <Boton type="submit">Enviar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};

export default FormCreateMatriceria;
