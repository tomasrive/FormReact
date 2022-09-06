import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faPenToSquare,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import {
  BotonInicio,
  ContenedorBotonCentrado,
  IconoTabla,
  TR,
} from '../../elements/Formularios';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { faPlus, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useDate } from '../useDate';

const URI = 'http://localhost:3000/api/ordenMatriceria';

export const CompTableMatriceria = () => {
  const [data, setData] = useState([]);
  const { date, hour, setDate } = useDate()

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setData(res.data);
    console.log(res.data);
  };




  data.sort((a, b) => {
    const nombreA = a.fecha + a.hora;
    const apellidoB = b.fecha + b.hora;

    if (nombreA > apellidoB) {
      return -1;
    }

    if (nombreA < apellidoB) {
      return 1;
    }

    return 0;
  });




  return (
    <>
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
              <th>Molde</th>
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
                <td>{dataTable.molde}</td>
                <td>{dataTable.lider}</td>
                <td>{dataTable.fechaVisualizado}</td>
                <td>{dataTable.horaVisualizado}</td>
                <td>{dataTable.fechaReparado}</td>
                <td>{dataTable.horaReparado}</td>
                <td>{dataTable.fechaVerificado}</td>
                <td>{dataTable.horaVerificado}</td>
                <td>
                  <button onClick={setDate} >
                    <FontAwesomeIcon icon={faPenToSquare} />

                  </button>
                  <Link to={`/FormEdit/${dataTable._id}`}>
                    <FontAwesomeIcon icon={faScrewdriverWrench} />
                  </Link>
                  <Link to={`/FormVerificado/${dataTable._id}`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </Link>
                  <Link to={'/'}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </td>
                <td>{dataTable.estado}</td>
              </TR>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
