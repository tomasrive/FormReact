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
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CompInput from '../../Components/CompInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate } from '../../Components/useDate';

const URI = 'http://localhost:3000/api/';

export const FormVisualizar = () => {
  const [recibe, setRecibe] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const { tabla, id } = useParams();

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    recibe: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
  };

  const { date, hour } = useDate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (recibe.valido === 'true') {
      setFormValidate(true);

      await axios.put(URI + tabla + '/' + id, {
        fechaVisualizado: date,
        horaVisualizado: hour,
        recibe: recibe.campo,
        estado: 'visualizado',
      });
      setRecibe({ campo: '', valido: null });
      await timeout(2000);
      navigate('/CompTableInyectoras');
    } else {
      setFormValidate(false);
    }
  };

  return (
    <>
      <Formulario action='' onSubmit={onSubmit}>
        <h1>Formulario Visualizacion</h1>
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
          InputState={recibe}
          InputSetState={setRecibe}
          inputType='text'
          inputLabel='Quien lo visualiza'
          inputPlaceholder='Nombre'
          inputName='recibe'
          inputError='El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.recibe}
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
            <BotonInicio type='submit'>Denegar</BotonInicio>
          </Link>
          <Boton type='submit'>Verificar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
