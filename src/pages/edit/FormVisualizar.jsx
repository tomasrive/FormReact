import { useState } from 'react';
import {
    Formulario,
    Label,
    ContenedorBotonCentrado,
    Boton,
    MensajeError,
    MensajeExito,
    GroupInputDate,
    InputDate,
    BotonInicio,
} from '../../elements/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CompInput from '../../Components/CompInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDate } from '../../Components/useDate';

const URI = 'http://localhost:3000/api/';


export const FormVisualizar = () => {

    const [obser, setObser] = useState({ campo: '', valido: null });
    const [formValidate, setFormValidate] = useState(null);
    const { tabla, id } = useParams();

    const navigate = useNavigate();

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }

    const expresiones = {
        observ: /^[a-zA-ZÀ-ÿ\s]{3,200}$/,
    };

    const { date, hour } = useDate()

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log('_________Formulario Editar_______________');

        console.log(date);
        console.log(hour);
        console.log(obser.campo);

        if (obser.valido === 'true') {
            setFormValidate(true);

            await axios.put(URI + tabla + '/' + id, {
                fechaVisualizado: date,
                horaVisualizado: hour,
                recibe: obser.campo,
                estado: 'visualizado',
            });
            setObser({ campo: '', valido: null });
            await timeout(2000);
            navigate('/');
        } else {
            setFormValidate(false);
        }
    };

    return (
        <>
            <Formulario action="" onSubmit={onSubmit}>
                <h1>Formulario Visualizar</h1>
                <GroupInputDate>
                    <div>
                        <Label>Fecha</Label>
                        <InputDate type="text" value={date} disabled />
                    </div>

                    <div>
                        <Label>Hora</Label>
                        <InputDate type="text" value={hour} disabled />
                    </div>
                </GroupInputDate>

                <CompInput
                    InputState={obser}
                    InputSetState={setObser}
                    inputType="text"
                    inputLabel="Persona que lo visualiza"
                    inputPlaceholder="Nombre"
                    inputName="recibe"
                    inputError="La observacion a tener en cuenta tiene que ser de 3 a 200 dígitos y solo puede contener numeros, letras y guion bajo."
                    inputExp={expresiones.observ}
                />


                {formValidate === false && (
                    <MensajeError>
                        <span>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            <b>Error:</b> Por favor rellene el formulario correctamente.
                        </span>
                    </MensajeError>
                )}
                {formValidate === true && (
                    <MensajeExito>
                        <span>
                            <FontAwesomeIcon icon={faCheck} />
                            <b>Exito:</b> Formulario enviado exitosamente!
                        </span>
                    </MensajeExito>
                )}

                <ContenedorBotonCentrado>
                    <Link to="/">
                        <BotonInicio type="submit">Denegar</BotonInicio>
                    </Link>
                    <Boton type="submit">Verificar</Boton>
                </ContenedorBotonCentrado>
            </Formulario>
        </>

    );

}
