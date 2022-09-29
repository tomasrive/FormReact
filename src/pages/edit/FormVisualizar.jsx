import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
} from '../../elements/Formularios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate } from '../../elements/useDate';
import { CompDate, CompInput, CompMessage } from '../../Components';

const URI = 'http://192.168.11.139:4001/api/procesos/forms';

export const FormVisualizar = () => {
  const [formValidate, setFormValidate] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();
  const { date, hour } = useDate();
  const LiderUser = sessionStorage.getItem('LiderUser');

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    a();
    // eslint-disable-next-line
  }, []);

  const a = async () => {
    const res = await axios.get(URI + '/' + tabla);
    const result = res.data.filter((idDB) => idDB.id === id);
    setDataRes(result[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormValidate(true);
    if (tabla === 'moldes') {
      axios.put(URI + '/' + tabla, {
        id: id,
        tabla: tabla,
        fechaCreado: dataRes.fechaCreado,
        horaCreado: dataRes.horaCreado,
        molde: dataRes.molde,
        lider: dataRes.lider,
        descripcion: dataRes.descripcion,
        fechaVisualizado: date,
        horaVisualizado: hour,
        recibe: LiderUser,
        fechaReparado: '',
        horaReparado: '',
        repara: '',
        observacionesReparar: '',
        fechaVerificado: '',
        horaVerificado: '',
        verifica: '',
        observacionesVerificar: '',
        estado: 'visualizado',
      });
    } else {
      await axios.put(URI + '/' + tabla, {
        id: id,
        tabla: tabla,
        fechaCreado: dataRes.fechaCreado,
        horaCreado: dataRes.horaCreado,
        maquinas: dataRes.maquinas,
        lider: dataRes.lider,
        descripcion: dataRes.descripcion,
        fechaVisualizado: date,
        horaVisualizado: hour,
        recibe: LiderUser,
        fechaReparado: '',
        horaReparado: '',
        repara: '',
        observacionesReparar: '',
        fechaVerificado: '',
        horaVerificado: '',
        verifica: '',
        observacionesVerificar: '',
        estado: 'visualizado',
      });
    }

    await timeout(2000);

    if (tabla === 'moldes') {
      window.location.replace('/CompTableMatriceria');
    } else {
      window.location.replace('/CompTableInyectoras');
    }
  };

  return (
    <>
      <Formulario action='' onSubmit={onSubmit}>
        <h1>Pieza "{id}" (VISUALIZADA)</h1>

        <CompDate date={date} hour={hour} />

        <CompInput
          InputState={LiderUser}
          inputType='text'
          inputLabel='Lider a cargo'
          inputName='name'
          inputDis='disable'
        />

        <CompMessage verif={formValidate} />

        <ContenedorBotonCentrado>
          <Link to='/'>
            <BotonInicio type='submit'>Denegar</BotonInicio>
          </Link>
          <Boton type='submit'>Visualizado</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
