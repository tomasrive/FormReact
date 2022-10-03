import {
  Boton,
  ContenedorBotonCentrado,
  ContenedorModalDenegar,
  EncabezadoModal,
  Overlay,
} from '../elements/Formularios';
import { CompInput } from './CompInput';

export const CompDenegado = ({
  state,
  setState,
  send,
  denegar,
  setDenegar,
}) => {
  const expresiones = {
    mensaje: /^[a-zA-Z0-9À-ÿ\s]{5,200}$/,
  };

  return (
    <>
      {state && (
        <Overlay>
          <ContenedorModalDenegar>
            <EncabezadoModal>
              <h1>Orden denegada: Motivo</h1>
              <span className='spanConfirm'>
                (ATENCION: Se enviara un correo a los respectivos lideres y
                supervisores)
              </span>
            </EncabezadoModal>
            <>
              <CompInput
                InputState={denegar}
                InputSetState={setDenegar}
                inputType='text'
                inputPlaceholder='Motivo'
                inputName='motivoDenegado'
                inputError='El motivo de denegacion tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.'
                inputExp={expresiones.mensaje}
              />
            </>
            <ContenedorBotonCentrado>
              <Boton
                onClick={() => {
                  setDenegar({ campo: '', valido: null });
                  setState(!state);
                }}
              >
                Cerrar
              </Boton>
              <Boton type='submit' onClick={send}>
                Enviar
              </Boton>
            </ContenedorBotonCentrado>
          </ContenedorModalDenegar>
        </Overlay>
      )}
    </>
  );
};
