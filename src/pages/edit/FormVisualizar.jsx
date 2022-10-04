import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
  Grid,
  H5,
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const getData = async () => {
    const res = await axios.get(URI + '/' + tabla);
    console.log(res.data);
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
      <Grid>
        <section className='sectionh3h5'>
          <div className='contentGrid'>
            <div className='GRID'>
              <div>
                <h3>FECHA CREADO</h3>
                <h5>{dataRes.fechaCreado}</h5>

                <h3>LIDER</h3>
                <h5>{dataRes.lider}</h5>
              </div>
              <div>
                <h3>HORA CREADO</h3>
                <h5>{dataRes.horaCreado}</h5>

                {dataRes.tabla === 'moldes' ? (
                  <>
                    <h3>MOLDES</h3>
                    <h5>{dataRes.molde}</h5>
                  </>
                ) : (
                  <>
                    <h3>MAQUINAS</h3>
                    <h5>{dataRes.maquina}</h5>
                  </>
                )}
              </div>
            </div>
            <h3>DESCRIPCION</h3>
            <h5>{dataRes.descripcion}</h5>
          </div>
          <h3>ESTADO</h3>
          <H5 validate={dataRes.estado}>{dataRes.estado}</H5>
        </section>

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
            {dataRes.tabla === 'moldes' ? (
              <Link to='/CompTableMatriceria'>
                <BotonInicio type='submit'>Atras</BotonInicio>
              </Link>
            ) : (
              <Link to='/CompTableManInyectoras'>
                <BotonInicio type='submit'>Atras</BotonInicio>
              </Link>
            )}
            <Boton type='submit'>Visualizado</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
