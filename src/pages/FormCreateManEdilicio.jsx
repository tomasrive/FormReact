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
import { CompTableEdilicio } from '../Components/CompTableEdilicio';

const FormCreateEdilicio = () => {
  const [seconds, setSeconds] = useState(0);
  const [infra, setInfra] = useState({ campo: '', valido: null });
  const [name, setName] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const expresiones = {
    infraestructura: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,
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

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('_________Formulario Crear Edilicio_______________');

    const dataJson = JSON.stringify({
      Infraestructura: infra.campo,
      Lider: name.campo,
      Mensaje: message.campo,
    });

    console.log(dataJson);


    console.log(date);
    console.log(hour);
    console.log(infra.campo);
    console.log(name.campo);
    console.log(message.campo);

    if (
      infra.valido === 'true' &&
      name.valido === 'true' &&
      message.valido === 'true'
    ) {
      setFormValidate(true);
      setInfra({ campo: '', valido: '' });
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
          InputState={infra}
          InputSetState={setInfra}
          inputType="text"
          inputLabel="Infraestructura"
          inputPlaceholder="MAM060"
          inputName="infraestructura"
          inputError="El nombre de la infraestructura tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
          inputExp={expresiones.infraestructura}
        />
        <CompInput
          InputState={name}
          InputSetState={setName}
          inputType="text"
          inputLabel="Lider a cargo"
          inputPlaceholder="Julian Lopez"
          inputName="name"
          inputError="El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios."
          inputExp={expresiones.lider}
        />

        <CompInput
          InputState={message}
          InputSetState={setMessage}
          inputType="text"
          inputLabel="F0-07-02-32 - Sector Mantenimiento de Edilicio - Descripcion de rotura/problema:"
          inputPlaceholder="Se quedo perno"
          inputName="message"
          inputError="La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios."
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
          <Link to="/">
            <BotonInicio type="submit">Cancelar</BotonInicio>
          </Link>
          <Boton type="submit">Enviar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>

      <CompTableEdilicio />
    </>
  );
};

export default FormCreateEdilicio;
