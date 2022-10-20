import {
  BotonInicio,
  ContenedorBotonInicio,
  DivTable,
} from '../elements/styledComponents';

export const Home = () => {
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
      </DivTable>
    </>
  );
};
