import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
} from '../../elements/Formularios';
import axios from 'axios';
import { useDate } from '../../elements/useDate';
import { CompMessage, CompInput, CompDate } from '../../Components';
import { CompConfirm } from '../../Components/CompConfirm';

const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export const FormCreateInyectoras = () => {
  const [maquinas, setMaquinas] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const { date, hour, dia, mes, year, hora, min } = useDate();
  const LiderUser = sessionStorage.getItem('LiderUser');
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    fechaCreado: '',
    horaCreado: '',
    maquinas: '',
    lider: '',
    descripcion: '',
    tabla: '',
  });

  const expresiones = {
    maquinas: /^[‎]$/,
    mensaje: /^[a-zA-Z0-9À-ÿ\s]{3,200}$/,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (maquinas.valido === 'true' && message.valido === 'true') {
      setStateModal(!stateModal);
      setDataModal({
        fechaCreado: date,
        horaCreado: hour,
        maquinas: maquinas.campo,
        lider: LiderUser,
        descripcion: message.campo,
        tabla: '/maquinas/',
      });
    } else {
      setFormValidate(false);
      console.log(formValidate);
    }
  };
  const sendData = async () => {
    console.log('Se mando correctamente');
    setStateModal(!stateModal);
    setFormValidate(true);
    await axios.post(URI, {
      id: maquinas.campo + year + mes + dia + hora + min,
      tabla: '/maquinas/',
      fechaCreado: date,
      horaCreado: hour,
      maquinas: maquinas.campo,
      lider: LiderUser,
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
      verifica: '',
      observacionesVerificar: '',

      estado: 'creado',
    });

    setMaquinas({ campo: '', valido: '' });
    setMessage({ campo: '', valido: null });

    await timeout(2000);
    window.location.replace('/');
  };

  return (
    <>
      <CompConfirm
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
        send={sendData}
      />

      <Formulario action='' onSubmit={onSubmit}>
        <CompDate date={date} hour={hour} />

        <CompInput
          InputState={maquinas}
          InputSetState={setMaquinas}
          inputType='text'
          inputLabel='Maquinas'
          inputPlaceholder='Nombre de maquina'
          inputName='mayus'
          inputError='Elige una de las opciones desplegadas'
          inputExp={expresiones.maquinas}
          inputAutocomplete='autocomplete'
        />

        <CompInput
          InputState={LiderUser}
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

        <CompMessage verif={formValidate} />

        <ContenedorBotonCentrado>
          <Link to='/CompTableInyectoras'>
            <BotonInicio type='submit'>Cancelar</BotonInicio>
          </Link>
          <Boton type='submit'>
            Enviar
          </Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
