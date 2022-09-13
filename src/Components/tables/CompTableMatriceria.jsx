import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import {
  BotonInicio,
  BotonInicioTabla,
  ContenedorBotonCentrado,
  ContenedorBotonInicio,
  DivOpciones,
  TR,
} from '../../elements/Formularios';
import { Link } from 'react-router-dom';

import axios from 'axios';
import {
  faPlus,
  faScrewdriverWrench,
  faEye,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ModalForm } from '../ModalForm';
const URI = 'http://localhost:3000/api/ordenMatriceria';

export const CompTableMatriceria = () => {
  const [data, setData] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    tabla: '/ordenMatriceria/',
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

  const liderSesion = sessionStorage.getItem('lider');

  const modal = (dataTable) => {
    setStateModal(!stateModal);
    setDataModal(dataTable)
  }

  useEffect(() => {
    getBlogs();
    // setInterval(() => {
    //   window.location.reload();
    // }, 10000);
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setData(res.data);
    console.log(res.data);
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
      <ModalForm
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
              <th>Moldes</th>
              <th>Lider a cargo:</th>
              <th>Descripcion:</th>

              <th>Fecha y hora visualizado</th>

              <th>Fecha y hora reparado</th>

              <th>Fecha y hora de verificacion</th>

              <th>Opciones</th>

              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataTable) => (
              <TR key={dataTable._id} validate={dataTable.estado}>
                <td>{dataTable.fechaCreado}<hr />{dataTable.horaCreado}</td>
                <td>{dataTable.molde}</td>
                <td>{dataTable.lider}</td>
                <td>{dataTable.descripcion}</td>
                <td>{dataTable.fechaVisualizado}<hr />{dataTable.horaVisualizado}</td>
                <td>{dataTable.fechaReparado}<hr />{dataTable.horaReparado}</td>
                <td>{dataTable.fechaVerificado}<hr />{dataTable.horaVerificado}</td>
                <td>
                  <DivOpciones validate={dataTable.estado}>

                    <Link to={`/FormVisualizar${dataTable.tabla}${dataTable._id}`} title='Visualizar'>
                      <FontAwesomeIcon className='linkMedia' icon={faEye} />
                    </Link>

                    <Link to={`/FormReparar${dataTable.tabla}${dataTable._id}`} title='Reparar'>
                      <FontAwesomeIcon
                        className='linkMedia'
                        icon={faScrewdriverWrench}
                      />
                    </Link>

                    {liderSesion !== null ? (
                      <Link to={`/FormVerificado${dataTable.tabla}${dataTable._id}`} title='Verificar'>
                        <FontAwesomeIcon
                          className='linkMedia'
                          icon={faCheckCircle}
                        />
                      </Link>
                    ) : (
                      <FontAwesomeIcon
                        className='linkMediaDisable'
                        icon={faXmark}
                      />
                    )}

                    <button
                      onClick={() => modal(dataTable)}
                      className='btnTable'
                      title="Abrir orden completa"
                    >
                      <FontAwesomeIcon className='linkMedia' icon={faPlus} />
                    </button>
                  </DivOpciones>
                </td>
                <td>{dataTable.estado.toUpperCase()}</td>
              </TR>
            ))}
          </tbody>
        </table>
      </div>
      <div className='noStyleDiv'>
        {liderSesion !== null && (
          <Link className='noStyle' to='/FormCreateMatriceria'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit'>
                Crear orden de reparacion: Matriceria
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </Link>
        )}
      </div>
    </>
  );
};
