import { useEffect, useState } from 'react';
import {
  BotonInicio,
  BotonInicioTabla,
  ContenedorBotonCentrado,
  ContenedorBotonInicio,
} from '../../elements/Formularios';
import axios from 'axios';
import { CompModal, CompRow } from '../../Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faEye,
  faScrewdriverWrench,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const URI = 'http://192.168.11.139:4001/api/procesos/forms/moldes';

export const CompTableMatriceria = () => {
  const [data, setData] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: '',
    tabla: '/moldes/',
    fechaCreado: '',
    horaCreado: '',
    molde: '',
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

  const deleteRow = async (dataTable) => {
    // console.log(dataTable);
    console.log(URI + '/' + dataTable.id);
    await axios.delete(URI + '/' + dataTable.id);
    window.location.reload();
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setData(res.data);
    setInterval(() => {
      window.location.reload();
    }, 6000000);
  };

  const deleteSession = () => {
    sessionStorage.removeItem('LiderUser');
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
        <b>COLORES:</b>
        <div className='colores'>
          <div className='coloresTable'>
            <div className='rojo'></div>
            <p>CREADO</p>
            <div className='amarillo'></div>
            <p>VISUALIZADO</p>
          </div>
          <div className='coloresTable'>
            <div className='verde'></div>
            <p>REPARADO</p>
            <div className='azul'></div>
            <p>VERIFICADO</p>
          </div>
        </div>
      </div>

      {LiderUser !== null && (
        <div className='txtOptions'>
          <b>Opciones:</b>
          <div className='colores'>
            <div className='coloresTable'>
              <div>
                <FontAwesomeIcon className='linkMedia' icon={faEye} />
              </div>
              <p>CREADO</p>
              <div>
                <FontAwesomeIcon
                  className='linkMedia'
                  icon={faScrewdriverWrench}
                />
              </div>
              <p>REPARAR</p>
            </div>
            <div className='coloresTable'>
              <div>
                <FontAwesomeIcon className='linkMedia' icon={faCheckCircle} />
              </div>
              <p>VERIFICAR</p>
              <div>
                <FontAwesomeIcon className='linkMedia' icon={faTrash} />
              </div>
              <p>BORRAR</p>
            </div>
          </div>
        </div>
      )}

      <ContenedorBotonCentrado>
        {LiderUser !== null && (
          <div>
            <BotonInicio type='submit' onClick={deleteSession}>
              <a
                className='noStyle'
                href='http://192.168.11.139:3000/inyeccion'
              >
                Cerrar Sesion
              </a>
            </BotonInicio>
          </div>
        )}

        <a href='http://192.168.11.139:3000/inyeccion'>
          {LiderUser !== null ? (
            <BotonInicio type='submit'>Atras</BotonInicio>
          ) : (
            <BotonInicio type='submit'>Iniciar sesion</BotonInicio>
          )}
        </a>
      </ContenedorBotonCentrado>
      <div>
        <table className='table-fill'>
          <thead>
            <tr>
              <th>Fecha y hora creado</th>
              <th>Moldes</th>
              <th>Lider a cargo:</th>
              <th>Descripcion:</th>
              <th>Fecha y hora visualizado</th>
              <th>Fecha y hora reparado</th>
              <th>Fecha y hora verificacion</th>
              <th>Opciones</th>
              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataTable) => (
              <CompRow
                key={dataTable.id}
                dataTable={dataTable}
                liderSesion={LiderUser}
                modal={modal}
                deleteRow={deleteRow}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className='noStyleDiv'>
        {LiderUser !== null && (
          <a className='noStyle' href='/FormCreateMatriceria'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit'>
                Crear orden de reparacion: Matriceria
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </a>
        )}
      </div>
    </>
  );
};
