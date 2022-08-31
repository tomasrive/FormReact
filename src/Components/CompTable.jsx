import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Option, Table, TR } from '../elements/Formularios';

export const CompTable = () => {
  const options = [
    { value: '', text: '--Elige un estado--' },
    { value: 'reparado', text: 'Reparado' },
    { value: 'enProceso', text: 'En proceso' },
    { value: 'noReparado', text: 'No reparado' },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

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
            <th>Estado:</th>
            <th>Enviar:</th>
          </tr>
        </thead>
        <tbody>
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
              <select value={selected} onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <a className='pointer'>
                <FontAwesomeIcon className="enviar" icon={faCheckCircle} />
              </a>
            </td>
          </TR>
          <tr>
            <td>Peter</td>
            <td>Parker</td>
            <td>Spiderman</td>
            <td>Bruce</td>
            <td>Wayne</td>
            <td>Batman</td>
            <td>Wayne</td>
            <td>Batman</td>
            <td>Wayne</td>
          </tr>
        </tbody>
      </table>
    </Table>
  );
};
