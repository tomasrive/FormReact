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

export const FormReparar = () => {
  const [obser, setObser] = useState({ campo: '', valido: null });
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

  const expresiones = {
    observ: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (obser.valido === 'true') {
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
          fechaVisualizado: dataRes.fechaVisualizado,
          horaVisualizado: dataRes.horaVisualizado,
          recibe: dataRes.recibe,
          fechaReparado: date,
          horaReparado: hour,
          repara: LiderUser,
          observacionesReparar: obser.campo,
          fechaVerificado: '',
          horaVerificado: '',
          verifica: '',
          observacionesVerificar: '',
          estado: 'reparado',
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
          fechaVisualizado: dataRes.fechaVisualizado,
          horaVisualizado: dataRes.horaVisualizado,
          recibe: dataRes.recibe,
          fechaReparado: date,
          horaReparado: hour,
          repara: LiderUser,
          observacionesReparar: obser.campo,
          fechaVerificado: '',
          horaVerificado: '',
          verifica: '',
          observacionesVerificar: '',
          estado: 'reparado',
        });
      }

      setObser({ campo: '', valido: null });

      await timeout(2000);

      if (tabla === 'moldes') {
        window.location.replace('/CompTableMatriceria');
      } else {
        window.location.replace('/CompTableInyectoras');
      }
    } else {
      setFormValidate(false);
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
                <h3>MAQUINAS</h3>
                <h5>{dataRes.maquinas}</h5>
                <h3>FECHA VISUALIZADO</h3>
                <h5>{dataRes.fechaVisualizado}</h5>
                <h3>RECIBE</h3>
                <h5>{dataRes.recibe}</h5>
              </div>
              <div>
                <h3>HORA CREADO</h3>
                <h5>{dataRes.horaCreado}</h5>
                <h3>LIDER</h3>
                <h5>{dataRes.lider}</h5>
                <h3>HORA VISUALIZADO</h3>
                <h5>{dataRes.horaVisualizado}</h5>
                <h3>DESCRIPCION</h3>
                <h5>{dataRes.descripcion}</h5>
              </div>
            </div>
          </div>
          <h3>ESTADO</h3>
          <H5 validate={dataRes.estado}>{dataRes.estado}</H5>
        </section>
        <Formulario action='' onSubmit={onSubmit}>
          <h1>Pieza "{id}" (REPARACION)</h1>

          <CompDate date={date} hour={hour} />

          <CompInput
            InputState={LiderUser}
            inputType='text'
            inputLabel='Quien repara'
            inputName='name'
            inputDis='disable'
          />

          <CompInput
            InputState={obser}
            InputSetState={setObser}
            inputType='text'
            inputLabel='Observacion(REPARADO)'
            inputPlaceholder='Observacion a tener en cuenta'
            inputName='recibe'
            inputError='La observacion a tener en cuenta tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo.'
            inputExp={expresiones.observ}
          />

          <CompMessage verif={formValidate} />

          <ContenedorBotonCentrado>
            <Link to='/'>
              <BotonInicio type='submit'>Cancelar</BotonInicio>
            </Link>
            <Boton type='submit'>Reparado</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
