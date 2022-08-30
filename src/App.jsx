import { useEffect, useState } from 'react';
import {
  Div,
  Formulario,
  Label,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  MensajeExito,
  GroupInputDate,
  InputDate,
} from './elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CompInput from './Components/CompInput';
import dayjs from 'dayjs';

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [user, setUser] = useState({ campo: '', valido: null });
  const [name, setName] = useState({ campo: '', valido: null });
  const [message, setMessage] = useState({ campo: '', valido: null });
  const [formValidate, setFormValidate] = useState(null);

  const expresiones = {
    user: /^[a-zA-Z0-9_-]{4,16}$/,
    molde: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      user.valido === 'true' &&
      name.valido === 'true' &&
      message.valido === 'true'
    ) {
      setFormValidate(true);
      setUser({ campo: '', valido: '' });
      setName({ campo: '', valido: null });
      setMessage({ campo: '', valido: null });
    } else {
      setFormValidate(false);
    }
  };

  return (
    <main>
      <Div>
        <Formulario action="" onSubmit={onSubmit}>
          <GroupInputDate>
            <div>
              <Label>Fecha de la rotura</Label>
              <InputDate type="text" value={date} disabled />
            </div>

            <div>
              <Label>Hora de la rotura</Label>
              <InputDate type="text" value={hour} disabled />
            </div>
          </GroupInputDate>

          <CompInput
            InputState={user}
            InputSetState={setUser}
            inputType="text"
            inputLabel="Molde"
            inputPlaceholder="MAM060"
            inputName="molde"
            inputError="El nombre de molde tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
            inputExp={expresiones.molde}
          />
          <CompInput
            InputState={name}
            InputSetState={setName}
            inputType="text"
            inputLabel="Lider a cargo del molde"
            inputPlaceholder="Julian Lopez"
            inputName="name"
            inputError="El nombre tiene que ser de 3 a 40 dígitos y solo puede contener letras y espacios."
            inputExp={expresiones.user}
          />
          <CompInput
            InputState={message}
            InputSetState={setMessage}
            inputType="text"
            inputLabel="F0-07-02-32 Orden de reparacion Sector Matriceria: Descripcion de la rotura"
            inputPlaceholder="Se quedo perno"
            inputName="message"
            inputError="La descripcion tiene que ser de 3 a 200 dígitos y solo puede contener letras y espacios."
            inputExp={expresiones.mensaje}
          />

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
        <div>
          <table>
            <thead>
              <tr>
                <th>Fecha de la rotura</th>
                <th>Hora de la rotura</th>
                <th>Molde</th>
                <th>Lider a cargo:</th>
                <th>Descripcion de la rotura:</th>
                <th>Quien recibe esta reparacion:</th>
                <th>Fecha de finalizacion</th>
                <th>Hora de finalizacion</th>
                <th>Quien lo reparo:</th>
                <th>Estado:</th>
                <th>Completar:</th>
                <th>Verificar:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{date}</td>
                <td>{hour}</td>
                <td>Batman</td>
                <td>Bruce</td>
                <td>Wayne</td>
                <td>Batman</td>
                <td>{date}</td>
                <td>{hour}</td>
                <td>Wayne</td>
                <td>Reparado</td>
              </tr>
              <tr>
                <td>Peter</td>
                <td>Parker</td>
                <td>Spiderman</td>
                <td>Bruce</td>
                <td>Wayne</td>
                <td>Batman</td>
                <td>Wayne</td>
                <td>Batman</td>
                <td>Wayne</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Div>
    </main>
  );
};

export default App;
