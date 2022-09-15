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

const URI = 'http://192.168.11.139:4001/api/procesos/forms';

export const FormReparar = () => {
  const [obser, setObser] = useState({ campo: '', valido: null });
  const [repara, setRepara] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const { date, hour } = useDate();
  const { tabla, id } = useParams();

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    observ: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
    repara: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
  };
  console.log(tabla);
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('_________Formulario Reparar_______________');

    console.log(date);
    console.log(hour);
    console.log(repara.campo);

    if (obser.valido === 'true' && repara.valido === 'true') {
      setFormValidate(true);

      await axios.put(URI + tabla + '/' + id, {
        repara: repara.campo,
        observacionesReparar: obser.campo,
        fechaReparado: date,
        horaReparado: hour,
        estado: 'reparado',
      });
      setObser({ campo: '', valido: null });
      setRepara({ campo: '', valido: null });

      await timeout(2000);

      if (tabla === 'ordenMatriceria') {
        navigate('/CompTableMatriceria');
      } else {
        navigate('/CompTableInyectoras');
      }
    } else {
      setFormValidate(false);
    }
  };

  return (
    <>
      <Formulario action='' onSubmit={onSubmit}>
        <h1>Formulario Reparacion</h1>
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
          InputState={repara}
          InputSetState={setRepara}
          inputType='text'
          inputLabel='Quien repara'
          inputPlaceholder='Diego Garcia'
          inputName='repara'
          inputError='El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.repara}
        />

        <CompInput
          InputState={obser}
          InputSetState={setObser}
          inputType='text'
          inputLabel='Observacion'
          inputPlaceholder='Observacion a tener en cuenta'
          inputName='recibe'
          inputError='La observacion a tener en cuenta tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo.'
          inputExp={expresiones.observ}
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
          <Boton type='submit'>Reparado</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
