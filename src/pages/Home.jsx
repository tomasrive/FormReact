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
        <Link className='noStyle' to='/FormCreate'>
          <ContenedorBotonInicio>
            <BotonInicio type='submit'>
              Orden de reparacion: Matriceria
              {/* moldes */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className='noStyle' to='/FormCreate'>
          <ContenedorBotonInicio>
            <BotonInicio type='submit'>
              Orden de reparacion: Mantenimiento inyectoras
              {/* maquinas  */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className='noStyle' to='/FormCreate'>
          <ContenedorBotonInicio>
            <BotonInicio type='submit'>
              Orden de reparacion: Mantenimiento Edilicio
              {/* infraestructura */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className='noStyle' to='/FormCreate'>
          <ContenedorBotonInicio>
            <BotonInicio type='submit'>
              Orden de reparacion: Mantenimiento Armado
              {/* pROBLE A */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
      </DivTable>
      <CompTable />
    </>
  );
};
