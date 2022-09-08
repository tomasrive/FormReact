import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import {
  BotonInicio,
  ContenedorBotonCentrado,
  ContenedorBotonInicio,
  DivOpciones,
  TR,
} from '../../elements/Formularios';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { faPlus, faScrewdriverWrench, faEye } from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setData(res.data);
    console.log(res.data);
  };

  data.sort((a, b) => {
    const nombreA = a.fechaCreado + a.horaCreado;
    const apellidoB = b.fechaCreado + b.horaCreado;

    if (nombreA > apellidoB) {
      return -1;
    }

    if (nombreA < apellidoB) {
      return 1;
    }

    return 0;
  });

  const modal = (dataTable) => {
    setStateModal(!stateModal);
    setDataModal(dataTable)
  }

  return (
    <>
      <ModalForm
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
      />

      <ContenedorBotonCentrado>
        <Link to="/">
          <BotonInicio type="submit">Atras</BotonInicio>
        </Link>
      </ContenedorBotonCentrado>
      <div>
        <table className="table-fill">
          <thead>
            <tr>
              <th>Fecha creado</th>
              <th>Hora creado</th>
              <th>Maquina</th>
              <th>Lider a cargo:</th>

              <th>Fecha visualizado</th>
              <th>Hora visualizado</th>

              <th>Fecha reparado</th>
              <th>Hora reparado</th>

              <th>Fecha verificado</th>
              <th>Hora verificado</th>

              <th>Opciones</th>

              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>

            {data.map((dataTable) => (
              <TR key={dataTable._id} validate={dataTable.estado}>
                <td>{dataTable.fechaCreado}</td>
                <td>{dataTable.horaCreado}</td>
                <td>{dataTable.maquinas}</td>
                <td>{dataTable.lider}</td>
                <td>{dataTable.fechaVisualizado}</td>
                <td>{dataTable.horaVisualizado}</td>
                <td>{dataTable.fechaReparado}</td>
                <td>{dataTable.horaReparado}</td>
                <td>{dataTable.fechaVerificado}</td>
                <td>{dataTable.horaVerificado}</td>
                <td>
                  <DivOpciones validate={dataTable.estado}>
                    <Link to={`/FormVisualizar${dataTable.tabla}${dataTable._id}`} >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to={`/FormEdit${dataTable.tabla}${dataTable._id}`}>
                      <FontAwesomeIcon icon={faScrewdriverWrench} />
                    </Link>
                    <Link to={`/FormVerificado${dataTable.tabla}${dataTable._id}`}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </Link>
                    <button onClick={() => modal(dataTable)} className='btnTable'>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </DivOpciones>
                </td>
                <td>{dataTable.estado.toUpperCase()}</td>
              </TR>
            ))}
          </tbody>
        </table>
      </div>
      <Link className="noStyle" to="/FormCreateMatriceria">
        <ContenedorBotonInicio>
          <BotonInicio type="submit">
            Crear orden de reparacion: Inyeccion
            {/* moldes */}
          </BotonInicio>
        </ContenedorBotonInicio>
      </Link>
    </>
  );
};
