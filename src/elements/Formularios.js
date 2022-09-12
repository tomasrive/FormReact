import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colores = {
  borde: '#0075FF',
  error: '#bb2929',
  exito: '#1ebb2b',
  proceso: '#ffff00',
  verificado: '#3d40c7',
  black: '#000',
  white: '#fff',
};

const DivTable = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 50px;
  align-items: center;
  justify-content: center;
  height: 50vh;
  @media (max-width: 1600px) {
    grid-template-columns: 230px 230px 230px 230px;
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  margin-top: 30px;
  font-size: 16px;
`;

const Formulario = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  margin: auto;
  width: 80%;
  margin-top: 50px;
  @media (max-width: 1300px) {
    width: 100%;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;
  color: ${colores.black};
  ${(props) =>
    props.validate === 'false' &&
    css`
      color: ${colores.error};
    `}
`;

const GroupInput = styled.div`
  position: relative;
  z-index: 60;
`;
const GroupInputDate = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 200px 200px;
  text-align: center;
`;
const InputDate = styled.input`
  background: ${colores.white};
  border: 0;
  border-radius: 320px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px ${colores.white};
  font-size: 20px;
  outline: 0;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  width: 70%;
  text-align: center;
`;

const Input = styled.input`
  background: ${colores.white};
  border: 0;
  border-radius: 320px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px ${colores.white};
  font-size: 16px;
  outline: 0;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  border: 2px solid ${colores.white};

  &:focus {
    border: 2px solid ${colores.borde};
    outline: none;
  }

  ${(props) =>
    props.validate === 'true' &&
    css`
      border: 2px solid none;
    `}

  ${(props) =>
    props.validate === 'false' &&
    css`
      border: 2px solid ${colores.error} !important;
    `}
`;

const LeyendaError = styled.p`
  font-size: 12px;
  margin-bottom: 0;
  margin-left: 6px;
  color: ${colores.error};
  display: none;

  ${(props) =>
    props.validate === 'true' &&
    css`
      display: none;
    `}

  ${(props) =>
    props.validate === 'false' &&
    css`
      display: block;
    `}
`;

const IconoValidacion = styled(FontAwesomeIcon)`
  position: absolute;
  right: 15px;
  bottom: 18px;
  z-index: 50;
  font-size: 16px;
  opacity: 0;

  ${(props) =>
    props.validate === 'false' &&
    css`
      opacity: 1;
      color: ${colores.error};
    `}

  ${(props) =>
    props.validate === 'true' &&
    css`
      opacity: 1;
      color: ${colores.exito};
    `}
`;
const IconoTabla = styled(FontAwesomeIcon)`
  display: flex;
  align-content: center;
  font-size: 30px;
  margin: auto;
  margin-top: 5px;
`;

const ContenedorBotonInicio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: 15px;
`;

const BotonInicio = styled.button`
  width: 100%;
  background: ${colores.white};
  border: 0;
  border-radius: 320px;
  box-shadow: -5px -5px 20px #cccbcb, 5px 5px 20px #babecc;
  color: ${colores.black};
  cursor: pointer;
  font-size: 16px;
  outline: 0;
  padding: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: -2px -2px 5px #393f4b, 2px 2px 5px ${colores.black};
  }

  &:active {
    box-shadow: inset 1px 1px 2px ${colores.black}, inset -1px -1px 2px #393f4b;
  }
`;
const BotonInicioTabla = styled.button`
  width: 300px;
  background: ${colores.white};
  border: 0;
  border-radius: 320px;
  box-shadow: -5px -5px 20px #cccbcb, 5px 5px 20px #babecc;
  color: ${colores.black};
  cursor: pointer;
  font-size: 16px;
  outline: 0;
  padding: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: -2px -2px 5px #393f4b, 2px 2px 5px ${colores.black};
  }

  &:active {
    box-shadow: inset 1px 1px 2px ${colores.black}, inset -1px -1px 2px #393f4b;
  }
`;

const ContenedorBotonCentrado = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 15px;
  gap: 100px;
  width: 50%;
`;

const Boton = styled.button`
  background: ${colores.white};
  border: 0;
  border-radius: 320px;
  box-shadow: -5px -5px 20px #cccbcb, 5px 5px 20px #babecc;
  color: ${colores.black};
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  outline: 0;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  width: 30%;

  &:hover {
    box-shadow: -2px -2px 5px #393f4b, 2px 2px 5px ${colores.black};
  }

  &:active {
    box-shadow: inset 1px 1px 2px ${colores.black}, inset -1px -1px 2px #393f4b;
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`;
const MensajeExito = styled.p`
  border-radius: 320px;
  line-height: 40px;
  background: ${colores.exito};
  padding: 0px 15px;
  margin-top: 10px;
  span {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }
`;

const MensajeError = styled.div`
  border-radius: 320px;
  line-height: 40px;
  background: #f66060;
  padding: 0px 15px;
  margin-top: 10px;
  span {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }
`;

const TR = styled.tr`
  ${(props) =>
    props.validate === 'creado' &&
    css`
      text-align: center;
      background: ${colores.error} !important;
    `}
  ${(props) =>
    props.validate === 'visualizado' &&
    css`
      text-align: center;
      background: ${colores.proceso} !important;
    `}
  ${(props) =>
    props.validate === 'reparado' &&
    css`
      text-align: center;
      background: ${colores.exito} !important;
    `}

  ${(props) =>
    props.validate === 'verificado' &&
    css`
      text-align: center;
      background: ${colores.verificado} !important;
    `}
`;
const DivOpciones = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  justify-content: space-between;
  font-size: 40px;
  a {
    color: ${colores.black} !important;
  }

  ${(props) =>
    props.validate === 'creado' &&
    css`
      a:nth-child(2),
      a:nth-child(3) {
        color: grey !important;
        pointer-events: none;
      }
    `}
  ${(props) =>
    props.validate === 'visualizado' &&
    css`
      a:nth-child(1),
      a:nth-child(3) {
        color: grey !important;
        pointer-events: none;
      }
    `}
  ${(props) =>
    props.validate === 'reparado' &&
    css`
      a:nth-child(1),
      a:nth-child(2) {
        color: grey !important;
        pointer-events: none;
      }
    `}

  ${(props) =>
    props.validate === 'verificado' &&
    css`
      a:nth-child(-n + 3) {
        color: grey !important;
        pointer-events: none;
      }
    `}
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ContenedorModal = styled.div`
  width: 80%;
  min-height: 100px;
  background: ${colores.white};
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 30px;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  h1 {
    margin: auto;
  }
  h3 {
    font-weight: 500px;
    font-size: 16px;
    color: #1766dc;
  }
`;
const BotonCerrar = styled.button`
  position: absolute;
  background: ${colores.black};
  right: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;

  &:hover {
    background: #f2f2f2;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const OrdenReparacion = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  font-size: 15px;
  h4,
  h5 {
    margin: 7px;
  }

  h5 {
    border-radius: 5px;
    min-height: 40px;
    padding: 10px;
    background: #f2f2f2;
  }

  ${(props) =>
    props.validate === 'creado' &&
    css`
      & > h5:last-child {
        text-align: center;
        background: ${colores.error};
      }
    `}
  ${(props) =>
    props.validate === 'visualizado' &&
    css`
      & > h5:last-child {
        text-align: center;
        background: ${colores.proceso};
      }
    `}
  ${(props) =>
    props.validate === 'reparado' &&
    css`
      & > h5:last-child {
        text-align: center;
        background: ${colores.exito};
      }
    `}

  ${(props) =>
    props.validate === 'verificado' &&
    css`
      & > h5:last-child {
        text-align: center;
        background: ${colores.verificado};
      }
    `}
`;

export {
  DivTable,
  Table,
  Formulario,
  Label,
  GroupInput,
  GroupInputDate,
  Input,
  InputDate,
  LeyendaError,
  IconoValidacion,
  IconoTabla,
  ContenedorBotonInicio,
  ContenedorBotonCentrado,
  Boton,
  BotonInicio,
  BotonInicioTabla,
  MensajeError,
  MensajeExito,
  TR,
  DivOpciones,
  Overlay,
  ContenedorModal,
  EncabezadoModal,
  BotonCerrar,
  OrdenReparacion,
};
