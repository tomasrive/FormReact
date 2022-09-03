import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import FormCreateMatriceria from './pages/create/FormCreateMatriceria';
import FormCreateInyectoras from './pages/create/FormCreateManInyectoras';
import FormCreateEdilicio from './pages/create/FormCreateManEdilicio';
import FormCreateArmado from './pages/create/FormCreateManArmado';

import { FormEdit } from './pages/edit/FormEdit.jsx';

import { CompTableMatriceria } from './Components/tables/CompTableMatriceria.jsx';
import { CompTableInyectoras } from './Components/tables/CompTableInyectoras.jsx';
import { CompTableEdilicio } from './Components/tables/CompTableEdilicio.jsx';
import { CompTableArmado } from './Components/tables/CompTableArmado.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/FormCreateMatriceria"
          element={<FormCreateMatriceria />}
        />
        <Route
          path="/FormCreateInyectoras"
          element={<FormCreateInyectoras />}
        />
        <Route path="/FormCreateArmado" element={<FormCreateArmado />} />
        <Route path="/FormCreateEdilicio" element={<FormCreateEdilicio />} />

        <Route path="/CompTableMatriceria" element={<CompTableMatriceria />} />
        <Route path="/CompTableInyectoras" element={<CompTableInyectoras />} />
        <Route path="/CompTableEdilicio" element={<CompTableEdilicio />} />
        <Route path="/CompTableArmado" element={<CompTableArmado />} />

        <Route path="/FormEdit/:id" element={<FormEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
