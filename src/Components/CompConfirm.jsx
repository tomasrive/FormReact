import {
  Boton,
  ContenedorBotonCentrado,
  ContenedorModalConfirmar,
  EncabezadoModal,
  OrdenReparacionConfirmar,
  Overlay,
} from '../elements/Formularios';

export const CompConfirm = ({ dataTable, state, setState, send }) => {
  //   console.log(dataTable);
  return (
    <>
      {state && (
        <Overlay>
          <ContenedorModalConfirmar>
            <EncabezadoModal>
              <h1>Confirmar datos:</h1>
            </EncabezadoModal>
            <OrdenReparacionConfirmar>
              <div>
                <section>
                  <h4>Fecha Creacion:</h4>
                  <h5>{dataTable.fechaCreado}</h5>
                  <h4>Creado por:</h4>
                  <h5>{dataTable.lider}</h5>
                </section>
                <section>
                  <h4>Hora Creacion:</h4>
                  <h5>{dataTable.horaCreado}</h5>
                  {dataTable.tabla === '/moldes/' ? (
                    <>
                      <h4>Molde u otro periferico:</h4>
                      <h5>{dataTable.molde}</h5>
                    </>
                  ) : (
                    <>
                      <h4>Maquina:</h4>
                      <h5>{dataTable.maquinas}</h5>
                    </>
                  )}
                </section>
              </div>
              <h4>Descripcion:</h4>
              <h5>{dataTable.descripcion}</h5>
            </OrdenReparacionConfirmar>
            <ContenedorBotonCentrado>
              <Boton onClick={() => setState(!state)}>Cerrar</Boton>
              <Boton type='submit' onClick={send}>
                Enviar
              </Boton>
            </ContenedorBotonCentrado>
          </ContenedorModalConfirmar>
        </Overlay>
      )}
    </>
  );
};
