import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import axios from 'axios';
import { useDate } from '../../Components/useDate';

const URI = 'http://localhost:3000/api/ordenInyectoras';

const FormCreateInyectoras = () => {
  const [maquinas, setMaquinas] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);

  const data = sessionStorage.getItem('lider');

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    maquinas: /^$/,
    mensaje: /^[a-zA-Z0-9À-ÿ\s]{3,200}$/,
  };

  const { date, hour} = useDate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (maquinas.valido === 'true' && message.valido === 'true') {
      setFormValidate(true);

      await axios.post(URI, {
        tabla: '/ordenInyectoras/',
        fechaCreado: date,
        horaCreado: hour,
        maquinas: maquinas.campo,
        lider: data,
        descripcion: message.campo,

        fechaVisualizado: '',
        horaVisualizado: '',
        recibe: '',

        fechaReparado: '',
        horaReparado: '',
        repara: '',
        observacionesReparar: '',

        fechaVerificado: '',
        horaVerificado: '',
        observacionesVerificar: '',

        estado: 'creado',
      });
      setMaquinas({ campo: '', valido: '' });
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
          inputPlaceholder='Nombre de maquina'
          inputName='molde'
          inputError='Elige una de las opciones desplegadas'
          inputExp={expresiones.maquinas}
          inputAutocomplete='autocomplete'
        />

        <CompInput
          InputState={data}
          inputType='text'
          inputLabel='Lider a cargo'
          inputName='name'
          inputDis='disable'
        />

        <CompInput
          InputState={message}
          InputSetState={setMessage}
          inputType='text'
          inputLabel='F0-07-02-32 - Sector Mantenimiento de Inyectoras - Descripcion de rotura/problema:'
          inputPlaceholder='Descripcion de rotura/problema'
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
    </>
  );
};

export default FormCreateInyectoras;
