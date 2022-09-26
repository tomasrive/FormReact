import { useEffect, useState } from 'react';
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
} from '../../elements/Formularios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate } from '../../elements/useDate';
import { CompDate, CompInput, CompMessage } from '../../Components';

const URI = 'http://192.168.11.139:4001/api/procesos/forms';

export const FormVerificado = () => {
  const [obser, setObser] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);
  const [dataRes, setDataRes] = useState([]);
  const { tabla, id } = useParams();
  const { date, hour } = useDate();
  const navigate = useNavigate();
  const LiderUser = sessionStorage.getItem('LiderUser');

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    a();
  });

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
          fechaReparado: dataRes.fechaReparado,
          horaReparado: dataRes.horaReparado,
          repara: dataRes.repara,
          observacionesReparar: dataRes.observacionesReparar,
          fechaVerificado: date,
          horaVerificado: hour,
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
          observacionesVerificar: obser.campo,
          estado: 'verificado',
        });
      }

      setObser({ campo: '', valido: null });
      await timeout(2000);

      if (tabla === 'moldes') {
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
        <h1>Formulario Verificacion</h1>
        <CompDate date={date} hour={hour} />

        <CompInput
          InputState={LiderUser}
          inputType='text'
          inputLabel='Persona que lo verifica'
          inputName='name'
          inputDis='disable'
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

        <CompMessage verif={formValidate} />

        <ContenedorBotonCentrado>
          <Link to='/'>
            <BotonInicio type='submit'>Denegar</BotonInicio>
          </Link>
          <Boton type='submit'>Verificado</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </>
  );
};
