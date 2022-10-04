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
import { CompDate, CompMessage, CompInput,CompConfirm } from '../../Components';

const URI = 'http://192.168.11.139:4001/api/procesos/forms/moldes';

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export const FormCreateMatriceria = () => {
  const [molde, setMolde] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const { date, hour, dia, mes, year, hora, min } = useDate();
  const LiderUser = sessionStorage.getItem('LiderUser');
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    fechaCreado: '',
    horaCreado: '',
    molde: '',
    lider: '',
    descripcion: '',
    tabla: '',
  });

  const expresiones = {
    molde: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,
    mensaje: /^[a-zA-Z0-9À-ÿ\s]{3,200}$/,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (molde.valido === 'true' && message.valido === 'true') {
      setStateModal(!stateModal);
      setDataModal({
        fechaCreado: date,
        horaCreado: hour,
        molde: molde.campo,
        lider: LiderUser,
        descripcion: message.campo,
        tabla: 'moldes',
      });
    } else {
      setFormValidate(false);
    }
  };

  const sendData = async () => {
    console.log('Se mando correctamente');
    setStateModal(!stateModal);
    setFormValidate(true);
    await axios.post(URI, {
      id: molde.campo + year + mes + dia + hora + min,
      tabla: 'moldes',
      fechaCreado: date,
      horaCreado: hour,
      molde: molde.campo,
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

    setMolde({ campo: '', valido: '' });
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
          InputState={molde}
          InputSetState={setMolde}
          inputType='text'
          inputLabel='Molde u otros perifericos'
          inputPlaceholder='Nombre de molde'
          inputName='mayus'
          inputError='El nombre de molde tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.'
          inputExp={expresiones.molde}
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
          inputLabel='F0-07-02-32 - Sector Matriceria - Descripcion de rotura/problema:'
          inputPlaceholder='Descripcion de rotura/problema'
          inputName='message'
          inputError='La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios.'
          inputExp={expresiones.mensaje}
        />

        <CompMessage verif={formValidate} />

        <ContenedorBotonCentrado>
          <Link to='/CompTableMatriceria'>
            <BotonInicio type='submit'>Cancelar</BotonInicio>
          </Link>
          <Boton type='submit'>Enviar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
