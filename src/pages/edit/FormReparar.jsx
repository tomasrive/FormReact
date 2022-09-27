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

export const FormReparar = () => {
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
          observacionesVerificar: '',
          estado: 'reparado',
        });
        return;
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
          observacionesVerificar: '',
          estado: 'reparado',
        });
      }

      setObser({ campo: '', valido: null });

      await timeout(2000);

      if (tabla === 'moldes') {
        navigate('/CompTableInyectoras');
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
          inputLabel='Observacion'
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
    </>
  );
};
