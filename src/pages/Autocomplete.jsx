import { useState } from 'react';
var machine = require('../elements/TableMachine');

export default function App() {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log('search ', searchTerm);
  };

  return (
    <div>
      <h1>Search</h1>

      <div>
        <div>
          <input type='text' value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div>
          {machine
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.Maquina.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div onClick={() => onSearch(item.Maquina)} key={item.Maquina}>
                {item.Maquina}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
