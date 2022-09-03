import { Link } from 'react-router-dom';
import {
  BotonInicio,
  ContenedorBotonInicio,
  DivTable,
} from '../elements/Formularios.js';

export const Home = () => {
  // Usuario de Session Storage de ejemplo

  if (typeof Storage != 'undefined') {
    let lider = 'Fabian Gomez';
    sessionStorage.setItem('lider', lider);
  } else {
    alert('aaaaa');
  }

  return (
    <>
      <DivTable>
        <Link className="noStyle" to="/FormCreateMatriceria">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Orden de reparacion: Matriceria
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
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>

        <Link className="noStyle" to="/CompTableMatriceria">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Tabla de matriceria
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/CompTableInyectoras">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Tabla de Mantenimiento Inyectoras
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/CompTableEdilicio">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Tabla de Mantenimiento Edilicio
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
        <Link className="noStyle" to="/CompTableArmado">
          <ContenedorBotonInicio>
            <BotonInicio type="submit">
              Tabla de Mantenimiento Armado
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </Link>
      </DivTable>
    </>
  );
};
