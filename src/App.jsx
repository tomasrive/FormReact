import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import FormCreateMatriceria from './pages/create/FormCreateMatriceria';
import FormCreateInyectoras from './pages/create/FormCreateManInyectoras';
import FormCreateEdilicio from './pages/create/FormCreateManEdilicio';
import FormCreateArmado from './pages/create/FormCreateManArmado';

import { CompTableMatriceria } from './Components/tables/CompTableMatriceria.jsx';
import { CompTableInyectoras } from './Components/tables/CompTableInyectoras.jsx';
import { CompTableEdilicio } from './Components/tables/CompTableEdilicio.jsx';
import { CompTableArmado } from './Components/tables/CompTableArmado.jsx';
import { FormReparar } from './pages/edit/FormReparar.jsx';
import { FormVerificado } from './pages/edit/FormVerificado.jsx';
import { FormVisualizar } from './pages/edit/FormVisualizar.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/FormCreateMatriceria'
          element={<FormCreateMatriceria />}
        />
        <Route
          path='/FormCreateInyectoras'
          element={<FormCreateInyectoras />}
        />
        <Route path='/FormCreateArmado' element={<FormCreateArmado />} />
        <Route path='/FormCreateEdilicio' element={<FormCreateEdilicio />} />

        <Route path='/CompTableMatriceria' element={<CompTableMatriceria />} />
        <Route path='/CompTableInyectoras' element={<CompTableInyectoras />} />
        <Route path='/CompTableEdilicio' element={<CompTableEdilicio />} />
        <Route path='/CompTableArmado' element={<CompTableArmado />} />

        <Route path='/FormVisualizar/:tabla/:id' element={<FormVisualizar />} />

        <Route path='/FormReparar/:tabla/:id' element={<FormReparar />} />

        <Route path='/FormVerificado/:tabla/:id' element={<FormVerificado />} />
      </Routes>
    </BrowserRouter>
  );
}
