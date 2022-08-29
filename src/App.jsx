import { useEffect, useState } from 'react';
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  MensajeExito,
  Input,
  GroupInput,
} from './elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CompInput from './Components/CompInput';
import dayjs from 'dayjs';

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [user, setUser] = useState({ campo: '', valido: null });
  const [name, setName] = useState({ campo: '', valido: null });
  const [password, setPassword] = useState({ campo: '', valido: null });
  const [password2, setPassword2] = useState({ campo: '', valido: null });
  const [mail, setMail] = useState({ campo: '', valido: null });
  const [cell, setCell] = useState({ campo: '', valido: null });
  const [terms, setTerms] = useState(false);
  const [formValidate, setFormValidate] = useState(null);

  const expresiones = {
    user: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    mail: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    cell: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  dayjs.locale('es');
  const date = dayjs().format('DD/MM/YYYY');
  const hour = dayjs().format('HH:mm');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  const validatePassword = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((prevState) => {
          return {
            ...prevState,
            valido: 'false',
          };
        });
      } else {
        setPassword2((prevState) => {
          return {
            ...prevState,
            valido: 'true',
          };
        });
      }
    }
  };

  const onChangeTerms = (e) => {
    setTerms(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      user.valido === 'true' &&
      name.valido === 'true' &&
      password.valido === 'true' &&
      password2.valido === 'true' &&
      mail.valido === 'true' &&
      cell.valido === 'true' &&
      terms
    ) {
      setFormValidate(true);
      setUser({ campo: '', valido: '' });
      setName({ campo: '', valido: null });
      setPassword({ campo: '', valido: null });
      setPassword2({ campo: '', valido: 'null' });
      setMail({ campo: '', valido: null });
      setCell({ campo: '', valido: null });
    } else {
      setFormValidate(false);
    }
  };

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <GroupInput>
          <Label>Fecha de la rotura</Label>
          <Input type="text" value={date} disabled />
        </GroupInput>

        <GroupInput>
          <Label>Hora de la rotura</Label>
          <Input type="text" value={hour} disabled />
        </GroupInput>

        <CompInput
          InputState={user}
          InputSetState={setUser}
          inputType="text"
          inputLabel="Molde"
          inputPlaceholder="John123"
          inputName="usuario"
          inputError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
          inputExp={expresiones.user}
        />

        <CompInput
          InputState={name}
          InputSetState={setName}
          inputType="text"
          inputLabel="Lider a cargo del molde"
          inputPlaceholder="John Doe"
          inputName="name"
          inputError="El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios."
          inputExp={expresiones.name}
        />
        <CompInput
          InputState={name}
          InputSetState={setName}
          inputType="text"
          inputLabel="F0-07-02-32 Orden de reparacion Sector Matriceria: Descripcion de la rotura"
          inputPlaceholder="John Doe"
          inputName="name"
          inputError="El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios."
          inputExp={expresiones.name}
        />

        <CompInput
          InputState={password}
          InputSetState={setPassword}
          inputType="password"
          inputLabel="Contraseña"
          inputName="password1"
          inputError="La contraseña tiene que ser de 4 a 12 dígitos."
          inputExp={expresiones.password}
        />

        <CompInput
          InputState={password2}
          InputSetState={setPassword2}
          inputType="password"
          inputLabel="Repite contraseña"
          inputName="password2"
          inputError="Ambas contraseñas deben ser iguales."
          inputFunction={validatePassword}
        />

        <CompInput
          InputState={mail}
          InputSetState={setMail}
          inputType="email"
          inputLabel="Correo Electrónico"
          inputPlaceholder="john@correo.com"
          inputName="mail"
          inputError="El correo solo puede contener letras, numeros, puntos, guiones, guion bajo y @."
          inputExp={expresiones.mail}
        />

        <CompInput
          InputState={cell}
          InputSetState={setCell}
          inputType="text"
          inputLabel="Teléfono"
          inputPlaceholder="4491234567"
          inputName="Cell"
          inputError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
          inputExp={expresiones.cell}
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terms}
              onChange={onChangeTerms}
            />
            Acepto los terminos y condiciones
          </Label>
        </ContenedorTerminos>

        {formValidate === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Por favor rellene el formulario correctamente.
            </p>
          </MensajeError>
        )}

        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formValidate === true && (
            <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
          )}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default App;
