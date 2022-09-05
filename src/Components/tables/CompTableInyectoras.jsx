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

const URI = 'http://localhost:3000/api/ordenInyectoras';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);

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

  console.log(data);

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
              <th>Fecha de la rotura</th>
              <th>Hora de la rotura</th>
              <th>Maquina:</th>
              <th>Lider a cargo:</th>
              <th>Descripcion de la rotura:</th>
              <th>Quien recibe esta reparacion:</th>
              <th>Quien lo reparo:</th>
              <th>Fecha final</th>
              <th>Hora final</th>
              <th>Editar:</th>
              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataTable) => (
              <TR key={dataTable._id} validate={dataTable.estado}>
                <td>{dataTable.fecha}</td>
                <td>{dataTable.hora}</td>
                <td>{dataTable.maquinas}</td>
                <td>{dataTable.lider}</td>
                <td>{dataTable.descripcion}</td>
                <td>{dataTable.recibe}</td>
                <td>{dataTable.repara}</td>
                <td>{dataTable.fechaFinal}</td>
                <td>{dataTable.horaFinal}</td>
                <td>
                  <Link to={`/FormEditInyectoras/${dataTable._id}`}>
                    <FontAwesomeIcon className="edit" icon={faPenToSquare} />
                  </Link>
                </td>
                <td>
                  <IconoTabla
                    icon={
                      dataTable.estado === 'reparado'
                        ? faCheckCircle
                        : faTimesCircle
                    }
                  />
                </td>
              </TR>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
