import { useEffect, useState } from 'react';
import {
  BotonInicio,
  BotonInicioTabla,
  ContenedorBotonCentrado,
  ContenedorBotonInicio,
} from '../../elements/Formularios';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CompModal, CompRow } from '../../Components'

const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: '',
    tabla: '/maquinas/',
    fechaCreado: '',
    horaCreado: '',
    maquinas: '',
    lider: '',
    descripcion: '',
    fechaVisualizado: '',
    horaVisualizado: '',
    recibe: '',
    fechaReparado: '',
    horaReparado: '',
    repara: '',
    observacionesReparar: '',
    fechaVerificado: '',
    horaVerificado: '',
    observacionesVerificar: '',
    estado: '',
  });
  const LiderUser = sessionStorage.getItem('LiderUser');

  const modal = (dataTable) => {
    setStateModal(!stateModal);
    setDataModal(dataTable);
  };

  useEffect(() => {
    getBlogs();
    // setInterval(() => {
    //   window.location.reload();
    // }, 10000);
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setData(res.data);
  };

  data.sort((a, b) => {
    const verificadoA = a.fechaVerificado + a.horaVerificado;

    const verificadoB = b.fechaVerificado + b.horaVerificado;

    if (verificadoA < verificadoB) {
      return -1;
    }

    if (verificadoA > verificadoB) {
      return 1;
    }

    return 0;
  });

  return (
    <>
      <CompModal
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
      />

      <div className='txtColors'>
        <b>Colores:</b>
        <div className='colores'>
          <div className='coloresTable'>
            <div className='rojo'></div>
            <p>Creado</p>
            <div className='amarillo'></div>
            <p>Visualizado</p>
          </div>
          <div className='coloresTable'>
            <div className='verde'></div>
            <p>Reparado</p>
            <div className='azul'></div>
            <p>Verificado</p>
          </div>
        </div>
      </div>

      <ContenedorBotonCentrado>
        <Link to='/'>
          <BotonInicio type='submit'>Atras</BotonInicio>
        </Link>
      </ContenedorBotonCentrado>
      <div>
        <table className='table-fill'>
          <thead>
            <tr>
              <th>Fecha y hora creado</th>
              <th>Maquinas</th>
              <th>Lider a cargo:</th>
              <th>Descripcion:</th>
              <th>Fecha y hora visualizado</th>
              <th>Fecha y hora reparado</th>
              <th>Fecha y hora verificacion</th>
              <th>Opciones</th>
              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>{data.map((dataTable) => <CompRow dataTable={dataTable} liderSesion={LiderUser} modal={modal} />)}</tbody>
        </table>
      </div>
      <div className='noStyleDiv'>
        {LiderUser !== null && (
          <Link className='noStyle' to='/FormCreateInyectoras'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit'>
                Crear orden de reparacion: Mantenimiento Inyectoras
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </Link>
        )}
      </div>
    </>
  );
};
