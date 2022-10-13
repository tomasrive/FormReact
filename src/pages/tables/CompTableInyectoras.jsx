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

const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: '',
    tabla: 'maquinas',
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
    console.log(dataTable);
    setDataModal(dataTable);
  };

  const deleteRow = async (dataTable) => {
    await axios.delete(URI + '/' + dataTable.id);
    window.location.reload();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(URI);
      setData(res.data);
    } catch (error) {
      console.log(error);
      alert(
        'BASE DE DATOS NO RESPONDE O SE ENCUENTRA APAGADA, POR FAVOR COMUNICARSE CON EL AREA'
      );
    }
    setInterval(() => {
      window.location.reload();
    }, 600000);
  };

  const deleteSession = () => {
    sessionStorage.removeItem('LiderUser');
  };

  data.sort((a, b) => {
    const creadoA = a.fechaCreado + a.horaCreado;
    const creadoB = b.fechaCreado + b.horaCreado;

    const categoriaA = a.categoria;
    const categoriaB = b.categoria;

    const verificadoA = a.horaVerificado + a.horaVerificado;
    const verificadoB = b.fechaVerificado + b.horaVerificado;

    if (creadoA > creadoB) {
      return -1;
    } else {
      if (categoriaA > categoriaB) {
        return -1;
      } else {
        if (verificadoA < verificadoB) {
          return -1;
        }

        if (verificadoA > verificadoB) {
          return 1;
        }
      }
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
      <h1 className='titleTop'>
        TABLA DE ORDENES DE REPARACION (MANTENIMIENTO INYECTORAS)
      </h1>
      <div className='txtColors'>
        <b>COLORES:</b>
        <div className='colores'>
          <div className='coloresTable'>
            <div className='rojo'></div>
            <p>CREADO</p>
            <div className='verde'></div>
            <p>REPARADO</p>
          </div>
          <div className='coloresTable'>
            <div className='amarillo'></div>
            <p>VISUALIZADO</p>

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
              <p>VISUALIZAR</p>
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
            <BotonInicio
              type='submit'
              onClick={deleteSession}
              validate='denied'
            >
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
            <BotonInicio type='submit' validate='valid'>
              Iniciar sesion
            </BotonInicio>
          )}
        </a>
      </ContenedorBotonCentrado>
      <div>
        <table className='table-fill'>
          <thead>
            <tr>
              <th>Fecha y hora creado</th>
              <th>Maquinas</th>
              <th>Lider que creo la orden:</th>
              <th>Problema:</th>
              <th>Fecha y hora visualizado</th>
              <th>Fecha y hora reparado</th>
              <th>Fecha y hora verificacion</th>
              <th>Opciones</th>
              <th>Estado:</th>
              <th>Categoria:</th>
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
          <a className='noStyle' href='/FormCreateInyectoras'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit' validate='valid'>
                Crear orden de reparacion: Mantenimiento Inyectoras
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </a>
        )}
      </div>
    </>
  );
};
