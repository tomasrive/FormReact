import {
  BotonCerrar,
  ContenedorModal,
  EncabezadoModal,
  OrdenReparacion,
  Overlay,
} from '../elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
export const CompModal = ({ dataTable, state, setState }) => {
  return (
    <>
      {state && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h1>Orden de Reparacion</h1>
            </EncabezadoModal>
            <BotonCerrar onClick={() => setState(!state)}>
              {<FontAwesomeIcon icon={faClose} />}
            </BotonCerrar>
            <div className='divGrid'>
              <h4>ID de la orden:</h4>
              <h5>{dataTable.id}</h5>
            </div>
            <OrdenReparacion validate={dataTable.estado}>
              <div>
                <h4>Fecha Creacion</h4>
                <h5>{dataTable.fechaCreado}</h5>
                <h4>Hora Creacion</h4>
                <h5>{dataTable.horaCreado}</h5>

                {dataTable.tabla === '/moldes/' ||
                dataTable.tabla === 'moldes' ? (
                  <>
                    <h4>Molde</h4>
                    <h5>{dataTable.molde}</h5>
                  </>
                ) : (
                  <>
                    <h4>Maquina</h4>
                    <h5>{dataTable.maquinas}</h5>
                  </>
                )}

                <h4>Lider a cargo</h4>
                <h5>{dataTable.lider}</h5>
                <h4>Descripcion</h4>
                <h5>{dataTable.descripcion}</h5>
              </div>

              <div>
                <h4>Fecha Visualizado</h4>
                <h5>{dataTable.fechaVisualizado}</h5>
                <h4>Hora Visualizado</h4>
                <h5>{dataTable.horaVisualizado}</h5>
                <h4>Quien recibe</h4>
                <h5>{dataTable.recibe}</h5>
              </div>

              <div>
                <h4>Fecha Reparado</h4>
                <h5>{dataTable.fechaReparado}</h5>
                <h4>Hora reparado</h4>
                <h5>{dataTable.horaReparado}</h5>
                <h4>Quien lo reparo</h4>
                <h5>{dataTable.repara}</h5>
                <h4>Observaciones en la reparacion</h4>
                <h5>{dataTable.observacionesReparar}</h5>
              </div>

              <div>
                <h4>Fecha Verificado</h4>
                <h5>{dataTable.fechaVerificado}</h5>
                <h4>Hora verificado</h4>
                <h5>{dataTable.horaVerificado}</h5>
                <h4>Observaciones en la verificacion</h4>
                <h5>{dataTable.observacionesVerificar}</h5>
              </div>

              <h4>Estado actual de la pieza</h4>
              <h5>{dataTable.estado.toUpperCase()}</h5>
            </OrdenReparacion>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};
