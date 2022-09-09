import {
  GroupInput,
  Input,
  LeyendaError,
  IconoValidacion,
  Label,
} from '../elements/Formularios';

import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const data = sessionStorage.getItem('lider');

const CompInput = ({
  InputState,
  InputSetState,
  inputType,
  inputLabel,
  inputPlaceholder,
  inputName,
  inputError,
  inputExp,
  inputDis,
}) => {
  const onChange = (e) => {
    InputSetState({
      ...InputState,
      campo: e.target.value,
    });
  };

  const validate = () => {
    if (inputExp) {
      if (inputExp.test(InputState.campo)) {
        InputSetState({ ...InputState, valido: 'true' });
      } else {
        InputSetState({ ...InputState, valido: 'false' });
      }
    }
  };

  return (
    <div>
      <Label htmlFor={inputName} validate={InputState.valido}>
        {inputLabel}
      </Label>

      <GroupInput>
        <Input
          type={inputType}
          placeholder={inputPlaceholder}
          id={inputName}
          value={
            inputDis === 'disable'
              ? data
              : InputState.campo && inputName === 'mayus'
                ? InputState.campo.toUpperCase()
                : InputState.campo
          }
          onChange={onChange}
          onKeyUp={validate}
          onBlur={validate}
          name={inputName}
          validate={InputState.valido}
          disabled={inputDis}
        />

        <IconoValidacion
          icon={InputState.valido === 'true' ? faCheckCircle : faTimesCircle}
          validate={InputState.valido}
        />
      </GroupInput>

      <LeyendaError validate={InputState.valido}>{inputError}</LeyendaError>
    </div>
  );
};

export default CompInput;
