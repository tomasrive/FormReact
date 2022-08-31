import { Link } from 'react-router-dom';
import { CompTable } from '../Components/CompTable.jsx';
import {
  BotonInicio,
  ContenedorBotonInicio,
  DivTable,
} from '../elements/Formularios.js';

export const Home = () => {
  return (
    <>
      <DivTable>
        <Link className="noStyle" to="/FormCreate">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">Crear orden de reparacion</BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/FormEdit">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">Editar orden de reparacion</BotonInicio>
          </ContenedorBotonInicio>
        </Link>
      </DivTable>

      <CompTable />
    </>
  );
};
