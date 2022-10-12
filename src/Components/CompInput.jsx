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
import { useState, useEffect } from 'react';
import axios from 'axios';

const machine = 'http://192.168.11.139:4001/api/data/machines';

const molde = 'http://192.168.11.139:4001/api/data/matriceria/moldes';

const data = sessionStorage.getItem('LiderUser');

export const CompInput = ({
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

  const [machines, setMachines] = useState([]);
  const [moldes, setMoldes] = useState([]);

  useEffect(() => {
    getMachine();
    getMolde();
  }, []);

  const getMachine = async () => {
    try {
      const res = await axios.get(machine);
      setMachines(res.data);
    } catch (error) {
      alert(
        'BASE DE DATOS DE MAQUINAS APAGADA, POR FAVOR COMUNICARSE CON EL AREA'
      );
    }
  };

  const getMolde = async () => {
    try {
      const res = await axios.get(molde);
      setMoldes(res.data);
    } catch (error) {
      alert(
        'BASE DE DATOS DE MOLDES APAGADA, POR FAVOR COMUNICARSE CON EL AREA'
      );
    }
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
      if (InputState.campo === '') {
        InputSetState({ ...InputState, valido: null });
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

      {inputAutocomplete === 'autocompleteInyectoras' && (
        <div className='flexAuto'>
          {machines
            .filter((item) => {
              const searchTerm = InputState.campo.toLowerCase();
              const fullName = item.Maquina.toLowerCase();
              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                InputState.valido === 'false'
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

      {inputAutocomplete === 'autocompleteMoldes' && (
        <div className='flexAutoMoldes'>
          {moldes
            .filter((item) => {
              const searchTerm = InputState.campo.toLowerCase();
              const fullItem = item.molde.toLowerCase();

              return (
                searchTerm &&
                fullItem.includes(searchTerm) &&
                InputState.valido === 'false'
              );
            })

            .map((item) => (
              <div className='formA' key={item.molde + '' + item.descripcion}>
                <ul
                  className='list'
                  onClick={() => onSearch(item.molde + ' ' + item.descripcion)}
                >
                  <li className='list-items'>
                    {item.molde} {item.descripcion}
                  </li>
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
