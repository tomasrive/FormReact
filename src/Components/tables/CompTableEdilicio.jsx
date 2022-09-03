import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Option, Table, TR } from '../../elements/Formularios';
import { Link } from 'react-router-dom';

export const CompTableEdilicio = () => {
  // const URL = 'http://192.168.11.139:4001/api/armado/users';

  const options = [
    { value: 'noReparado', text: 'No reparado' },
    { value: 'reparado', text: 'Reparado' },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  // fetch(URL)
  //   .then((response) => response.json())
  //   .then((data) => datos(data));

  // const datos = (data) => {
  //   data.map((dato) => {
  //     console.log(dato);
  //     <CompTable />;
  //   });
  // };

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
            <th>Fecha de finalizacion</th>
            <th>Hora de finalizacion</th>
            <th>Quien lo reparo:</th>
            <th>Editar:</th>
            <th>Estado:</th>
          </tr>
        </thead>
        <tbody>
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
              <Link to='/FormEdit'>
                <FontAwesomeIcon className='edit' icon={faPenToSquare} />
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
              <Link to='/FormEdit'>
                <FontAwesomeIcon className='edit' icon={faPenToSquare} />
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
              <Link to='/FormEdit'>
                <FontAwesomeIcon className='edit' icon={faPenToSquare} />
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
