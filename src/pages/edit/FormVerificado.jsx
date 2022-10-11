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
    observ: /^[a-zA-Z0-9À-ÿ\s^.,]{3,150}$/,
    mensaje: /^[a-zA-Z0-9À-ÿ\s^.,]{3,150}$/,
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = {
      id: id,
      tabla: tabla,
      fechaCreado: dataRes.fechaCreado,
      horaCreado: dataRes.horaCreado,
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
      categoria: dataRes.categoria
    };

    if (obser.valido === 'true') {
      setFormValidate(true);
      if (tabla === 'moldes') {
        data.molde = dataRes.moldes;
        await axios.put(URI + '/' + tabla, data);
      } else {
        data.maquina = dataRes.maquinas;
        await axios.put(URI + '/' + tabla, data);
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
    let data = {
      id: id,
      tabla: tabla,
      fechaCreado: dataRes.fechaCreado,
      horaCreado: dataRes.horaCreado,
      lider: dataRes.lider,
      descripcion: dataRes.descripcion,

      primeraFechaVisualizado: dataRes.fechaVisualizado,
      primeraHoraVisualizado: dataRes.horaVisualizado,
      primerRecibe: dataRes.recibe,
      primeraFechaReparado: dataRes.fechaReparado,
      primeraHoraReparado: dataRes.horaReparado,
      primerRepara: dataRes.repara,
      primerObservacionesReparar: dataRes.observacionesReparar,

      primeraFechaDenegado: date,
      primeraHoraDenegado: hour,
      primerLiderDenegado: LiderUser,
      primerMotivoDenegado: denegar.campo,

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
      categoria: dataRes.categoria
    };

    if (denegar.valido === 'true') {
      if (dataRes.primeraFechaDenegado) {
        data.primeraFechaDenegado = dataRes.primeraFechaDenegado;
        data.primeraHoraDenegado = dataRes.primeraHoraDenegado;
        data.primerLiderDenegado = dataRes.primerLiderDenegado;
        data.primerMotivoDenegado = dataRes.primerMotivoDenegado;

        data.primeraFechaVisualizado = dataRes.primeraFechaVisualizado;
        data.primeraHoraVisualizado = dataRes.primeraHoraVisualizado;
        data.primerRecibe = dataRes.primerRecibe;
        data.primeraFechaReparado = dataRes.primeraFechaReparado;
        data.primeraHoraReparado = dataRes.primeraHoraReparado;
        data.primerRepara = dataRes.primerRepara;
        data.primerObservacionesReparar = dataRes.primerObservacionesReparar;

        data.segundaFechaDenegado = date;
        data.segundaHoraDenegado = hour;
        data.segundoLiderDenegado = LiderUser;
        data.segundoMotivoDenegado = denegar.campo;

        data.segundaFechaVisualizado = dataRes.fechaVisualizado;
        data.segundaHoraVisualizado = dataRes.horaVisualizado;
        data.segundoRecibe = dataRes.recibe;
        data.segundaFechaReparado = dataRes.fechaReparado;
        data.segundaHoraReparado = dataRes.horaReparado;
        data.segundoRepara = dataRes.repara;
        data.segundoObservacionesReparar = dataRes.observacionesReparar;

        if (dataRes.segundaFechaDenegado) {
          data.primeraFechaDenegado = dataRes.fechaDenegado;
          data.primeraHoraDenegado = dataRes.horaDenegado;
          data.primerLiderDenegado = dataRes.liderDenegado;
          data.primerMotivoDenegado = dataRes.motivoDenegado;

          data.segundaFechaDenegado = dataRes.segundaFechaDenegado;
          data.segundaHoraDenegado = dataRes.segundaHoraDenegado;
          data.segundoLiderDenegado = dataRes.segundoLiderDenegado;
          data.segundoMotivoDenegado = dataRes.segundoMotivoDenegado;

          data.terceraFechaDenegado = date;
          data.terceraHoraDenegado = hour;
          data.tercerLiderDenegado = LiderUser;
          data.tercerMotivoDenegado = denegar.campo;

          if (tabla === 'maquinas') {
            data.maquina = dataRes.maquinas;
            await axios.put(URI + '/' + tabla, data);
          } else {
            data.molde = dataRes.moldes;
            await axios.put(URI + '/' + tabla, data);
          }
        }

        if (tabla === 'maquinas') {
          data.maquina = dataRes.maquinas;
          await axios.put(URI + '/' + tabla, data);
        } else {
          data.molde = dataRes.moldes;
          await axios.put(URI + '/' + tabla, data);
        }
      } else {
        if (tabla === 'maquinas') {
          data.maquina = dataRes.maquinas;
          await axios.put(URI + '/' + tabla, data);
        } else {
          data.molde = dataRes.moldes;
          await axios.put(URI + '/' + tabla, data);
        }
      }

      setObser({ campo: '', valido: null });
      await timeout(2000);
      window.location.replace('/');
    } else {
      alert('Completar datos');
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

                <h3>LIDER QUE CREO LA ORDEN</h3>
                <h5>{dataRes.lider}</h5>
                <h3>PROBLEMA</h3>
                <h5>{dataRes.descripcion}</h5>
                <h3>FECHA VISUALIZADO</h3>
                <h5>{dataRes.fechaVisualizado}</h5>
              </div>
              <div>
                <h3>HORA VISUALIZADO</h3>
                <h5>{dataRes.horaVisualizado}</h5>
                <h3>QUIEN RECIBIO LA ORDEN</h3>
                <h5>{dataRes.recibe}</h5>
                <h3>FECHA REPARADO</h3>
                <h5>{dataRes.fechaReparado}</h5>
                <h3>HORA REPARADO</h3>
                <h5>{dataRes.horaReparado}</h5>
                <h3>QUIEN REPARO LA ORDEN</h3>
                <h5>{dataRes.repara}</h5>
                <h3>OBSERVACIONES (REPARACION)</h3>
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
            inputLabel='Lider que verifica'
            inputName='name'
            inputDis='disable'
            mensaje={expresiones.mensaje}
          />

          <CompInput
            InputState={obser}
            InputSetState={setObser}
            inputType='text'
            inputLabel='Observacion (VERIFICADO)'
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
            <Boton onClick={ordenDenegada} validate={'denied'}>
              Denegar
            </Boton>
            <Boton type='submit' validate='valid'>
              Verificado
            </Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </Grid>
    </>
  );
};
