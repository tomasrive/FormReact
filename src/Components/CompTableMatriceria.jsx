import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Option, Table, TR } from '../elements/Formularios';
import { Link } from 'react-router-dom';

// const URL = 'http://192.168.11.139:4001/api/armado/users';
// const tbody = document.getElementById('tbody');

// getMovies(URL);

// function getMovies(URL) {
//   fetch(URL)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.results);
//       CompTableMatriceria(data.results);
//     });
// }

export const CompTableMatriceria = (data) => {
  const options = [
    { value: 'noReparado', text: 'No reparado' },
    { value: 'reparado', text: 'Reparado' },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  // data.forEach((datos) => {
  //   console.log(datos);
  //   const { nombre, apellido, etc } = datos;

  // const tableCreate = document.createElement('tr');

  // tableCreate.innerHTML = `
  //   <td>date</td>
  //   <td>hour</td>
  //   <td>datos</td>
  //   <td>Bruce</td>
  //   <td>Wayne</td>
  //   <td>Batman</td>
  //   <td>Wayne</td>
  //   <td>date</td>
  //   <td>hour</td>
  //   <td>
  //     <Link to="/FormEdit">
  //       <FontAwesomeIcon className="edit" icon=${faPenToSquare} />
  //     </Link>
  //   </td>
  //   <td>
  //     <select value=${selected} onChange=${handleChange}>
  //       ${options.map((option) => (
  //         <option key={option.value} value={option.value}>
  //           {option.text}
  //         </option>
  //       ))}
  //     </select>
  //   </td>`;
  // console.log(tableCreate);

  // tbody.appendChild(tableCreate);
  // });

  return (
    <Table>
      <table>
        <thead>
          <tr>
            <th>Fecha de la rotura</th>
            <th>Hora de la rotura</th>
            <th>Molde</th>
            <th>Lider a cargo:</th>
            <th>Descripcion de la rotura:</th>
            <th>Quien recibe esta reparacion:</th>
            <th>Quien lo reparo:</th>
            <th>Fecha de finalizacion</th>
            <th>Hora de finalizacion</th>
            <th>Editar:</th>
            <th>Estado:</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <TR validate={selected}>
            <td>date</td>
            <td>hour</td>
            <td>datos</td>
            <td>Bruce</td>
            <td>Wayne</td>
            <td>Batman</td>
            <td>Wayne</td>
            <td>date</td>
            <td>hour</td>
            <td>
              <Link to="/FormEdit">
                <FontAwesomeIcon className="edit" icon={faPenToSquare} />
              </Link>
            </td>
            <td>
              <select value={selected} onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
          </TR>
          <TR validate={selected}>
            <td>date</td>
            <td>hour</td>
            <td>Batman</td>
            <td>Bruce</td>
            <td>Wayne</td>
            <td>Batman</td>
            <td>date</td>
            <td>hour</td>
            <td>Wayne</td>
            <td>
              <Link to="/FormEdit">
                <FontAwesomeIcon className="edit" icon={faPenToSquare} />
              </Link>
            </td>
            <td>
              <select value={selected} onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
          </TR>
          <TR validate={selected}>
            <td>date</td>
            <td>hour</td>
            <td>Batman</td>
            <td>Bruce</td>
            <td>Wayne</td>
            <td>Batman</td>
            <td>date</td>
            <td>hour</td>
            <td>Wayne</td>
            <td>
              <Link to="/FormEdit">
                <FontAwesomeIcon className="edit" icon={faPenToSquare} />
              </Link>
            </td>
            <td>
              <select value={selected} onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
          </TR>
        </tbody>
      </table>
    </Table>
  );
};
