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
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CompInput from '../../Components/CompInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate } from '../../Components/useDate';

const URI = 'http://192.168.11.139:4001/api/procesos/forms';

const URL = require('../../elements/dataMatriceria.json')


export const FormVisualizar = () => {
  const [formValidate, setFormValidate] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();

  const navigate = useNavigate();

  const LiderUser = sessionStorage.getItem('LiderUser');

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const { date, hour } = useDate();


  useEffect(() => {
    a();
  }, []);

  // const a = async () => {
  //   const res = await axios.get(URI + '/' + tabla);
  // const result = dataRes.filter((word) => word.id === id);
  //   setDataRes(res.data);
  // };

  const IDID = '6456456456'
  const a = () => {
    const result = URL.filter((idDB) => idDB.id === IDID);
    setDataRes(result[0])
  }



  const onSubmit = async (e) => {
    e.preventDefault();

    setFormValidate(true);
    await axios.put(
      URI + '/' + tabla,
      {
        id: id,
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
        observacionesVerificar: '',
        estado: 'visualizado'
      }

      // const res = await axios.get(URI + '/' + tabla);
      // setData(res.data);

      // data.map(
      //   async (dataTable) =>
      //     await axios.put(URI + '/' + tabla, {
      //       id: id,
      //       tabla: tabla,
      //       fechaCreado: dataTable.fechaCreado,
      //       horaCreado: dataTable.horaCreado,
      //       maquinas: dataTable.maquinas,
      //       lider: dataTable.lider,
      //       descripcion: dataTable.descripcion,
      //       fechaVisualizado: date,
      //       horaVisualizado: hour,
      //       recibe: LiderUser,
      //       fechaReparado: dataTable.fechaReparado,
      //       horaReparado: dataTable.horaReparado,
      //       repara: dataTable.repara,
      //       observacionesReparar: dataTable.observacionesReparar,
      //       fechaVerificado: dataTable.fechaVerificado,
      //       horaVerificado: dataTable.horaVerificado,
      //       observacionesVerificar: dataTable.observacionesVerificar,
      //       estado: 'visualizado',
      //     })
    );

    await timeout(2000);

    if (tabla === 'ordenMatriceria') {
      navigate('/CompTableMatriceria');
    } else {
      navigate('/CompTableInyectoras');
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
          InputState={LiderUser}
          inputType='text'
          inputLabel='Lider a cargo'
          inputName='name'
          inputDis='disable'
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
          <Boton type='submit'>Visualizado</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
