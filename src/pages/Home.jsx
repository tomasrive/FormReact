import { Link } from 'react-router-dom';
import {
  BotonInicio,
  ContenedorBotonInicio,
  DivTable,
} from '../elements/Formularios.js';

export const Home = () => {
  return (
    <>
      <DivTable>
        <Link className="noStyle" to="/FormCreateMatriceria">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Orden de reparacion: <br /> Matriceria
              {/* moldes */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/FormCreateInyectoras">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Orden de reparacion: Mantenimiento inyectoras
              {/* maquinas  */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/FormCreateEdilicio">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Orden de reparacion: Mantenimiento Edilicio
              {/* infraestructura */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/FormCreateArmado">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Orden de reparacion: Mantenimiento Armado
              {/* pROBLE A */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
      </DivTable>
    </>
  );
};
