import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colores = {
  borde: '#0075FF',
  error: '#bb2929',
  exito: '#1ed12d',
};

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  height: 98vh;
  @media (max-width: 1600px) {
    grid-template-columns: none;
    grid-template-rows: 0.5fr 1fr;
  }
`;
const DivTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const Formulario = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  width: 70%;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;
  color: #000;
  ${(props) =>
    props.validate === 'false' &&
    css`
      color: ${colores.error};
    `}
`;

const GroupInput = styled.div`
  position: relative;
  z-index: 90;
`;
const GroupInputDate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 90;
  gap: 40px;
  text-align: center;
`;
const InputDate = styled.input`
  background-color: #fff;
  border: 0;
  border-radius: 320px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
  font-size: 20px;
  outline: 0;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  width: 70%;
  text-align: center;
`;

const Input = styled.input`
  background-color: #fff;
  border: 0;
  border-radius: 320px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
  font-size: 16px;
  outline: 0;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  border: 2px solid #fff;

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
  z-index: 100;
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

const ContenedorTerminos = styled.div`
  input {
    margin-right: 10px;
  }
`;

const ContenedorBotonCentrado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const Boton = styled.button`
  background-color: #fff;
  border: 0;
  border-radius: 320px;
  box-shadow: -5px -5px 20px #cccbcb, 5px 5px 20px #babecc;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  outline: 0;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  width: 30%;

  &:hover {
    box-shadow: -2px -2px 5px #393f4b, 2px 2px 5px #000;
  }

  &:active {
    box-shadow: inset 1px 1px 2px #000, inset -1px -1px 2px #393f4b;
  }
`;
const MensajeExito = styled.p`
  font-size: 14px;
  color: ${colores.exito};
`;

const MensajeError = styled.div`
  border-radius: 320px;
  line-height: 40px;
  background: #f66060;
  padding: 0px 15px;
  margin-top: 10px;
  p {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }
`;

export {
  Div,
  DivTable,
  Formulario,
  Label,
  GroupInput,
  GroupInputDate,
  Input,
  InputDate,
  LeyendaError,
  IconoValidacion,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  MensajeExito,
};
