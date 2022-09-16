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

var machine = require('../elements/TableMachine');

const data = sessionStorage.getItem('LiderUser');

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
  inputAutocomplete,
}) => {
  const onChange = (e) => {
    InputSetState({
      ...InputState,
      campo: e.target.value,
    });
  };

  const onSearch = (searchTerm) => {
    InputSetState({ ...InputState, campo: searchTerm, valido: 'true' });
    console.log('search ' + searchTerm);
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
          autoComplete='off'
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

      {inputAutocomplete === 'autocomplete' && (
        <div className='flexAuto'>
          {machine
            .filter((item) => {
              const searchTerm = InputState.campo.toLowerCase();
              const fullName = item.Maquina.toLowerCase();
              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                InputState.campo === searchTerm
              );
            })

            .map((item) => (
              <div className='formA' key={item.Maquina}>
                <ul className='list' onClick={() => onSearch(item.Maquina)}>
                  <li className='list-items'>{item.Maquina}</li>
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CompInput;
