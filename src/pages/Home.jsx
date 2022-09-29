import {
  BotonInicio,
  ContenedorBotonInicio,
  DivTable,
} from '../elements/Formularios.js';

export const Home = () => {
  // Usuario de Session Storage de ejemplo
  if (typeof Storage != 'undefined') {
    // let LiderUser = 'Fabian Gomez';
    let LiderUser = 'Lucas Martinez';
    sessionStorage.setItem('LiderUser', LiderUser);
  }

  return (
    <>
      <DivTable>
        <a className='noStyle' href='/FormCreateMatriceria'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Orden de reparacion: Matriceria
              {/* moldes */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
        <a className='noStyle' href='/FormCreateInyectoras'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Orden de reparacion: Mantenimiento de Inyectoras
              {/* maquinas  */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
        <a className='noStyle' href='/FormCreateEdilicio'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Orden de reparacion: Mantenimiento Edilicio
              {/* infraestructura */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
        <a className='noStyle' href='/FormCreateArmado'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Orden de reparacion: Mantenimiento de Armado
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>

        <a className='noStyle' href='/CompTableMatriceria'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Tabla de matriceria
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
        <a className='noStyle' href='/CompTableInyectoras'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Tabla de Mantenimiento Inyectoras
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
        <a className='noStyle' href='/CompTableEdilicio'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Tabla de Mantenimiento Edilicio
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
        <a className='noStyle' href='/CompTableArmado'>
          <ContenedorBotonInicio>
            <BotonInicio>
              Tabla de Mantenimiento Armado
              {/* Problema */}
            </BotonInicio>
          </ContenedorBotonInicio>
        </a>
      </DivTable>
    </>
  );
};
