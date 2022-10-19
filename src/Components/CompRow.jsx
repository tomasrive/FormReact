import {
  faCheckCircle,
  faEye,
  faPlus,
  faScrewdriverWrench,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { DivOpciones, TR } from '../elements/styledComponents';

export const CompRow = ({ dataTable, liderSesion, modal, deleteRow }) => {
  return (
    <TR validate={dataTable.estado}>
      <td>
        {dataTable.fechaCreado}
        <hr />
        {dataTable.horaCreado}
      </td>
      {dataTable.maquina ? (
        <td>{dataTable.maquina}</td>
      ) : (
        <td>{dataTable.molde}</td>
      )}

      <td>{dataTable.lider}</td>
      <td>{dataTable.problema}</td>
      <td>
        {dataTable.fechaNotificado}
        <hr />
        {dataTable.horaNotificado}
      </td>
      <td>
        {dataTable.fechaReparado}
        <hr />
        {dataTable.horaReparado}
      </td>
      <td>
        {dataTable.fechaVerificado}
        <hr />
        {dataTable.horaVerificado}
      </td>
      <td>
        <DivOpciones validate={dataTable.estado}>
          {dataTable.molde ? (
            <>
              {liderSesion !== null ? (
                <>
                  <Link
                    to={`/FormVisualizar/moldes/${dataTable.id}`}
                    title='Notificar'
                  >
                    <FontAwesomeIcon className='linkMedia' icon={faEye} />
                  </Link>

                  <Link
                    to={`/FormReparar/moldes/${dataTable.id}`}
                    title='Reparar'
                  >
                    <FontAwesomeIcon
                      className='linkMedia'
                      icon={faScrewdriverWrench}
                    />
                  </Link>
                  <Link
                    to={`/FormVerificado/moldes/${dataTable.id}`}
                    title='Verificar'
                  >
                    <FontAwesomeIcon
                      className='linkMedia'
                      icon={faCheckCircle}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <div></div>
                  <div></div>
                </>
              )}
            </>
          ) : (
            <>
              {liderSesion !== null ? (
                <>
                  <Link
                    to={`/FormVisualizar/maquinas/${dataTable.id}`}
                    title='Notificar'
                  >
                    <FontAwesomeIcon className='linkMedia' icon={faEye} />
                  </Link>

                  <Link
                    to={`/FormReparar/maquinas/${dataTable.id}`}
                    title='Reparar'
                  >
                    <FontAwesomeIcon
                      className='linkMedia'
                      icon={faScrewdriverWrench}
                    />
                  </Link>
                  <Link
                    to={`/FormVerificado/maquinas/${dataTable.id}`}
                    title='Verificar'
                  >
                    <FontAwesomeIcon
                      className='linkMedia'
                      icon={faCheckCircle}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <div></div>
                  <div></div>
                </>
              )}
            </>
          )}

          {dataTable.estado !== 'creado' ||
          dataTable.primerMotivoDenegado ||
          dataTable.segundoMotivoDenegado ? (
            <></>
          ) : liderSesion === dataTable.lider ? (
            <button
              onClick={() => deleteRow(dataTable)}
              className='btnTable'
              title='Borrar orden'
            >
              <FontAwesomeIcon className='linkMedia' icon={faTrash} />
            </button>
          ) : (
            <></>
          )}

          <button
            onClick={() => modal(dataTable)}
            className='btnTable'
            title='Abrir orden completa'
          >
            <FontAwesomeIcon className='linkMedia' icon={faPlus} />
          </button>
        </DivOpciones>
      </td>
      <td>{dataTable.estado.toUpperCase()}</td>
      <td>{dataTable.categoria}</td>
    </TR>
  );
};
