import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  H5,
  Grid,
  BotonInicio,
} from '../../elements/Formularios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate } from '../../elements/useDate';
import {
  CompDate,
  CompInput,
  CompMessage,
  CompDenegado,
} from '../../Components';

const URI = 'http://192.168.11.139:4001/api/procesos/forms';

export const FormVerificado = () => {
  const [obser, setObser] = useState({ campo: '', valido: null });
  const [denegar, setDenegar] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();
  const { date, hour } = useDate();
  const [stateModal, setStateModal] = useState(false);
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
    const result = res.data.filter((idDB) => idDB.id === id);
    setDataRes(result[0]);
  };

  const expresiones = {
    observ: /^[a-zA-ZÀ-ÿ\s]{3,150}$/,
    mensaje: /^[a-zA-Z0-9À-ÿ\s]{5,150}$/,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (obser.valido === 'true') {
      setFormValidate(true);
      if (tabla === 'moldes') {
        await axios.put(URI + '/' + tabla, {
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
          fechaReparado: dataRes.fechaReparado,
          horaReparado: dataRes.horaReparado,
          repara: dataRes.repara,
          observacionesReparar: dataRes.observacionesReparar,
          fechaVerificado: date,
          horaVerificado: hour,
          verifica: LiderUser,
          observacionesVerificar: obser.campo,
          estado: 'verificado',
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
          fechaReparado: dataRes.fechaReparado,
          horaReparado: dataRes.horaReparado,
          repara: dataRes.repara,
          observacionesReparar: dataRes.observacionesReparar,
          fechaVerificado: date,
          horaVerificado: hour,
          verifica: LiderUser,
          observacionesVerificar: obser.campo,
          estado: 'verificado',
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

  const ordenDenegada = (e) => {
    e.preventDefault();
    if (obser.valido !== 'true') {
      setStateModal(!stateModal);
    } else {
      alert('Debe borrar los datos para denegar la orden');
    }
  };

  const sendData = async () => {
    if (denegar.valido === 'true') {
      if (dataRes.fechaDenegado) {
        console.log('aasdasd');
      }
      if (tabla === 'maquinas') {
        await axios.put(URI + '/' + tabla, {
          id: id,
          tabla: 'maquinas',
          fechaCreado: dataRes.fechaCreado,
          horaCreado: dataRes.horaCreado,
          maquina: dataRes.maquinas,
          lider: dataRes.lider,
          descripcion: dataRes.descripcion,
          fechaDenegado: date,
          horaDenegado: hour,
          liderDenegado: LiderUser,
          motivoDenegado: denegar.campo,
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
      } else {
        await axios.put(URI + '/' + tabla, {
          id: id,
          tabla: 'moldes',
          fechaCreado: dataRes.fechaCreado,
          horaCreado: dataRes.horaCreado,
          molde: dataRes.moldes,
          lider: dataRes.lider,
          descripcion: dataRes.descripcion,
          fechaDenegado: date,
          horaDenegado: hour,
          liderDenegacion: LiderUser,
          motivoDenegacion: denegar.campo,
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
      }
      setObser({ campo: '', valido: null });
      await timeout(2000);
      window.location.replace('/');
    }
  };

  return (
    <>
      <CompDenegado
        state={stateModal}
        setState={setStateModal}
        denegar={denegar}
        setDenegar={setDenegar}
        send={sendData}
      />
      <Grid>
        <section className='sectionh3h5'>
          <div className='contentGrid'>
            <div className='GRID'>
              <div>
                <h3>FECHA CREADO</h3>
                <h5>{dataRes.fechaCreado}</h5>
                <h3>HORA CREADO</h3>
                <h5>{dataRes.horaCreado}</h5>

                {dataRes.tabla === 'moldes' ? (
                  <>
                    <h3>MOLDE</h3>
                    <h5>{dataRes.molde}</h5>
                  </>
                ) : (
                  <>
                    <h3>MAQUINA</h3>
                    <h5>{dataRes.maquina}</h5>
                  </>
                )}

                <h3>LIDER</h3>
                <h5>{dataRes.lider}</h5>
                <h3>DESCRIPCION</h3>
                <h5>{dataRes.descripcion}</h5>
                <h3>FECHA VISUALIZADO</h3>
                <h5>{dataRes.fechaVisualizado}</h5>
              </div>
              <div>
                <h3>HORA VISUALIZADO</h3>
                <h5>{dataRes.horaVisualizado}</h5>
                <h3>RECIBE</h3>
                <h5>{dataRes.recibe}</h5>
                <h3>FECHA REPARADO</h3>
                <h5>{dataRes.fechaReparado}</h5>
                <h3>HORA REPARADO</h3>
                <h5>{dataRes.horaReparado}</h5>
                <h3>REPARA</h3>
                <h5>{dataRes.repara}</h5>
                <h3>OBSERVACIONES(REPARADO)</h3>
                <h5>{dataRes.observacionesReparar}</h5>
              </div>
            </div>
          </div>
          <h3>ESTADO</h3>
          <H5 validate={dataRes.estado}>{dataRes.estado}</H5>
        </section>

        <Formulario action='' onSubmit={onSubmit}>
          <h1>Pieza "{id}" (VERIFICADA)</h1>
          <CompDate date={date} hour={hour} />

          <CompInput
            InputState={LiderUser}
            inputType='text'
            inputLabel='Persona que lo verifica'
            inputName='name'
            inputDis='disable'
            mensaje={expresiones.mensaje}
          />

          <CompInput
            InputState={obser}
            InputSetState={setObser}
            inputType='text'
            inputLabel='Observacion(VERIFICADO)'
            inputPlaceholder='Observacion a tener en cuenta'
            inputName='recibe'
            inputError='La observacion a tener en cuenta tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo.'
            inputExp={expresiones.observ}
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
            <Boton onClick={ordenDenegada}>Denegar</Boton>
            <Boton type='submit'>Verificado</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
