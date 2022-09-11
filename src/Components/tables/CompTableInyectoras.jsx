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
import { faPlus, faScrewdriverWrench, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalForm } from '../ModalForm';

const URI = 'http://localhost:3000/api/ordenInyectoras';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);
  const [stateModal, setStateModal] = useState(false)
  const [dataModal, setDataModal] = useState({
    tabla: '/ordenInyectoras/',
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

  })
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
    console.log('a');
  };

  data.sort((a, b) => {
    const nombreA =
      a.fechaCreado +
      a.horaCreado +
      a.fechaVisualizado +
      a.horaVisualizado +
      a.fechaReparado +
      a.horaRefechaReparado +
      a.fechaVerificado +
      a.horaVerificado;
    const apellidoB =
      b.fechaCreado +
      b.horaCreado +
      b.fechaVisualizado +
      b.horaVisualizado +
      b.fechaReparado +
      b.horaRefechaReparado +
      b.fechaVerificado +
      b.horaVerificado;

    if (nombreA < apellidoB) {
      return 1;
    }

    if (nombreA > apellidoB) {
      return -1;
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

              <th>Fecha y hora de verificacion</th>

              <th>Opciones</th>

              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataTable) => (
              <TR key={dataTable._id} validate={dataTable.estado}>
                <td>{dataTable.fechaCreado}<hr />{dataTable.horaCreado}</td>
                <td>{dataTable.maquinas}</td>
                <td>{dataTable.lider}</td>
                <td>{dataTable.descripcion}</td>
                <td>{dataTable.fechaVisualizado}<hr />{dataTable.horaVisualizado}</td>
                <td>{dataTable.fechaReparado}<hr />{dataTable.horaReparado}</td>
                <td>{dataTable.fechaVerificado}<hr />{dataTable.horaVerificado}</td>
                <td>
                  <DivOpciones validate={dataTable.estado}>
                    <Link
                      to={`/FormVisualizar${dataTable.tabla}${dataTable._id}`}
                    >
                      <FontAwesomeIcon className='linkMedia' icon={faEye} />
                    </Link>
                    <Link to={`/FormReparar${dataTable.tabla}${dataTable._id}`}>
                      <FontAwesomeIcon
                        className='linkMedia'
                        icon={faScrewdriverWrench}
                      />
                    </Link>

                    {liderSesion !== null ? (
                      <Link
                        to={`/FormVerificado${dataTable.tabla}${dataTable._id}`}
                      >
                        <FontAwesomeIcon
                          className='linkMedia'
                          icon={faCheckCircle}
                        />
                      </Link>
                    ) : (
                      <FontAwesomeIcon
                        className='linkMediaDisable'
                        icon={faTimesCircle}
                      />
                    )}

                    <button
                      onClick={() => modal(dataTable)}
                      className='btnTable'
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
